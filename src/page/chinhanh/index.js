import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceBranch from "../../service/ServiceBranch";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const ChiNhanh = () => {
  const { data: chinhanh } = useAsync(() => ServiceBranch.getAllBranch());
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = (ids) => {
    setOpen(true);
    setId(ids);
  };
  const handleOk = async () => {
    const res = await ServiceBranch.deleteBranch(id);
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
          <h3 className="card-title">Danh sách chi nhánh</h3>
          <div className="card-tools">
            <Link
              to="/chi-nhanh/them"
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
              <th scope="col">Mã chi nhánh</th>
              <th scope="col">Tên chi nhánh</th>
              <th scope="col">Tên tỉnh</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {chinhanh?.map((chinhanhs) => (
              <tr key={chinhanhs.MaChiNhanh}>
                <td>{chinhanhs.MaChiNhanh}</td>
                <td>{chinhanhs.TenChiNhanh}</td>
                <td>{chinhanhs.TenTinh}</td>

                <td>
                  <div className="d-flex">
                    <Link
                      className="btn btn-success"
                      to={`/chi-nhanh/${chinhanhs.MaChiNhanh}`}
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger delete_data"
                      onClick={() => showModal(chinhanhs.MaChiNhanh)}
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

export default ChiNhanh;
