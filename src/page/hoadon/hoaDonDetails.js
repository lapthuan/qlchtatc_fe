import { Link, useParams } from "react-router-dom";
import ServiceOrder from "../../service/ServiceOrder";
import useAsync from "../../hook/useAsync";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const HoaDonDeTail = () => {
  const { id } = useParams();
  const { data: hoadon } = useAsync(() => ServiceOrder.getAOrderDetail(id));

  const [open, setOpen] = useState(false);
  const [MaPN, setMaPN] = useState();
  const [MaSP, setMaSP] = useState();
  const showModal = (ids, masp) => {
    setOpen(true);
    setMaPN(ids);
    setMaSP(masp);
  };
  const handleOk = async () => {
    const res = await ServiceOrder.deleteOrderDetail(MaPN, MaSP);
    if (res.message == "Đồng bộ xóa thành công!") {
      message.success("Xóa dữ liệu thành công");
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else message.error("Lỗi xóa dữ liệu, dữ liệu đang là khóa ngoại ");
  };
  return (
    <>
      <div>
        <Modal
          open={open}
          title="Xác nhận"
          onCancel={() => setOpen(false)}
          footer={[
            <Button key="back" onClick={() => setOpen(false)}>
              Hủy
            </Button>,
            <Button key="submit" danger type="primary" onClick={handleOk}>
              Xóa
            </Button>,
          ]}
        >
          Chắc chắn xóa dữ liệu này
        </Modal>
        <div className="card-header">
          <h3 className="card-title">Danh sách chi tiết phiếu nhập</h3>
          <div className="card-tools">
            <Link
              to={`/hoa-don-detail/action?MaPhieuNhap=${id}`}
              className="btn btn-flat btn-success rounded"
            >
              <span className="fas fa-plus"></span> Tạo mới
            </Link>
          </div>
        </div>
        <hr />

        <table id="myTable" className="table table-bordered border-primary">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Mã hóa đơn</th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Giá bán</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Thành tiền</th>
              <th scope="col">Tên nhân viên</th>
              <th scope="col">Tên chi nhánh</th>
              <th scope="col">Ngày nhập</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {hoadon?.map((hoadons) => (
              <tr key={hoadons.MaHoaDon}>
                <td>{hoadons.MaHoaDon}</td>
                <td>{hoadons.TenKhachHang}</td>
                <td>{hoadons.TenSanPham}</td>
                <td>{hoadons.GiaSanPham}</td>
                <td>{hoadons.SoLuong}</td>
                <td>{hoadons.ThanhTien}</td>
                <td>{hoadons.TenNhanVien}</td>
                <td>{hoadons.TenChiNhanh}</td>
                <td>{hoadons.NgayLap}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      className="btn btn-success"
                      to={`/hoa-don-detail/action?MaPhieuNhap=${hoadons.MaHoaDon}&&MaSanPham=${hoadons.MaSanPham}`}
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger delete_data"
                      onClick={() =>
                        showModal(hoadons.MaHoaDon, hoadons.MaSanPham)
                      }
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HoaDonDeTail;
