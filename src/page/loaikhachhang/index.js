import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceLoaiKhachHang from "../../service/ServiceLoaiKhachHang";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const LoaiKhachHang = () => {
  const { data: loaikhachhang } = useAsync(() =>
    ServiceLoaiKhachHang.getAllCustomerCategory()
  );

  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = (ids) => {
    setOpen(true);
    setId(ids);
  };
  const handleOk = async () => {
    const res = await ServiceLoaiKhachHang.deleteCustomerCategory(id);
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
          <h3 className="card-title">Danh sách loại khách hàng</h3>
          <div className="card-tools">
            <Link
              to="/loai-khach-hang/them"
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
              <th scope="col">Mã loại</th>
              <th scope="col">Tên loại khách hàng</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(loaikhachhang) &&
              loaikhachhang?.map((loaikhachhangs) => (
                <tr key={loaikhachhangs.MaLoaiKhachHang}>
                  <td>{loaikhachhangs.MaLoaiKhachHang}</td>
                  <td>{loaikhachhangs.TenLoaiKhachHang}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        className="btn btn-success"
                        to={`/loai-khach-hang/${loaikhachhangs.MaLoaiKhachHang}`}
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-danger delete_data"
                        onClick={() =>
                          showModal(loaikhachhangs.MaLoaiKhachHang)
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

export default LoaiKhachHang;
