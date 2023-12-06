import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceEmployee from "../../service/ServiceEmployee";

const NhanVien = () => {
  const { data: nhanvien } = useAsync(() => ServiceEmployee.getAllEmployee());
  return (
    <>
      <div>
        <div className="card-header">
          <h3 className="card-title">Danh sách nhân viên</h3>
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
              <th scope="col">Mã nhân viên</th>
              <th scope="col">Tên chi nhánh</th>
              <th scope="col">Tên nhân viên</th>
              <th scope="col">Tên địa chỉ</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {nhanvien?.map((nhanviens) => (
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

export default NhanVien;
