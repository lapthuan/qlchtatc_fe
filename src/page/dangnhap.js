import { useState } from "react";
import ServiceEmployee from "../service/ServiceEmployee";
import { Cookies } from "react-cookie";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const DangNhap = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleUserLogin = async (e) => {
    e.preventDefault();
    const body = {
      taikhoan: userName,
      matkhau: passWord,
    };
    const res = await ServiceEmployee.loginEmployee(body);
    if (res.message == "Sai tên tài khoản hoặc mật khẩu") {
      message.warning(res.message);
    }
    if (res) {
      cookie.set("userinfo", res);
      navigate("/");
    }
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <h2>Đăng nhập cửa hàng</h2>
        </div>

        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second myInput"
            placeholder="Nhập tài khoản"
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="password"
            id="password"
            className="fadeIn third myInput"
            placeholder="Nhập mật khẩu"
            onChange={(e) => setPassWord(e.target.value)}
          />
          <button
            className="btn btn-primary w-50 m-3 "
            onClick={(e) => handleUserLogin(e)}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default DangNhap;
