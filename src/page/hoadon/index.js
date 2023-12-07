import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceOrder from "../../service/ServiceOrder";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const HoaDon = () => {
  const { data: order } = useAsync(() => ServiceOrder.getAllOrder());

  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = (ids) => {
    setOpen(true);
    setId(ids);
  };
  const handleOk = async () => {
    const res = await ServiceOrder.deleteOrder(id);
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
          <h3 className="card-title">Danh sách hóa đơn</h3>
          <div className="card-tools">
            <Link
              to="/hoa-don/them"
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
              <th scope="col">Tên khác hàng</th>
              <th scope="col">Tên nhân viên</th>
              <th scope="col">Tên chi nhánh</th>
              <th scope="col">Chi tiết</th>
              <th scope="col">Ngày lập</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(order) && order?.map((orders) => (
              <tr key={orders.MaHoaDon}>
                <td>{orders.MaHoaDon}</td>
                <td>{orders.TenKhachHang}</td>
                <td>{orders.TenNhanVien}</td>
                <td>{orders.TenChiNhanh}</td>
                <td>{orders.NgayLap}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      className="btn btn-default"
                      to={`/hoa-don-detail/${orders.MaHoaDon}`}
                    >
                      Chi tiết
                    </Link>
                  </div>
                </td>
                <td>
                  <div className="d-flex">
                    <Link
                      className="btn btn-success"
                      to={`/hoa-don/${orders.MaHoaDon}`}
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger delete_data"
                      onClick={() => showModal(orders.MaHoaDon)}
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

export default HoaDon;
