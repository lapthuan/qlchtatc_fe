import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceThuongHieu from "../../service/ServiceThuongHieu";

const ThuongHieu = () => {
  const { data: thuonghieu } = useAsync(() =>
    ServiceThuongHieu.getAllThuongHieu()
  );
  return (
    <>
      <div>
        <div className="card-header">
          <h3 className="card-title">Danh sách thương hiệu</h3>
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
              <th scope="col">Mã thương hiệu</th>
              <th scope="col">Tên thương hiệu</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {thuonghieu?.map((thuonghieus) => (
              <tr key={thuonghieus.MaThuongHieu}>
                <td>{thuonghieus.MaThuongHieu}</td>
                <td>{thuonghieus.TenThuongHieu}</td>
                <td>
                  <div className="d-flex">
                    <Link
                      className="btn btn-success"
                      to={`/thuong-hieu/${thuonghieus.MaThuongHieu}`}
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

export default ThuongHieu;
