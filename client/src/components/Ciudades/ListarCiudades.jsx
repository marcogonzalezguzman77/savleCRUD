import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { OBTENER_CIUDADES_ESTADOS } from "../../graphql/queries";
import { ACTUALIZAR_CIUDAD, ELIMINAR_CIUDAD } from "../../graphql/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";

const ListarCiudades = () => {
  const { data, loading, error } = useQuery(OBTENER_CIUDADES_ESTADOS);
  const [editarCiudad, setEditarCiudad] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("");

  const [actualizarCiudad] = useMutation(ACTUALIZAR_CIUDAD, {
    refetchQueries: [{ query: OBTENER_CIUDADES_ESTADOS }],
  });

  const [eliminarCiudad] = useMutation(ELIMINAR_CIUDAD, {
    refetchQueries: [{ query: OBTENER_CIUDADES_ESTADOS }],
  });

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const manejarEditar = (ciudad) => {
    setEditarCiudad(ciudad.id);
    setNuevoNombre(ciudad.nombre);
    setNuevoEstado(ciudad.estado.id);
  };

  const manejarGuardar = async (ciudadId) => {
    try {
      await actualizarCiudad({
        variables: {
          id: ciudadId,
          nombre: nuevoNombre,
          estadoId: nuevoEstado,
        },
      });
      setEditarCiudad(null); // Salir del modo edición después de guardar
    } catch (error) {
      console.error("Error al actualizar la ciudad:", error);
    }
  };

  const manejarEliminar = async (ciudadId) => {
    try {
      await eliminarCiudad({ variables: { id: ciudadId } });
    } catch (error) {
      console.error("Error al eliminar la ciudad:", error);
    }
  };

  return (
    <div>
      <h3>Lista de Ciudades</h3>
      <table className="table table-striped" style={{ width: "auto" }}>
        <thead>
          <tr>
            <th className="text-center align-middle">No.</th>
            <th>Nombre de la Ciudad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.obtenerCiudades.map((ciudad, index) => (
            <tr key={ciudad.id}>
              <td className="text-center align-middle">{index + 1}</td>
              <td className="align-middle">
                {editarCiudad === ciudad.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                  />
                ) : (
                  ciudad.nombre
                )}
              </td>
              <td className="align-middle">
                {editarCiudad === ciudad.id ? (
                  <select
                    className="form-select"
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                  >
                    {data.obtenerEstados.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.nombre}
                      </option>
                    ))}
                  </select>
                ) : (
                  ciudad.estado.nombre
                )}
              </td>
              <td>
                {editarCiudad === ciudad.id ? (
                  <button
                    className="btn btn-success me-2"
                    onClick={() => manejarGuardar(ciudad.id)}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                ) : (
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => manejarEditar(ciudad)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => manejarEliminar(ciudad.id)}
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

export default ListarCiudades;
