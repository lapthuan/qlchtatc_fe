import { Link, useParams } from "react-router-dom";
import { Form, Input, Select, Button, Row, Col, message, Modal } from "antd";
import ServiceDistributed from "../service/ServiceDistributed";
import { useEffect, useState } from "react";
const { Option } = Select;

const PhanTan = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  //Hiển thị modal
  const showModal = () => {
    setOpen(true);
  };
  //Xử lý xóa
  const handleOk = async () => {
    const res = await ServiceDistributed.DeleteTable();
    if (res.message == "Bảng ở các site đã được xóa!") {
      message.success("Bảng ở các site đã được xóa!");
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else message.error("Lỗi xóa dữ liệu, dữ liệu đang là khóa ngoại ");
  };

  //Xử lý phân tán
  const onFinish = async (values) => {
    const body = {
      bangMysql: values.bangMysql,
      cotMysql: values.cotMysql,
      phantanMysql: values.phantanMysql,
      bangOracle: values.bangOracle,
      cotOracle: values.cotOracle,
      phantanOracle: values.phantanOracle,
    };

    const res = await ServiceDistributed.PhanTanNgang(body);

    if (res.message == "Phân tán thành công") {
      message.success("Phân tán thành công!");
    } else {
      message.warning("Phân tán không thành công!");
    }
  };

  return (
    <>
      <div className="card card-outline">
        <Modal
          open={open}
          title="Xác nhận"
          onCancel={() => setOpen(false)}
          footer={[
            <Button key="back" onClick={() => setOpen(false)}>
              Hủy
            </Button>,
            <Button key="submit" danger type="primary" onClick={handleOk}>
              Xóa
            </Button>,
          ]}
        >
          Chắc chắn xóa dữ liệu này
        </Modal>

        <div>
          <span style={{ fontStyle: "italic", color: "red" }}>
            Xóa dữ liệu ở các site trước khi thực hiện phân tán:
          </span>
          {"    "}
          <Button type="primary" onClick={showModal}>
            Xóa
          </Button>
        </div>
        <div className="card-header">
          <h3 className="card-title">
            Phân tán dữ liệu về Mysql, Oracle , PostgreSQL
          </h3>
        </div>
        <div className="card-body">
          <div className="container-fluid">
            <Form form={form} onFinish={onFinish}>
              <h2>Chọn điều kiện phân tán cho Mysql</h2>
              <Form.Item
                name="bangMysql"
                label="Bảng"
                rules={[
                  {
                    required: true,
                    message: "Chọn bảng phân tán Mysql",
                  },
                ]}
              >
                <Select placeholder="Chọn bảng">
                  <Option value="tinh">Tỉnh</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="cotMysql"
                label="Cột"
                rules={[
                  {
                    required: true,
                    message: "Chọn cột của bảng cần phân tán Mysql",
                  },
                ]}
              >
                <Select placeholder="Chọn cột">
                  <Option value="TenTinh">Tên Tỉnh</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="phantanMysql"
                label="Điều kiện phấn tán Mysql"
                rules={[
                  {
                    required: true,
                    message: "Chọn điều kiện cần phân tán Mysql",
                  },
                ]}
              >
                <Select placeholder="Chọn cột">
                  <Option value="Can Tho">Cần Thơ</Option>
                </Select>
              </Form.Item>

              <h2>Chọn điều kiện phân tán cho Oracle</h2>
              <Form.Item
                name="bangOracle"
                label="Bảng"
                rules={[
                  {
                    required: true,
                    message: "Chọn bảng phân tán Oracle",
                  },
                ]}
              >
                <Select placeholder="Chọn bảng">
                  <Option value="tinh">Tỉnh</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="cotOracle"
                label="Cột"
                rules={[
                  {
                    required: true,
                    message: "Chọn cột của bảng cần phân tán Oracle",
                  },
                ]}
              >
                <Select placeholder="Chọn cột">
                  <Option value="TenTinh">Tên Tỉnh</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="phantanOracle"
                label="Điều kiện phấn tán Mysql"
                rules={[
                  {
                    required: true,
                    message: "Chọn điều kiện cần phân tán Mysql",
                  },
                ]}
              >
                <Select placeholder="Chọn cột">
                  <Option value="Ha Noi">Hà nội</Option>
                </Select>
              </Form.Item>

              <div className="card-footer">
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Link className="btn btn-flat btn-default" to={"/san-pham"}>
                  Hủy
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhanTan;
