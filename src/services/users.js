import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const getAllUsers = async () => {
  const response = await api.get("/listar");
  return response.data;
};

export const deleteById = async id => {
  const response = await api.delete(`/deletar/${id}`);
  return response.data;
};
