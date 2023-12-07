import { Link, useParams } from "react-router-dom";
import ServiceDeliveryReceipt from "../../service/ServiceDeliveryReceipt";
import useAsync from "../../hook/useAsync";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const ChiTietDatails = () => {
  const { id } = useParams();
  const { data: phieunhap } = useAsync(() =>
    ServiceDeliveryReceipt.getDeliveryReceiptDetail(id)
  );

  const [open, setOpen] = useState(false);
  const [MaPN, setMaPN] = useState();
  const [MaSP, setMaSP] = useState();
  const showModal = (ids, masp) => {
    setOpen(true);
    setMaPN(ids);
    setMaSP(masp);
  };
  const handleOk = async () => {
    const res = await ServiceDeliveryReceipt.deleteDeliveryReceiptDetail(
      MaPN,
      MaSP
    );
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
              to={`/phieu-nhap-chi-tiet/action?MaPhieuNhap=${id}`}
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
              <th scope="col">Mã phiếu nhập</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Đơn giá</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Nhà cung cấp</th>
              <th scope="col">Tên chi nhánh</th>
              <th scope="col">Ngày nhập</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(phieunhap) &&
              phieunhap?.map((phieunhaps) => (
                <tr key={phieunhaps.MaPhieuNhap}>
                  <td>{phieunhaps.MaPhieuNhap}</td>
                  <td>{phieunhaps.TenSanPham}</td>
                  <td>{phieunhaps.SoLuong}</td>
                  <td>{phieunhaps.DonGia}</td>
                  <td>{phieunhaps.TongTien}</td>
                  <td>{phieunhaps.TenNhaCungCap}</td>
                  <td>{phieunhaps.TenChiNhanh}</td>
                  <td>{phieunhaps.NgayNhap}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        className="btn btn-success"
                        to={`/phieu-nhap-chi-tiet/action?MaPhieuNhap=${phieunhaps.MaPhieuNhap}&&MaSanPham=${phieunhaps.MaSanPham}`}
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-danger delete_data"
                        onClick={() =>
                          showModal(
                            phieunhaps.MaPhieuNhap,
                            phieunhaps.MaSanPham
                          )
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

export default ChiTietDatails;
