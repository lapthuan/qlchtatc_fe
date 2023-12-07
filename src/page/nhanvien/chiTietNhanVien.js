import ServiceBranch from "../../service/ServiceBranch";
import ServiceEmployee from "../../service/ServiceEmployee";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { Link, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
const { Option } = Select;

const ChiTietNhanVien = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: chinhanh } = useAsync(() => ServiceBranch.getAllBranch());

  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceEmployee.getAEmployee(id);
        if (res) {
          form.setFieldsValue({
            MaNhanVien: res[0].MaNhanVien,
            TenChiNhanh: res[0].TenChiNhanh,
            MaChiNhanh: res[0].MaChiNhanh,
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
        MaNhanVien: values.MaNhanVien,
        TenNhanVien: values.TenNhanVien,
        MaChiNhanh: values.MaChiNhanh,
        DiaChi: values.DiaChi,
      };

      const res = await ServiceEmployee.editEmployee(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const body = {
        MaNhanVien: values.MaNhanVien,
        TenNhanVien: values.TenNhanVien,
        MaChiNhanh: values.MaChiNhanh,
        DiaChi: values.DiaChi,
      };

      const res = await ServiceEmployee.createEmployee(body);

      if (res.message == "Đã tồn tại") {
        message.warning("Mã nhân viên đã tồn tại!");
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
            {id != "them" ? "Sửa " : "Thêm "} nhân viên
          </h3>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Mã nhân viên"
                name="MaNhanVien"
                rules={[
                  { required: true, message: "Vui lòng nhập mã nhân viên!" },
                ]}
              >
                <Input
                  placeholder="Nhập mã nhân viên"
                  readOnly={id != "them" ? true : false}
                />
              </Form.Item>

              <Form.Item
                label="Tên nhân viên"
                name="TenNhanVien"
                rules={[
                  { required: true, message: "Vui lòng nhập tên nhân viên!" },
                ]}
              >
                <Input placeholder="Nhập tên nhân viên" />
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="DiaChi"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
              <Form.Item
                label="Chi nhánh"
                name="MaChiNhanh"
                rules={[
                  { required: true, message: "Vui lòng chọn chi nhánh!" },
                ]}
              >
                <Select placeholder="Chọn chi nhánh">
                  {chinhanh.map((item) => (
                    <Option key={item.MaChiNhanh} value={item.MaChiNhanh}>
                      {item.TenChiNhanh}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link className="btn btn-flat btn-default" to={"/nhan-vien"}>
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

export default ChiTietNhanVien;
