import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceSanPham from "../../service/ServiceSanPham";

const SanPham = () => {
	const { data: sanpham } = useAsync(() => ServiceSanPham.getAllSanPham())

	return (<>

		<div>

			<div className="card-header">
				<h3 className="card-title">Danh sách sản phẩm</h3>
				<div className="card-tools">
					<a href="san-pham/them" className="btn btn-flat btn-success rounded"><span
						className="fas fa-plus"></span> Tạo mới</a>
				</div>
			</div>
			<hr />

			<table id="myTable" className="table table-bordered border-primary">
				<thead className="thead-dark">
					<tr>
						<th scope="col">Mã sản phẩm</th>
						<th scope="col">Chi nhánh</th>
						<th scope="col">Tên sản phẩm</th>
						<th scope="col">Giá</th>
						<th scope="col">Danh mục</th>
						<th scope="col">Thương hiệu</th>
						<th scope="col">Chức năng</th>

					</tr>
				</thead>
				<tbody>

					{sanpham?.map((product) => (
						<tr key={product.MaSanPham}>
							<td>{product.MaSanPham}</td>
							<td>{product.TenChiNhanh}</td>
							<td>{product.TenSanPham}</td>
							<td>{product.GiaSanPham}</td>
							<td>{product.TenDanhMuc}</td>
							<td>{product.TenThuongHieu}</td>
							<td>
								<div className="d-flex">
									<Link className="btn btn-success" to={`san-pham/${product.MaSanPham}`}>
										Sửa
									</Link>
									<button className="btn btn-danger delete_data">Xóa</button>
								</div>
							</td>
						</tr>
					))}

				</tbody>
			</table>

		</div>

	</>);
}

export default SanPham;