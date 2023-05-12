import { Routes, Route } from "react-router-dom";
import Erro from "../pages/erro";
import Cadastro from "../pages/autenticar";
import Usuarios from "../pages/usuarios";

export default function ConfigRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Cadastro />} />
      <Route path='/usuarios' element={<Usuarios />} />
      <Route path='*' element={<Erro />} />
    </Routes>
  );
}
