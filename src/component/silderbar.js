import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { Cookies } from "react-cookie";

const Sidebar = () => {
  const { isFlipped } = useStateContext();
  const cookies = new Cookies();

  const userInfo = cookies.get("userinfo");

  return (
    <div className={`sidebar left ${isFlipped ? "fliph" : ""}`}>
      <div className="user-panel">
        <div className="info">
          <p>{Array.isArray(userInfo) ? userInfo[0]?.TenNhanVien : ""}</p>
          <a href="#">
            <i className="fa fa-circle text-success"></i> Online
          </a>
          <a href="#">
            <i class="fa fa-user text-danger"></i>{" "}
            {Array.isArray(userInfo) && userInfo[0]?.Quyen == 1
              ? "Admin"
              : "Nhân viên"}
          </a>
        </div>
      </div>
      <ul className="list-sidebar bg-defoult">
        <li>
          <a
            href="#"
            data-toggle="collapse"
            data-target="#products"
            className={`collapsed ${isFlipped ? "active" : ""}`}
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
            <li>
              <Link to="/nha-cung-cap">Nhà cung cấp</Link>
            </li>
            <li>
              <Link to="/hoa-don">Hóa đơn</Link>
            </li>
            <li>
              <Link to="/phieu-nhap">Phiếu nhập</Link>
            </li>
            <li>
              <Link to="/khach-hang">Khách hàng</Link>
            </li>
            <li>
              <Link to="/loai-khach-hang">Loại khách hàng</Link>
            </li>
            <li>
              <Link to="/kho">Kho</Link>
            </li>
          </ul>
        </li>
        {Array.isArray(userInfo) && userInfo[0]?.Quyen == 1 ? (
          <li>
            <a
              href="#"
              data-toggle="collapse"
              data-target="#tables"
              className={`collapsed ${isFlipped ? "active" : ""}`}
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

              <li>
                <Link to="/phan-tan">Phân tán</Link>
              </li>
            </ul>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
