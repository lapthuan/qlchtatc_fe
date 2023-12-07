import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceCustomer from "../../service/ServiceCustomer";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const KhachHang = () => {
  const { data: khachhang } = useAsync(() => ServiceCustomer.getAllCustomer());
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = (ids) => {
    setOpen(true);
    setId(ids);
  };
  const handleOk = async () => {
    const res = await ServiceCustomer.deleteCustomer(id);
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
          <h3 className="card-title">Danh sách khách hàng</h3>
          <div className="card-tools">
            <Link
              to="/khach-hang/them"
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
              <th scope="col">Mã khách hàng</th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Loại khách hàng</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(khachhang) &&
              khachhang?.map((khachhangs) => (
                <tr key={khachhangs.MaKhachHang}>
                  <td>{khachhangs.MaKhachHang}</td>
                  <td>{khachhangs.TenKhachHang}</td>
                  <td>{khachhangs.DiaChi}</td>
                  <td>{khachhangs.TenLoaiKhachHang}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        className="btn btn-success"
                        to={`/khach-hang/${khachhangs.MaKhachHang}`}
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-danger delete_data"
                        onClick={() => showModal(khachhangs.MaKhachHang)}
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

export default KhachHang;
