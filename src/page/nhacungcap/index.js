import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceNhaCungCap from "../../service/ServiceNhaCungCap";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const NhaCungCap = () => {
  const { data: nhacungcap } = useAsync(() =>
    ServiceNhaCungCap.getAllNhaCungCap()
  );

  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = (ids) => {
    setOpen(true);
    setId(ids);
  };
  const handleOk = async () => {
    const res = await ServiceNhaCungCap.deleteNhaCungCap(id);
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
          <h3 className="card-title">Danh sách nhà cung cấp</h3>
          <div className="card-tools">
            <Link
              to="/nha-cung-cap/them"
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
              <th scope="col">Mã nhà cung cấp</th>
              <th scope="col">Tên nhà cung cấp</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(nhacungcap) &&
              nhacungcap?.map((nhacungcaps) => (
                <tr key={nhacungcaps.MaNhaCungCap}>
                  <td>{nhacungcaps.MaNhaCungCap}</td>
                  <td>{nhacungcaps.TenNhaCungCap}</td>
                  <td>{nhacungcaps.DiaChi}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        className="btn btn-success"
                        to={`/nha-cung-cap/${nhacungcaps.MaNhaCungCap}`}
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-danger delete_data"
                        onClick={() => showModal(nhacungcaps.MaNhaCungCap)}
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

export default NhaCungCap;
