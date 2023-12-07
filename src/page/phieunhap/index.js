import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceDeliveryReceipt from "../../service/ServiceDeliveryReceipt";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const PhieuNhap = () => {
  const { data: phieunhap } = useAsync(() =>
    ServiceDeliveryReceipt.getAllDeliveryReceipt()
  );

  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = (ids) => {
    setOpen(true);
    setId(ids);
  };
  const handleOk = async () => {
    const res = await ServiceDeliveryReceipt.deleteDeliveryReceipt(id);
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
          <h3 className="card-title">Danh sách phiếu nhập</h3>
          <div className="card-tools">
            <Link
              to="/phieu-nhap/them"
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
              <th scope="col">Tên nhà cung cap</th>
              <th scope="col">Tên chi nhánh</th>
              <th scope="col">Tên ngày nhập</th>
              <th scope="col">Tổng tiền</th>
              <th scope="col">Chi tiết</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(phieunhap) && phieunhap?.map((phieunhaps) => (
              <tr key={phieunhaps.MaPhieuNhap}>
                <td>{phieunhaps.MaPhieuNhap}</td>
                <td>{phieunhaps.TenNhaCungCap}</td>
                <td>{phieunhaps.TenChiNhanh}</td>
                <td>{phieunhaps.NgayNhap}</td>
                <td>{phieunhaps.TongTien}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      className="btn btn-default"
                      to={`/phieu-nhap-chi-tiet/${phieunhaps.MaPhieuNhap}`}
                    >
                      Chi tiết
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="d-flex">
                    <Link
                      className="btn btn-success"
                      to={`/phieu-nhap/${phieunhaps.MaPhieuNhap}`}
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger delete_data"
                      onClick={() => showModal(phieunhaps.MaPhieuNhap)}
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

export default PhieuNhap;
