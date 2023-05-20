import { Routes, Route } from "react-router-dom";
import Erro from "../pages/erro";
import Cadastro from "../pages/inicio";

export default function ConfigRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Cadastro />} />
      <Route path='*' element={<Erro />} />
    </Routes>
  );
}
