import { Link, useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceBranch from "../../service/ServiceBranch";
import ServiceDanhMuc from "../../service/ServiceDanhMuc";
import ServiceThuongHieu from "../../service/ServiceThuongHieu";
import { Form, Input, Select, Button, Row, Col, message } from 'antd';
import ServiceSanPham from "../../service/ServiceSanPham";
import { useEffect } from "react";
const { Option } = Select;

const SanPhamChiTiet = () => {
	const { id } = useParams()
	const [form] = Form.useForm();
	const { data: danhmuc } = useAsync(() => ServiceDanhMuc.getAllDanhMuc())
	const { data: thuonghieu } = useAsync(() => ServiceThuongHieu.getAllThuongHieu())
	const { data: chinhanh } = useAsync(() => ServiceBranch.getAllBranch())
	useEffect(() => {
		if (id != "them") {
			(async () => {
				const res = await ServiceSanPham.getSanPham(id)
				if (res) {
					form.setFieldsValue({
						"MaSanPham": res[0].MaSanPham,
						"MaChiNhanh": res[0].MaChiNhanh,
						"TenSanPham": res[0].TenSanPham,
						"GiaSanPham": res[0].GiaSanPham,
						"MaDanhMuc": res[0].MaDanhMuc,
						"MaThuongHieu": res[0].MaThuongHieu,
					});
				}
			})();
		} else {
			form.resetFields()
		}
	}, [id])

	const onFinish = async (values) => {
		if (id != "them") {
			const body = {
				"MaSanPham": values.MaSanPham,
				"MaChiNhanh": values.MaChiNhanh,
				"TenSanPham": values.TenSanPham,
				"GiaSanPham": values.GiaSanPham,
				"MaDanhMuc": values.MaDanhMuc,
				"MaThuongHieu": values.MaThuongHieu,
			}

			const res = await ServiceSanPham.editSanPham(body)

			if (res.message) {
				message.success("Sửa dữ liệu thành công và đồng bộ dữ liệu thành công!")

			}

		} else {
			const body = {
				"MaSanPham": values.MaSanPham,
				"MaChiNhanh": values.MaChiNhanh,
				"TenSanPham": values.TenSanPham,
				"GiaSanPham": values.GiaSanPham,
				"MaDanhMuc": values.MaDanhMuc,
				"MaThuongHieu": values.MaThuongHieu,
			}

			const res = await ServiceSanPham.createSanPham(body)

			if (res.message == "Đã tồn tại") {
				message.warning("Mã sản phẩm đã tồn tại!")
			} else if (res.message == "Đồng bộ thêm thành công") {
				message.success("Thêm dữ liệu thành công và đồng bộ dữ liệu thành công!")
			}
		}
	};
	return (
		<>
			<div className="card card-outline">
				<div className="card-header">
					<h3 className="card-title">{id != "them" ? "Sửa " : "Thêm "} sản phẩm</h3>
				</div>
				<div className="card-body">
					<div className="container-fluid">

						<Form form={form} onFinish={onFinish}>
							<Form.Item label="Mã sản phẩm" name="MaSanPham" rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm!' }]}>
								<Input placeholder="Nhập mã sản phẩm" readOnly={id != "them" ? true : false} />
							</Form.Item>

							<Form.Item label="Chi nhánh" name="MaChiNhanh" rules={[{ required: true, message: 'Vui lòng chọn chi nhánh!' }]}>
								<Select placeholder="Chọn chi nhánh">
									{chinhanh.map((item) => (
										<Option key={item.MaChiNhanh} value={item.MaChiNhanh}>
											{item.TenChiNhanh}
										</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item label="Danh mục" name="MaDanhMuc" rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}>
								<Select placeholder="Chọn danh mục">
									{danhmuc.map((item) => (
										<Option key={item.MaDanhMuc} value={item.MaDanhMuc}>
											{item.TenDanhMuc}
										</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item label="Thương hiệu" name="MaThuongHieu" rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}>
								<Select placeholder="Chọn thương hiệu">
									{thuonghieu.map((item) => (
										<Option key={item.MaThuongHieu} value={item.MaThuongHieu}>
											{item.TenThuongHieu}
										</Option>
									))}
								</Select>
							</Form.Item>

							<Form.Item label="Tên sản phẩm" name="TenSanPham" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
								<Input placeholder="Nhập tên sản phẩm" />
							</Form.Item>

							<Form.Item label="Giá" name="GiaSanPham" rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}>
								<Input type="number" placeholder="Nhập giá sản phẩm" />
							</Form.Item>

							<div className="card-footer">
								<Button type="primary" htmlType="submit">
									Lưu
								</Button>
								<Link className="btn btn-flat btn-default" to={"/san-pham"}>Hủy</Link>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</>
	);
}

export default SanPhamChiTiet;