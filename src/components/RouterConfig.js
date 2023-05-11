import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Erro from "../pages/erro";

export default function ConfigRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='*' element={<Erro />} />
    </Routes>
  );
}
