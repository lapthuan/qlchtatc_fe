import ServiceThuongHieu from "../../service/ServiceThuongHieu";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { Link, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
const { Option } = Select;

const ChiTietThuongHieu = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceThuongHieu.getThuongHieu(id);
        if (res) {
          form.setFieldsValue({
            MaThuongHieu: res[0].MaThuongHieu,
            TenThuongHieu: res[0].TenThuongHieu,
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
        MaThuongHieu: values.MaThuongHieu,
        TenThuongHieu: values.TenThuongHieu,
      };

      const res = await ServiceThuongHieu.editThuongHieu(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const body = {
        MaThuongHieu: values.MaThuongHieu,
        TenThuongHieu: values.TenThuongHieu,
      };

      const res = await ServiceThuongHieu.createThuongHieu(body);

      if (res.message == "Đã tồn tại") {
        message.warning("Thương hiệu đã tồn tại!");
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
            {id != "them" ? "Sửa " : "Thêm "} thương hiệu
          </h3>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Mã thương hiệu"
                name="MaThuongHieu"
                rules={[
                  { required: true, message: "Vui lòng nhập mã thương hiệu!" },
                ]}
              >
                <Input
                  placeholder="Nhập thương hiệu"
                  readOnly={id != "them" ? true : false}
                />
              </Form.Item>

              <Form.Item
                label="Tên thương hiệu"
                name="TenThuongHieu"
                rules={[
                  { required: true, message: "Vui lòng nhập tên thương hiệu!" },
                ]}
              >
                <Input placeholder="Nhập tên thương hiệu" />
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link className="btn btn-flat btn-default" to={"/thuong-hieu"}>
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

export default ChiTietThuongHieu;
