import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceAccount from "../../service/ServiceAccount";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const TaiKhoan = () => {
  const { data: account } = useAsync(() => ServiceAccount.getAllAccount());
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = (ids) => {
    setOpen(true);
    setId(ids);
  };
  const handleOk = async () => {
    const res = await ServiceAccount.deleteAccount(id);
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
          <h3 className="card-title">Danh sách tài khoản</h3>
          <div className="card-tools">
            <Link
              to="/tai-khoan/them"
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
              <th scope="col">Tên tài khoản</th>
              <th scope="col">Nhân viên</th>
              <th scope="col">Mật khẩu</th>
              <th scope="col">Quyền</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(account) &&
              account?.map((accounts) => (
                <tr key={accounts.TenTK}>
                  <td>{accounts.TenTK}</td>
                  <td>{accounts.TenNhanVien}</td>
                  <td>{accounts.Matkhau}</td>
                  <td>{accounts.Quyen}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        className="btn btn-success"
                        to={`/tai-khoan/${accounts.TenTK}`}
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-danger delete_data"
                        onClick={() => showModal(accounts.TenTK)}
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

export default TaiKhoan;
