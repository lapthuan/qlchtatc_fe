import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceCustomer from "../../service/ServiceCustomer";

const KhachHang = () => {
  const { data: khachhang } = useAsync(() => ServiceCustomer.getAllCustomer());
  return (
    <>
      <div>
        <div className="card-header">
          <h3 className="card-title">Danh sách khách hàng</h3>
          <div className="card-tools">
            <a
              href="san-pham/them"
              className="btn btn-flat btn-success rounded"
            >
              <span className="fas fa-plus"></span> Tạo mới
            </a>
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
            {khachhang?.map((khachhangs) => (
              <tr key={khachhangs.MaKhachHang}>
                <td>{khachhangs.MaKhachHang}</td>
                <td>{khachhangs.TenKhachHang}</td>
                <td>{khachhangs.DiaChi}</td>
                <td>{khachhangs.TenLoaiKhachHang}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      className="btn btn-success"
                      to={`/thuong-hieu/${khachhangs.MaThuongHieu}`}
                    >
                      Sửa
                    </Link>
                    <button className="btn btn-danger delete_data">Xóa</button>
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
