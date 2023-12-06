import ServiceLoaiKhachHang from "../../service/ServiceLoaiKhachHang";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { Link, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
const { Option } = Select;

const ChiTietLKH = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceLoaiKhachHang.getACustomerCategory(id);
        if (res) {
          form.setFieldsValue({
            MaLoaiKhachHang: res[0].MaLoaiKhachHang,
            TenLoaiKhachHang: res[0].TenLoaiKhachHang,
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
        MaLoaiKhachHang: values.MaLoaiKhachHang,
        TenLoaiKhachHang: values.TenLoaiKhachHang,
      };

      const res = await ServiceLoaiKhachHang.editCustomerCategory(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const body = {
        MaLoaiKhachHang: values.MaLoaiKhachHang,
        TenLoaiKhachHang: values.TenLoaiKhachHang,
      };

      const res = await ServiceLoaiKhachHang.createCustomerCategory(body);

      if (res.message == "Đã tồn tại") {
        message.warning("Loại khách hàng đã tồn tại!");
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
            {id != "them" ? "Sửa " : "Thêm "} loại khách hàng
          </h3>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Mã loại khách hàng"
                name="MaLoaiKhachHang"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã loại khách hàng!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập loại khách hàng"
                  readOnly={id != "them" ? true : false}
                />
              </Form.Item>

              <Form.Item
                label="Tên loại khách hàng"
                name="TenLoaiKhachHang"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên loại khách hàng!",
                  },
                ]}
              >
                <Input placeholder="Nhập tên loại khách hàng" />
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link
                  className="btn btn-flat btn-default"
                  to={"/loai-khach-hang"}
                >
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

export default ChiTietLKH;
