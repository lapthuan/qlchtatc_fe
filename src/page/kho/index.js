import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceWarehouse from "../../service/ServiceWarehouse";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";

const Kho = () => {
  const { data: kho } = useAsync(() => ServiceWarehouse.getAllWarehouse());

  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const showModal = (ids) => {
    setOpen(true);
    setId(ids);
  };
  const handleOk = async () => {
    const res = await ServiceWarehouse.deleteWarehouse(id);
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
          <h3 className="card-title">Danh sách kho hàng</h3>
          <div className="card-tools">
            <Link to="/kho/them" className="btn btn-flat btn-success rounded">
              <span className="fas fa-plus"></span> Tạo mới
            </Link>
          </div>
        </div>
        <hr />

        <table id="myTable" className="table table-bordered border-primary">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Mã kho</th>
              <th scope="col">Tên kho</th>
              <th scope="col">Chi nhanh</th>
              <th scope="col">Sản phẩm</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(kho) &&
              kho?.map((khos) => (
                <tr key={khos.MaKho}>
                  <td>{khos.MaKho}</td>
                  <td>{khos.TenKho}</td>
                  <td>{khos.TenChiNhanh}</td>
                  <td>{khos.TenSanPham}</td>
                  <td>{khos.SoLuong}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        className="btn btn-success"
                        to={`/kho/${khos.MaKho}`}
                      >
                        Sửa
                      </Link>
                      <button
                        className="btn btn-danger delete_data"
                        onClick={() => showModal(khos.MaKho)}
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

export default Kho;
