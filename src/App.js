import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./component/layout";
import ChiNhanh from "./page/chinhanh";
import DanhMuc from "./page/danhmuc";
import HoaDon from "./page/hoadon";
import KhachHang from "./page/khachhang";
import Kho from "./page/kho";
import LoaiKhachHang from "./page/loaikhachhang";
import NhaCungCap from "./page/nhacungcap";
import NhanVien from "./page/nhanvien";
import PhieuNhap from "./page/phieunhap";
import SanPham from "./page/sanpham";
import SanPhamChiTiet from "./page/sanpham/chitiet";
import TaiKhoan from "./page/taikhoan";
import ThuongHieu from "./page/thuonghieu";
import Tinh from "./page/tinh";
import TrangChu from "./page/trangchu";
import ChiTietChiNhanh from "./page/chinhanh/chiTietChiNhanh";
import ChiTietDanhMuc from "./page/danhmuc/chiTietDanhMuc";
import ChiTietThuongHieu from "./page/thuonghieu/chiTietThuongHieu";
import ChiTietKho from "./page/kho/chiTietKho";
import ChiTietKhachHang from "./page/khachhang/chiTietKhachHang";
import ChiTietNhaCungCap from "./page/nhacungcap/chiTietNhaCungCap";
import ChiTietNhanVien from "./page/nhanvien/chiTietNhanVien";
import ChiTietPhieuNhap from "./page/phieunhap/chiTietPhieuNhap";
import ChiTietTaiKhoan from "./page/taikhoan/chiTietTaiKhoan";
import ChiTietHoaDon from "./page/hoadon/chiTietHoaDon";
import ChiTietLKH from "./page/loaikhachhang/chiTietLoaiKH";
import ChiTietDatails from "./page/phieunhap/chiTietDetails";
import ActionChiTietDetails from "./page/phieunhap/actionChiTietDetails";
import HoaDonDeTail from "./page/hoadon/hoaDonDetails";
import ActionHoaDonDetail from "./page/hoadon/actionDetails";
import DangNhap from "./page/dangnhap";
import PhanTan from "./page/phanTan";

function App() {
  return (
    <Routes>
      <Route path="/dang-nhap" element={<DangNhap />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<SanPham />} />

        <Route path="/chi-nhanh" element={<ChiNhanh />} />
        <Route path="/chi-nhanh/:id" element={<ChiTietChiNhanh />} />

        <Route path="/danh-muc" element={<DanhMuc />} />
        <Route path="/danh-muc/:id" element={<ChiTietDanhMuc />} />

        <Route path="/hoa-don" element={<HoaDon />} />
        <Route path="/hoa-don/:id" element={<ChiTietHoaDon />} />
        <Route path="/hoa-don-detail/:id" element={<HoaDonDeTail />} />
        <Route path="/hoa-don-detail/action" element={<ActionHoaDonDetail />} />

        <Route path="/khach-hang" element={<KhachHang />} />
        <Route path="/khach-hang/:id" element={<ChiTietKhachHang />} />

        <Route path="/kho" element={<Kho />} />
        <Route path="/kho/:id" element={<ChiTietKho />} />

        <Route path="/loai-khach-hang" element={<LoaiKhachHang />} />
        <Route path="/loai-khach-hang/:id" element={<ChiTietLKH />} />

        <Route path="/san-pham" element={<SanPham />} />
        <Route path="/san-pham/:id" element={<SanPhamChiTiet />} />

        <Route path="/nha-cung-cap" element={<NhaCungCap />} />
        <Route path="/nha-cung-cap/:id" element={<ChiTietNhaCungCap />} />

        <Route path="/nhan-vien" element={<NhanVien />} />
        <Route path="/nhan-vien/:id" element={<ChiTietNhanVien />} />

        <Route path="/phieu-nhap" element={<PhieuNhap />} />
        <Route path="/phieu-nhap/:id" element={<ChiTietPhieuNhap />} />
        <Route path="/phieu-nhap-chi-tiet/:id" element={<ChiTietDatails />} />
        <Route
          path="/phieu-nhap-chi-tiet/action"
          element={<ActionChiTietDetails />}
        />

        <Route path="/tai-khoan" element={<TaiKhoan />} />
        <Route path="/tai-khoan/:id" element={<ChiTietTaiKhoan />} />

        <Route path="/thuong-hieu" element={<ThuongHieu />} />
        <Route path="/thuong-hieu/:id" element={<ChiTietThuongHieu />} />

        <Route path="/tinh" element={<Tinh />} />
        <Route path="/phan-tan" element={<PhanTan />} />
      </Route>
    </Routes>
  );
}

export default App;
