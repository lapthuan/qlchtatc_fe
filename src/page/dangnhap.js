import { Button } from "antd";

const DangNhap = () => {
  return (
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <div class="fadeIn first">
          <h2>Đăng nhập cửa hàng</h2>
        </div>

        <form>
          <input
            type="text"
            id="login"
            class="fadeIn second myInput"
            placeholder="Nhập tài khoản"
          />

          <input
            type="text"
            id="password"
            class="fadeIn third myInput"
            placeholder="Nhập mật khẩu"
          />
          <button className="btn btn-primary w-50 m-3 "> Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};

export default DangNhap;
