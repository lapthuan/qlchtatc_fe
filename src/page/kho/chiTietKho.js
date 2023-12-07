import ServiceWarehouse from "../../service/ServiceWarehouse";
import ServiceBranch from "../../service/ServiceBranch";
import ServiceSanPham from "../../service/ServiceSanPham";
import { Form, Input, Select, Button, Row, Col, message } from "antd";
import { Link, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import { useEffect } from "react";
const { Option } = Select;

const ChiTietKho = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: sanpham } = useAsync(() => ServiceSanPham.getAllSanPham());
  const { data: chinhanh } = useAsync(() => ServiceBranch.getAllBranch());
  useEffect(() => {
    if (id != "them") {
      (async () => {
        const res = await ServiceWarehouse.getWarehouse(id);
        if (res) {
          form.setFieldsValue({
            MaKho: res[0].MaKho,
            TenKho: res[0].TenKho,
            MaChiNhanh: res[0].MaChiNhanh,
            MaSanPham: res[0].MaSanPham,
            SoLuong: res[0].SoLuong,
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
        MaKho: values.MaKho,
        TenKho: values.TenKho,
        MaChiNhanh: values.MaChiNhanh,
        MaSanPham: values.MaSanPham,
        SoLuong: values.SoLuong,
      };

      const res = await ServiceWarehouse.editWarehouse(body);

      if (res.message) {
        message.success(
          "Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!"
        );
      }
    } else {
      const body = {
        MaKho: values.MaKho,
        TenKho: values.TenKho,
        MaChiNhanh: values.MaChiNhanh,
        MaSanPham: values.MaSanPham,
        SoLuong: values.SoLuong,
      };

      const res = await ServiceWarehouse.createWarehouse(body);

      if (res.message == "Đã tồn tại") {
        message.warning("Kho đã tồn tại!");
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
            {id != "them" ? "Sửa " : "Thêm "} kho hàng
          </h3>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <Form form={form} onFinish={onFinish}>
              <Form.Item
                label="Mã kho"
                name="MaKho"
                rules={[{ required: true, message: "Vui lòng nhập mã kho!" }]}
              >
                <Input
                  placeholder="Nhập kho"
                  readOnly={id != "them" ? true : false}
                />
              </Form.Item>

              <Form.Item
                label="Tên kho"
                name="TenKho"
                rules={[{ required: true, message: "Vui lòng nhập tên kho!" }]}
              >
                <Input placeholder="Nhập tên kho" />
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
                label="Sản phẩm"
                name="MaSanPham"
                rules={[{ required: true, message: "Mã sản phẩm!" }]}
              >
                <Select placeholder="Chọn sản phẩm">
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
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số lượng sản phẩm!",
                  },
                ]}
              >
                <Input placeholder="Số lượng sản phẩm" />
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link className="btn btn-flat btn-default" to={"/kho"}>
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

export default ChiTietKho;
