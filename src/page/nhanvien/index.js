import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceEmployee from "../../service/ServiceEmployee";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const NhanVien = () => {
  const { data: nhanvien } = useAsync(() => ServiceEmployee.getAllEmployee());
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = (ids) => {
    setOpen(true);
    setId(ids);
  };
  const handleOk = async () => {
    const res = await ServiceEmployee.deleteEmployee(id);
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
          <h3 className="card-title">Danh sách nhân viên</h3>
          <div className="card-tools">
            <Link
              to="/nhan-vien/them"
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
              <th scope="col">Mã nhân viên</th>
              <th scope="col">Tên chi nhánh</th>
              <th scope="col">Tên nhân viên</th>
              <th scope="col">Tên địa chỉ</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(nhanvien) &&
              nhanvien?.map((nhanviens) => (
                <tr key={nhanviens.MaNhanVien}>
                  <td>{nhanviens.MaNhanVien}</td>
                  <td>{nhanviens.TenChiNhanh}</td>
                  <td>{nhanviens.TenNhanVien}</td>
                  <td>{nhanviens.DiaChi}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        className="btn btn-success"
                        to={`/nhan-vien/${nhanviens.MaNhanVien}`}
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-danger delete_data"
                        onClick={() => showModal(nhanviens.MaNhanVien)}
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

export default NhanVien;
