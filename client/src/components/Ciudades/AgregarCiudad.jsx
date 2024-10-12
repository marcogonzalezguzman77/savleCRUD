import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { OBTENER_CIUDADES_ESTADOS } from "../../graphql/queries";
import { AGREGAR_CIUDAD } from "../../graphql/mutations";

const AgregarCiudad = () => {
  const [nombreCiudad, setNombreCiudad] = useState("");
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const { data, loading, error } = useQuery(OBTENER_CIUDADES_ESTADOS);
  const [agregarCiudad] = useMutation(AGREGAR_CIUDAD, {
    refetchQueries: [{ query: OBTENER_CIUDADES_ESTADOS }],
  });

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensajeError("");

    if (!nombreCiudad || !estadoSeleccionado) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      await agregarCiudad({
        variables: {
          nombre: nombreCiudad,
          estadoId: estadoSeleccionado,
        },
      });
      setNombreCiudad("");
      setEstadoSeleccionado("");
    } catch (error) {
      setMensajeError(error.message);
      console.error("Error al agregar la ciudad:", error);
    }
  };

  if (loading) return <p>Cargando estados...</p>;
  if (error) return <p>Error al cargar los estados: {error.message}</p>;

  return (
    <div>
      <h3>Agregar Ciudad</h3>
      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label className="form-label">Nombre de la Ciudad</label>
          <input
            type="text"
            className="form-control w-25"
            value={nombreCiudad}
            onChange={(e) => setNombreCiudad(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Seleccionar Estado</label>
          <select
            className="form-select w-25"
            value={estadoSeleccionado}
            onChange={(e) => setEstadoSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un estado</option>
            {data.obtenerEstados.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.nombre}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Agregar Ciudad
        </button>

        {mensajeError && (
          <p className="text-danger mt-2">Error: {mensajeError}</p>
        )}
      </form>
    </div>
  );
};

export default AgregarCiudad;
