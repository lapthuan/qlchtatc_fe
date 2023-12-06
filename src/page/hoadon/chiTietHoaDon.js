import ServiceBranch from "../../service/ServiceBranch";
import ServiceEmployee from "../../service/ServiceEmployee";
import ServiceCustomer from "../../service/ServiceCustomer";
import ServiceOrder from "../../service/ServiceOrder";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  message,
  DatePicker,
} from "antd";
import { Link, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
import dayjs from "dayjs";
const { Option } = Select;

const ChiTietHoaDon = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: chinhanh } = useAsync(() => ServiceBranch.getAllBranch());
  const { data: nhanvien } = useAsync(() => ServiceEmployee.getAllEmployee());
  const { data: khachhang } = useAsync(() => ServiceCustomer.getAllCustomer());

  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceOrder.getOrder(id);
        if (res) {
          const ngay = dayjs(res[0].NgayLap, "YYYY-MM-DD");
          form.setFieldsValue({
            MaHoaDon: res[0].MaHoaDon,
            MaKhachHang: res[0].MaKhachHang,
            MaNhanVien: res[0].MaNhanVien,
            MaChiNhanh: res[0].MaChiNhanh,
            NgayLap: ngay,
          });
        }
      })();
    } else {
      form.resetFields();
    }
  }, [id]);

  const onFinish = async (values) => {
    if (id != "them") {
      const ngay = dayjs(values.NgayLap).format("YYYY-MM-DD");

      const body = {
        MaHoaDon: values.MaHoaDon,
        MaKhachHang: values.MaKhachHang,
        MaNhanVien: values.MaNhanVien,
        MaChiNhanh: values.MaChiNhanh,
        NgayLap: ngay,
      };

      const res = await ServiceOrder.editOrder(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const ngay = dayjs(values.NgayLap).format("YYYY-MM-DD");

      const body = {
        MaHoaDon: values.MaHoaDon,
        MaKhachHang: values.MaKhachHang,
        MaNhanVien: values.MaNhanVien,
        MaChiNhanh: values.MaChiNhanh,
        NgayLap: ngay,
      };

      const res = await ServiceOrder.createOrder(body);

      if (res.message == "Đã tồn tại") {
        message.warning("Mã hóa đơn đã tồn tại!");
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
                label="Mã hóa đơn"
                name="MaHoaDon"
                rules={[
                  { required: true, message: "Vui lòng nhập mã hóa đơn!" },
                ]}
              >
                <Input
                  placeholder="Nhập mã hóa đơn"
                  readOnly={id != "them" ? true : false}
                />
              </Form.Item>

              <Form.Item
                label="Khách hàng"
                name="MaKhachHang"
                rules={[{ required: true, message: "Chọn khách hàng!" }]}
              >
                <Select placeholder="Chọn khách hàng">
                  {khachhang.map((item) => (
                    <Option key={item.MaKhachHang} value={item.MaKhachHang}>
                      {item.TenKhachHang}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Nhân viên"
                name="MaNhanVien"
                rules={[{ required: true, message: "Chọn nhân viên!" }]}
              >
                <Select placeholder="Chọn nhân viên">
                  {nhanvien.map((item) => (
                    <Option key={item.MaNhanVien} value={item.MaNhanVien}>
                      {item.TenNhanVien}
                    </Option>
                  ))}
                </Select>
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

              <Form.Item
                name="NgayLap"
                label="Ngày lập hóa đơn"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn ngày lập hóa đơn",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                  placeholder="Chọn ngày lập hóa đơn"
                />
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link className="btn btn-flat btn-default" to={"/hoa-don"}>
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

export default ChiTietHoaDon;
