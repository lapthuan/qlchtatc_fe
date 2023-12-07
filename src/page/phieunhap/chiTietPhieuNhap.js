import ServiceBranch from "../../service/ServiceBranch";
import ServiceNhaCungCap from "../../service/ServiceNhaCungCap";
import ServiceDeliveryReceipt from "../../service/ServiceDeliveryReceipt";
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

const ChiTietPhieuNhap = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: chinhanh } = useAsync(() => ServiceBranch.getAllBranch());
  const { data: nhacungcap } = useAsync(() =>
    ServiceNhaCungCap.getAllNhaCungCap()
  );

  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceDeliveryReceipt.getDeliveryReceipt(id);
        if (res) {
          const ngay = dayjs(res[0].NgayNhap, "YYYY-MM-DD");
          form.setFieldsValue({
            MaPhieuNhap: res[0].MaPhieuNhap,
            MaNhaCungCap: res[0].MaNhaCungCap,
            MaChiNhanh: res[0].MaChiNhanh,
            NgayNhap: ngay,
            TongTien: res[0].TongTien,
          });
        }
      })();
    } else {
      form.resetFields();
    }
  }, [id]);

  const onFinish = async (values) => {
    if (id != "them") {
      const ngay = dayjs(values.NgayNhap).format("YYYY-MM-DD");

      const body = {
        MaPhieuNhap: values.MaPhieuNhap,
        MaNhaCungCap: values.MaNhaCungCap,
        MaChiNhanh: values.MaChiNhanh,
        NgayNhap: ngay,
        TongTien: values.TongTien,
      };

      const res = await ServiceDeliveryReceipt.editDeliveryReceipt(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const ngay = dayjs(values.NgayNhap).format("YYYY-MM-DD");

      const body = {
        MaPhieuNhap: values.MaPhieuNhap,
        MaNhaCungCap: values.MaNhaCungCap,
        MaChiNhanh: values.MaChiNhanh,
        NgayNhap: ngay,
        TongTien: values.TongTien,
      };

      const res = await ServiceDeliveryReceipt.createDeliveryReceipt(body);

      if (res.message == "Đã tồn tại") {
        message.warning("Mã phiếu nhập đã tồn tại!");
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
                label="Mã phiếu nhập"
                name="MaPhieuNhap"
                rules={[
                  { required: true, message: "Vui lòng nhập mã phiếu nhập!" },
                ]}
              >
                <Input
                  placeholder="Nhập mã phiếu nhập"
                  readOnly={id != "them" ? true : false}
                />
              </Form.Item>

              <Form.Item
                label="Nhà cung cấp"
                name="MaNhaCungCap"
                rules={[{ required: true, message: "Mã nhà cung cấp!" }]}
              >
                <Select placeholder="Chọn nhà cung cấp">
                  {nhacungcap.map((item) => (
                    <Option key={item.MaNhaCungCap} value={item.MaNhaCungCap}>
                      {item.TenNhaCungCap}
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
                label="Tổng tiền"
                name="TongTien"
                rules={[{ required: true, message: "Vui lòng giá tiền!" }]}
              >
                <Input placeholder="Nhập giá tiền" />
              </Form.Item>

              <Form.Item
                name="NgayNhap"
                label="Ngày nhập hàng"
                rules={[
                  {
                    required: true,
                    message: "Hãy chọn ngày nhập hàng",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD-MM-YYYY"
                  placeholder="Chọn ngày nhập hàng"
                />
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link className="btn btn-flat btn-default" to={"/phieu-nhap"}>
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

export default ChiTietPhieuNhap;
