
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './component/layout';
import ChiNhanh from './page/chinhanh';
import DanhMuc from './page/danhmuc';
import HoaDon from './page/hoadon';
import KhachHang from './page/khachhang';
import Kho from './page/kho';
import LoaiKhachHang from './page/loaikhachhang';
import NhaCungCap from './page/nhacungcap';
import NhanVien from './page/nhanvien';
import PhieuNhap from './page/phieunhap';
import SanPham from './page/sanpham';
import SanPhamChiTiet from './page/sanpham/chitiet';
import TaiKhoan from './page/taikhoan';
import ThuongHieu from './page/thuonghieu';
import Tinh from './page/tinh';
import TrangChu from './page/trangchu';

function App() {
  return (
    <Routes>


      <Route path="/" element={<Layout />}>
        <Route index element={(<TrangChu />)} />
        <Route path="/trang-chu" element={<TrangChu />} />
        <Route path="/chi-nhanh" element={<ChiNhanh />} />
        <Route path="/danh-muc" element={<DanhMuc />} />
        <Route path="/hoa-don" element={<HoaDon />} />
        <Route path="/khach-hang" element={<KhachHang />} />
        <Route path="/kho" element={<Kho />} />
        <Route path="/loai-khach-hang" element={<LoaiKhachHang />} />
        
        <Route path="/san-pham" element={<SanPham />} />
        <Route path="/san-pham/:id" element={<SanPhamChiTiet />} />

        <Route path="/nha-cung-cap" element={<NhaCungCap />} />
        <Route path="/nhan-vien" element={<NhanVien />} />
        <Route path="/phieu-nhap" element={<PhieuNhap />} />
        <Route path="/tai-khoan" element={<TaiKhoan />} />
        <Route path="/thuong-hieu" element={<ThuongHieu />} />
        <Route path="/tinh" element={<Tinh />} />

      </Route>
    </Routes>
  );
}

export default App;
