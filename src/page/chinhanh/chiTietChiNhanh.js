import ServiceBranch from "../../service/ServiceBranch";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { Link, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
const { Option } = Select;

const ChiTietChiNhanh = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: tinh } = useAsync(() => ServiceBranch.getAllTinh());

  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceBranch.getBranch(id);
        if (res) {
          form.setFieldsValue({
            MaChiNhanh: res[0].MaChiNhanh,
            TenChiNhanh: res[0].TenChiNhanh,
            MaTinh: res[0].MaTinh,
          });
        }
      })();
    } else {
      form.resetFields();
    }
  }, [id]);

  const onFinish = async (values) => {
    if (id != "them") {
      const body = {
        MaChiNhanh: values.MaChiNhanh,
        TenChiNhanh: values.TenChiNhanh,
        MaTinh: values.MaTinh,
      };

      const res = await ServiceBranch.editBranch(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const body = {
        MaChiNhanh: values.MaChiNhanh,
        TenChiNhanh: values.TenChiNhanh,
        MaTinh: values.MaTinh,
      };

      const res = await ServiceBranch.createBranch(body);

      if (res.message == "Đã tồn tại") {
        message.warning("Mã chi nhánh đã tồn tại!");
      } else if (res.message == "Đồng bộ thêm thành công") {
        message.success(
          "Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    }
  };
  return (
    <>
      <div className="card card-outline">
        <div className="card-header">
          <h3 className="card-title">
            {id != "them" ? "Sửa " : "Thêm "} chi nhánh
          </h3>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Mã chi nhánh"
                name="MaChiNhanh"
                rules={[
                  { required: true, message: "Vui lòng nhập mã chi nhánh!" },
                ]}
              >
                <Input
                  placeholder="Nhập mã chi nhánh"
                  readOnly={id != "them" ? true : false}
                />
              </Form.Item>

              <Form.Item
                label="Tên chi nhánh"
                name="TenChiNhanh"
                rules={[
                  { required: true, message: "Vui lòng nhập tên chi nhánh!" },
                ]}
              >
                <Input placeholder="Nhập tên chi nhánh" />
              </Form.Item>

              <Form.Item
                label="Tỉnh"
                name="MaTinh"
                rules={[{ required: true, message: "Vui lòng chọn tỉnh!" }]}
              >
                <Select placeholder="Chọn tỉnh">
                  {tinh.map((item) => (
                    <Option key={item.MaTinh} value={item.MaTinh}>
                      {item.TenTinh}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link className="btn btn-flat btn-default" to={"/chi-nhanh"}>
                  Hủy
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChiTietChiNhanh;
