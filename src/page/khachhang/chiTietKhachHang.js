import ServiceLoaiKhachHang from "../../service/ServiceLoaiKhachHang";
import ServiceCustomer from "../../service/ServiceCustomer";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { Link, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
const { Option } = Select;

const ChiTietKhachHang = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: customerCategory } = useAsync(() =>
    ServiceLoaiKhachHang.getAllCustomerCategory()
  );

  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceCustomer.getACustomer(id);
        if (res) {
          form.setFieldsValue({
            MaKhachHang: res[0].MaKhachHang,
            TenKhachHang: res[0].TenKhachHang,
            DiaChi: res[0].DiaChi,
            MaLoaiKhachHang: res[0].MaLoaiKhachHang,
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
        MaKhachHang: values.MaKhachHang,
        TenKhachHang: values.TenKhachHang,
        DiaChi: values.DiaChi,
        MaLoaiKhachHang: values.MaLoaiKhachHang,
      };

      const res = await ServiceCustomer.editCustomer(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const body = {
        MaKhachHang: values.MaKhachHang,
        TenKhachHang: values.TenKhachHang,
        DiaChi: values.DiaChi,
        MaLoaiKhachHang: values.MaLoaiKhachHang,
      };

      const res = await ServiceCustomer.createCustomer(body);

      if (res.message == "Đã tồn tại") {
        message.warning("Mã khách hàng đã tồn tại!");
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
            {id != "them" ? "Sửa " : "Thêm "} khách hàng
          </h3>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Mã khách hàng"
                name="MaKhachHang"
                rules={[
                  { required: true, message: "Vui lòng nhập mã khách hàng!" },
                ]}
              >
                <Input
                  placeholder="Nhập mã khách hàng"
                  readOnly={id != "them" ? true : false}
                />
              </Form.Item>

              <Form.Item
                label="Tên khách hàng"
                name="TenKhachHang"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khách hàng!" },
                ]}
              >
                <Input placeholder="Nhập tên khách hàng" />
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="DiaChi"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
              <Form.Item
                label="Loại khách hàng"
                name="MaLoaiKhachHang"
                rules={[
                  { required: true, message: "Vui lòng chọn loại khách hàng!" },
                ]}
              >
                <Select placeholder="Chọn loại khách hàng">
                  {customerCategory.map((item) => (
                    <Option
                      key={item.MaLoaiKhachHang}
                      value={item.MaLoaiKhachHang}
                    >
                      {item.TenKhachHang}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link className="btn btn-flat btn-default" to={"/khach-hang"}>
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

export default ChiTietKhachHang;
