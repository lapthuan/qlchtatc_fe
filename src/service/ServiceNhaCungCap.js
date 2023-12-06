import requests from "./httpService";

const ServiceNhaCungCap = {
  getAllNhaCungCap: async () => {
    return requests.get(`/nhacungcap`);
  },
  getNhaCungCap: async (id) => {
    return requests.get(`/nhacungcap/${id}`);
  },
  createNhaCungCap: async (body) => {
    return requests.post(`/nhacungcap`, body);
  },
  editNhaCungCap: async (body, id) => {
    return requests.put(`/nhacungcap`, body);
  },
  deleteNhaCungCap: async (id) => {
    return requests.delete(`/nhacungcap/${id}`);
  },
};

export default ServiceNhaCungCap;
