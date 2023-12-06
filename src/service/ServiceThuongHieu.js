import requests from "./httpService";

const ServiceThuongHieu = {
    getAllThuongHieu: async () => {
        return requests.get(`/thuongHieu`);
    },
    getThuongHieu: async (id) => {
        return requests.get(`/thuongHieu/${id}`);
    },
    createThuongHieu: async (body) => {
        return requests.post(`/thuongHieu`, body);
    },
    editThuongHieu: async (body, id) => {
        return requests.put(`/thuongHieu/`, body);
    },
    deleteThuongHieu: async (id) => {
        return requests.delete(`/thuongHieu/${id}`);
    }
}

export default ServiceThuongHieu;