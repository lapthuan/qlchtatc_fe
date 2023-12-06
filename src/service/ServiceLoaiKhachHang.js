import requests from "./httpService";

const ServiceLoaiKhachHang = {
  getAllCustomerCategory: async () => {
    return requests.get(`/loaikhachhang`);
  },
  getACustomerCategory: async (id) => {
    return requests.get(`/loaikhachhang/${id}`);
  },
  createCustomerCategory: async (body) => {
    return requests.post(`/loaikhachhang`, body);
  },
  editCustomerCategory: async (body, id) => {
    return requests.put(`/loaikhachhang`, body);
  },
  deleteCustomerCategory: async (id) => {
    return requests.delete(`/loaikhachhang/${id}`);
  },
};

export default ServiceLoaiKhachHang;
