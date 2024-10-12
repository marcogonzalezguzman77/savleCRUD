import React from "react";
import { Routes, Route } from "react-router-dom";
import ListarEstados from "./Estados/ListarEstados";
import AgregarEstado from "./Estados/AgregarEstado";
import ListarCiudades from "./Ciudades/ListarCiudades";
import AgregarCiudad from "./Ciudades/AgregarCiudad";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<h3>Bienvenido a Capacitación CRUD</h3>} />
        <Route path="/estados" element={<ListarEstados />} />
        <Route path="/agregar-estado" element={<AgregarEstado />} />
        <Route path="/ciudades" element={<ListarCiudades />} />
        <Route path="/agregar-ciudad" element={<AgregarCiudad />} />
      </Routes>
    </main>
  );
};

export default Main;
