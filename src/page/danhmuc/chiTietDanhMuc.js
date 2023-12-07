import ServiceDanhMuc from "../../service/ServiceDanhMuc";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { Link, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
const { Option } = Select;

const ChiTietDanhMuc = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceDanhMuc.getALDanhMuc(id);
        if (res) {
          form.setFieldsValue({
            MaDanhMuc: res[0].MaDanhMuc,
            TenDanhMuc: res[0].TenDanhMuc,
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
        MaDanhMuc: values.MaDanhMuc,
        TenDanhMuc: values.TenDanhMuc,
      };

      const res = await ServiceDanhMuc.editDanhMuc(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const body = {
        MaDanhMuc: values.MaDanhMuc,
        TenDanhMuc: values.TenDanhMuc,
      };

      const res = await ServiceDanhMuc.createDanhMuc(body);

      if (res.message == "Đã tồn tại") {
        message.warning("Mã danh mục đã tồn tại!");
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
            {id != "them" ? "Sửa " : "Thêm "} danh mục
          </h3>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Mã danh mục"
                name="MaDanhMuc"
                rules={[
                  { required: true, message: "Vui lòng nhập mã danh mục!" },
                ]}
              >
                <Input
                  placeholder="Nhập mã danh mục"
                  readOnly={id != "them" ? true : false}
                />
              </Form.Item>

              <Form.Item
                label="Tên danh mục"
                name="TenDanhMuc"
                rules={[
                  { required: true, message: "Vui lòng nhập tên danh mục!" },
                ]}
              >
                <Input placeholder="Nhập tên danh mục" />
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link className="btn btn-flat btn-default" to={"/danh-muc"}>
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

export default ChiTietDanhMuc;
