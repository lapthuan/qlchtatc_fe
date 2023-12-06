import { useEffect } from "react";
import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceBranch from "../../service/ServiceBranch";
const ChiNhanh = () => {
  const { data: chinhanh } = useAsync(() => ServiceBranch.getAllBranch());
  return (
    <>
      <div>
        <div className="card-header">
          <h3 className="card-title">Danh sách chi nhánh</h3>
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

export default ChiNhanh;
