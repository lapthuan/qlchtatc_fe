import ServiceEmployee from "../../service/ServiceEmployee";
import ServiceAccount from "../../service/ServiceAccount";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { Link, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
const { Option } = Select;

const ChiTietTaiKhoan = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: nhanvien } = useAsync(() => ServiceEmployee.getAllEmployee());

  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceAccount.getAccount(id);
        if (res) {
          form.setFieldsValue({
            TenTK: res[0].TenTK,
            MaNhanVien: res[0].MaNhanVien,
            Matkhau: res[0].Matkhau,
            Quyen: res[0].Quyen,
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
        TenTK: values.TenTK,
        MaNhanVien: values.MaNhanVien,
        MatKhau: values.MatKhau,
        Quyen: values.Quyen,
      };

      const res = await ServiceAccount.editAccount(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const body = {
        TenTK: values.TenTK,
        MaNhanVien: values.MaNhanVien,
        MatKhau: values.MatKhau,
        Quyen: values.Quyen,
      };

      const res = await ServiceAccount.createAccount(body);

      if (res.message == "Đã tồn tại") {
        message.warning(
          "Tài khoản đã tồn tại hoặc nhân viên đã được cấp tài khoản!"
        );
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
            {id != "them" ? "Sửa " : "Thêm "} tài khoản
          </h3>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Tài khoản"
                name="TenTK"
                rules={[
                  { required: true, message: "Vui lòng nhập tài khoản!" },
                ]}
              >
                <Input
                  placeholder="Nhập tài khoản"
                  readOnly={id != "them" ? true : false}
                />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="MatKhau"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item
                name="Quyen"
                label="Quyền"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn quyền",
                  },
                ]}
              >
                <Select placeholder="Chọn quyền">
                  <Option value="1">Admin</Option>
                  <Option value="0">User</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Nhân viên"
                name="MaNhanVien"
                rules={[
                  { required: true, message: "Vui lòng chọn nhân viên!" },
                ]}
              >
                <Select placeholder="Chọn nhân viên">
                  {nhanvien.map((item) => (
                    <Option key={item.MaNhanVien} value={item.MaNhanVien}>
                      {item.TenNhanVien}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link className="btn btn-flat btn-default" to={"/tai-khoan"}>
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

export default ChiTietTaiKhoan;
