import React from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

const Sidebar = () => {
	const { isFlipped } = useStateContext();

	return (
		<div className={`sidebar left ${isFlipped ? 'fliph' : ''}`}>
			<div className="user-panel">
				<div className="info">
					<p>bootstrap develop</p>
					<a href="#">
						<i className="fa fa-circle text-success"></i> Online
					</a>
				</div>
			</div>
			<ul className="list-sidebar bg-defoult">

				<li>
					<a
						href='#'
						data-toggle="collapse"
						data-target="#products"
						className={`collapsed ${isFlipped ? 'active' : ''}`}
					>
						<i className="fa fa-bar-chart-o"></i>
						<span className="nav-label">Quản lí</span>
						<span className="fa fa-chevron-left pull-right"></span>
					</a>
					<ul className="sub-menu collapse" id="products">
						<li className="active">
							<Link to="/san-pham">Sản phẩm</Link>
						</li>
						<li>
							<Link to="/danh-muc">Danh mục</Link>
						</li>
						<li>
							<Link to="/thuong-hieu">Thương hiệu</Link>
						</li>
						<li><Link to="/nha-cung-cap">Nhà cung cấp</Link></li>
						<li><Link to="/hoa-don">Hóa đơn</Link></li>
						<li><Link to="/phieu-nhap">Phiếu nhập</Link></li>
						<li><Link to="/khach-hang">Khách hàng</Link></li>
						<li><Link to="/loai-khach-hang">Loại khách hàng</Link></li>
						<li><Link to="/kho">Kho</Link></li>
					</ul>
				</li>
				<li>
					<a
						href='#'
						data-toggle="collapse"
						data-target="#tables"
						className={`collapsed ${isFlipped ? 'active' : ''}`}
					>
						<i className="fa fa-table"></i>
						<span className="nav-label">Quản trị</span>
						<span className="fa fa-chevron-left pull-right"></span>
					</a>
					<ul className="sub-menu collapse" id="tables">
						<li>
							<Link to="/nhan-vien">Nhân viên</Link>
						</li>
						<li>
							<Link to="/tai-khoan">Tài khoản</Link>
						</li>
						<li>
							<Link to="/chi-nhanh">Chi nhánh</Link>
						</li>
						<li>
							<Link to="/tinh">Tỉnh</Link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
