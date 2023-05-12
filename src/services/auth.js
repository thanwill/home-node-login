import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const newUser = async user => {
  try {
    const response = await api.post("/cadastrar", user);
    return response.data;
  } catch (error) {
    if (error.response) {
      // O servidor respondeu com um status code fora do range 2xx
      console.log(`Status: ${error.response.data}`);
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta do servidor
      console.log(`Status 2: ${error.request.status}`);
    } else {
      // Algo aconteceu na configuração da requisição que gerou o erro
      console.log(`Status 3: ${error.message}`);
    }
    console.log(error.config);
  }
};

export const login = async user => {
  try {
    const response = await api.post("/login", user);
    return response.data;
  } catch (error) {
    if (error.response) {
      // O servidor respondeu com um status code fora do range 2xx
      console.log(`Status: ${error.response.data}`);
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta do servidor
      console.log(`Status 2: ${error.request.status}`);
    } else {
      // Algo aconteceu na configuração da requisição que gerou o erro
      console.log(`Status 3: ${error.message}`);
    }
    console.log(error.config);
  }
};
