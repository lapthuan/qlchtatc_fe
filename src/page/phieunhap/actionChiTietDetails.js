import ServiceSanPham from "../../service/ServiceSanPham";
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
import { Link, useLocation, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
import dayjs from "dayjs";
const { Option } = Select;

const ActionChiTietDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const MaPN = queryParams.get("MaPhieuNhap");
  const MaSP = queryParams.get("MaSanPham");
  console.log(MaPN);
  const [form] = Form.useForm();
  const { data: sanpham } = useAsync(() => ServiceSanPham.getAllSanPham());

  useEffect(() => {
    if (MaPN && MaSP) {
      (async () => {
        const res = await ServiceDeliveryReceipt.getDeliveryReceiptDetail(
          MaPN,
          MaSP
        );
        if (res) {
          form.setFieldsValue({
            // MaPhieuNhap: res[0].MaPN,
            MaSanPham: res[0].MaSanPham,
            SoLuong: res[0].SoLuong,
            DonGia: res[0].DonGia,
          });
        }
      })();
    } else {
      form.resetFields();
    }
  }, [MaPN, MaSP]);

  const onFinish = async (values) => {
    if (MaSP) {
      const body = {
        MaPhieuNhap: MaPN,
        MaSanPham: values.MaSanPham,
        SoLuong: values.SoLuong,
        DonGia: values.DonGia,
      };

      const res = await ServiceDeliveryReceipt.editDeliveryReceiptDetail(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const body = {
        MaPhieuNhap: MaPN,
        MaSanPham: values.MaSanPham,
        SoLuong: values.SoLuong,
        DonGia: values.DonGia,
      };

      const res = await ServiceDeliveryReceipt.createDeliveryReceiptDetail(
        body
      );

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
            {MaSP ? "Sửa " : "Thêm "} chi tiết phiếu nhập
          </h3>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Mã phiếu nhập"
                name="MaPhieuNhap"
                rules={[
                  { required: false, message: "Vui lòng nhập mã phiếu nhập!" },
                ]}
              >
                <h3>{MaPN}</h3>
              </Form.Item>

              <Form.Item
                label="Sản phẩm"
                name="MaSanPham"
                rules={[{ required: true, message: "Mã sản phẩm!" }]}
              >
                <Select
                  placeholder="Chọn sản phẩm"
                  disabled={MaSP ? true : false}
                >
                  {sanpham.map((item) => (
                    <Option key={item.MaSanPham} value={item.MaSanPham}>
                      {item.TenSanPham}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Số lượng"
                name="SoLuong"
                rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
              >
                <Input placeholder="Nhập số lượng" />
              </Form.Item>

              <Form.Item
                label="Đơn giá"
                name="DonGia"
                rules={[{ required: true, message: "Vui lòng nhập đơn giá!" }]}
              >
                <Input placeholder="Nhập đơn giá" />
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link
                  className="btn btn-flat btn-default"
                  to={`/phieu-nhap-chi-tiet/${MaPN}`}
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

export default ActionChiTietDetails;
