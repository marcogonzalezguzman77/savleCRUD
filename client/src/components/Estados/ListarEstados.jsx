import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { OBTENER_CIUDADES_ESTADOS } from "../../graphql/queries";
import { ACTUALIZAR_ESTADO, ELIMINAR_ESTADO } from "../../graphql/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const ListarEstados = () => {
  const { data, loading, error } = useQuery(OBTENER_CIUDADES_ESTADOS);
  const [editarEstado, setEditarEstado] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");

  const [actualizarEstado] = useMutation(ACTUALIZAR_ESTADO, {
    refetchQueries: [{ query: OBTENER_CIUDADES_ESTADOS }],
  });

  const [eliminarEstado] = useMutation(ELIMINAR_ESTADO, {
    refetchQueries: [{ query: OBTENER_CIUDADES_ESTADOS }],
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const manejarEditar = (estadoId) => {
    setEditarEstado(estadoId);
    setNuevoNombre(data.obtenerEstados.find((e) => e.id === estadoId).nombre);
  };

  const manejarGuardar = async (estadoId) => {
    try {
      await actualizarEstado({
        variables: { id: estadoId, nombre: nuevoNombre },
      });
      setEditarEstado(null);
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  const manejarEliminar = async (estadoId) => {
    try {
      await eliminarEstado({ variables: { id: estadoId } });
    } catch (error) {
      console.error("Error al eliminar el estado:", error);
    }
  };

  return (
    <div>
      <h3>Lista de Estados</h3>
      <table className="table table-striped" style={{ width: "auto" }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.obtenerEstados.map((estado, index) => (
            <tr key={estado.id}>
              <td className="text-center align-middle">{index + 1}</td>
              <td className="align-middle">
                {editarEstado === estado.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                  />
                ) : (
                  estado.nombre
                )}
              </td>
              <td>
                {editarEstado === estado.id ? (
                  <button
                    className="btn btn-success me-2"
                    onClick={() => manejarGuardar(estado.id)}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                ) : (
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => manejarEditar(estado.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => manejarEliminar(estado.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarEstados;
