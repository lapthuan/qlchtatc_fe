import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceNhaCungCap from "../../service/ServiceNhaCungCap";

const NhaCungCap = () => {
  const { data: nhacungcap } = useAsync(() =>
    ServiceNhaCungCap.getAllNhaCungCap()
  );
  return (
    <>
      <div>
        <div className="card-header">
          <h3 className="card-title">Danh sách nhà cung cấp</h3>
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
              <th scope="col">Mã nhà cung cấp</th>
              <th scope="col">Tên nhà cung cấp</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {nhacungcap?.map((nhacungcaps) => (
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

export default NhaCungCap;
