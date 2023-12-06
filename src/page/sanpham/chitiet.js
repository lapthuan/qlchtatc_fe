import { useParams } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceBranch from "../../service/ServiceBranch";
import ServiceDanhMuc from "../../service/ServiceDanhMuc";
import ServiceThuongHieu from "../../service/ServiceThuongHieu";


const SanPhamChiTiet = () => {
	const { id } = useParams()
	const { data: danhmuc } = useAsync(() => ServiceDanhMuc.getAllDanhMuc())
	const { data: thuonghieu } = useAsync(() => ServiceThuongHieu.getAllThuongHieu())
	const { data: chinhanh } = useAsync(() => ServiceBranch.getAllBranch())


	return (
		<>
			<div className="card card-outline">
				<div className="card-header">
					<h3 className="card-title"> Nhân viên</h3>
				</div>
				<div className="card-body">
					<div className="container-fluid">
						<div id="msg"></div>
						<form >


							<div className="form-group">
								<label for="masanpham">Mã sản phẩm</label>
								<input type="text" name="masanpham" id="masanpham" className="form-control"
									value="" required />
							</div>

							<div className="form-group">
								<label for="machinhanh" className="control-label">Chi nhánh</label>
								<select name="machinhanh" id="machinhanh" className="custom-select select">

									<option	></option>

								</select>
							</div>
							<div className="form-group">
								<label for="madanhmuc" className="control-label">Danh mục</label>
								<select name="madanhmuc" id="madanhmuc" className="custom-select select">

									<option>

									</option>

								</select>
							</div>
							<div className="form-group">
								<label for="mathuonghieu" className="control-label">Thương hiệu</label>
								<select name="mathuonghieu" id="mathuonghieu" className="custom-select select">

									<option>	</option>

								</select>
							</div>
							<div className="form-group">
								<label for="tensanpham">Tên sản phẩm</label>
								<input type="text" name="tensanpham" id="tensanpham" className="form-control"
									value="" required />
							</div>

							<div className="form-group">
								<label for="giasanpham">Giá</label>
								<input type="number" name="giasanpham" id="giasanpham" className="form-control"
									value="" required />
							</div>

						</form>
					</div>
				</div>
				<div className="card-footer">
					<button className="btn btn-flat btn-primary" form="manage">Lưu</button>
					<a className="btn btn-flat btn-default" href="?page=sanpham">Hủy</a>
				</div>
			</div>
		</>
	);
}

export default SanPhamChiTiet;