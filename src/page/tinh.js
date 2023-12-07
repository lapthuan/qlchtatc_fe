import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAsync from "../hook/useAsync";
import ServiceBranch from "../service/ServiceBranch";
const Tinh = () => {
  const { data: tinh } = useAsync(() => ServiceBranch.getAllTinh());
  console.log(tinh);
  return (
    <>
      <div style={{ display: "flex" }}>
        <h4>Đang thực hiện quản lý thông tin dữ liệu của tỉnh: </h4>
        {"	"}
        {Array.isArray(tinh) &&
          tinh?.map((item) => (
            <h3 key={item.id} style={{ color: "red" }}>
              {item.TenTinh}
            </h3>
          ))}
      </div>
    </>
  );
};

export default Tinh;
