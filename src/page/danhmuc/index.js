import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceDanhMuc from "../../service/ServiceDanhMuc";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const DanhMuc = () => {
  const { data: danhmuc } = useAsync(() => ServiceDanhMuc.getAllDanhMuc());
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = (ids) => {
    setOpen(true);
    setId(ids);
  };
  const handleOk = async () => {
    const res = await ServiceDanhMuc.deleteDanhMuc(id);
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
          <h3 className="card-title">Danh sách danh mục</h3>
          <div className="card-tools">
            <Link
              to="/danh-muc/them"
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
              <th scope="col">Mã danh mục</th>
              <th scope="col">Tên danh mục</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {danhmuc?.map((danhmucs) => (
              <tr key={danhmucs.MaDanhMuc}>
                <td>{danhmucs.MaDanhMuc}</td>
                <td>{danhmucs.TenDanhMuc}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      className="btn btn-success"
                      to={`/danh-muc/${danhmucs.MaDanhMuc}`}
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger delete_data"
                      onClick={() => showModal(danhmucs.MaDanhMuc)}
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

export default DanhMuc;
