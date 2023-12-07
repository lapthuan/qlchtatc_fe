import ServiceNhaCungCap from "../../service/ServiceNhaCungCap";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { Link, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
const { Option } = Select;

const ChiTietNhaCungCap = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceNhaCungCap.getNhaCungCap(id);
        if (res) {
          form.setFieldsValue({
            MaNhaCungCap: res[0].MaNhaCungCap,
            TenNhaCungCap: res[0].TenNhaCungCap,
            DiaChi: res[0].DiaChi,
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
        MaNhaCungCap: values.MaNhaCungCap,
        TenNhaCungCap: values.TenNhaCungCap,
        DiaChi: values.DiaChi,
      };

      const res = await ServiceNhaCungCap.editNhaCungCap(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const body = {
        MaNhaCungCap: values.MaNhaCungCap,
        TenNhaCungCap: values.TenNhaCungCap,
        DiaChi: values.DiaChi,
      };

      const res = await ServiceNhaCungCap.createNhaCungCap(body);

      if (res.message == "Đã tồn tại") {
        message.warning("Nhà cung cấp đã tồn tại!");
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
            {id != "them" ? "Sửa " : "Thêm "} nhà cung cấp
          </h3>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Mã nhà cung cấp"
                name="MaNhaCungCap"
                rules={[
                  { required: true, message: "Vui lòng nhập mã nhà cung cấp!" },
                ]}
              >
                <Input
                  placeholder="Nhập nhà cung cấp"
                  readOnly={id != "them" ? true : false}
                />
              </Form.Item>

              <Form.Item
                label="Tên nhà cung cấp"
                name="TenNhaCungCap"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên nhà cung cấp!",
                  },
                ]}
              >
                <Input placeholder="Nhập tên nhà cung cấp" />
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="DiaChi"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ nhà cung cấp!",
                  },
                ]}
              >
                <Input placeholder="Địa chỉ nhà cung cấp" />
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link className="btn btn-flat btn-default" to={"/nha-cung-cap"}>
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

export default ChiTietNhaCungCap;
