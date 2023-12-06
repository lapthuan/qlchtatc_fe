import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceDanhMuc from "../../service/ServiceDanhMuc";

const DanhMuc = () => {
  const { data: danhmuc } = useAsync(() => ServiceDanhMuc.getAllDanhMuc());
  return (
    <>
      <div>
        <div className="card-header">
          <h3 className="card-title">Danh sách danh mục</h3>
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

export default DanhMuc;
