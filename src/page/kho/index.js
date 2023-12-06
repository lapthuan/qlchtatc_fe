import { Link } from "react-router-dom";
import useAsync from "../../hook/useAsync";
import ServiceWarehouse from "../../service/ServiceWarehouse";

const Kho = () => {
  const { data: kho } = useAsync(() => ServiceWarehouse.getAllWarehouse());
  return (
    <>
      <div>
        <div className="card-header">
          <h3 className="card-title">Danh sách thươn hiệu</h3>
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
              <th scope="col">Mã kho</th>
              <th scope="col">Tên kho</th>
              <th scope="col">Chi nhanh</th>
              <th scope="col">Sản phẩm</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {kho?.map((khos) => (
              <tr key={khos.MaKho}>
                <td>{khos.MaKho}</td>
                <td>{khos.TenKho}</td>
                <td>{khos.TenChiNhanh}</td>
                <td>{khos.TenSanPham}</td>
                <td>{khos.SoLuong}</td>
                <td>
                  <div className="d-flex">
                    <Link className="btn btn-success" to={`/kho/${khos.MaKho}`}>
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

export default Kho;
