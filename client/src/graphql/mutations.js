import { gql } from "@apollo/client";

export const AGREGAR_CIUDAD = gql`
  mutation agregarCiudad($nombre: String!, $estadoId: ID!) {
    agregarCiudad(nombre: $nombre, estadoId: $estadoId) {
      id
      nombre
      estado {
        nombre
      }
    }
  }
`;

export const ACTUALIZAR_CIUDAD = gql`
  mutation actualizarCiudad($id: ID!, $nombre: String!, $estadoId: ID!) {
    actualizarCiudad(id: $id, nombre: $nombre, estadoId: $estadoId) {
      id
      nombre
      estado {
        nombre
      }
    }
  }
`;

export const ELIMINAR_CIUDAD = gql`
  mutation eliminarCiudad($id: ID!) {
    eliminarCiudad(id: $id)
  }
`;

export const AGREGAR_ESTADO = gql`
  mutation agregarEstado($nombre: String!) {
    agregarEstado(nombre: $nombre) {
      id
      nombre
    }
  }
`;

export const ACTUALIZAR_ESTADO = gql`
  mutation actualizarEstado($id: ID!, $nombre: String!) {
    actualizarEstado(id: $id, nombre: $nombre) {
      id
      nombre
    }
  }
`;

export const ELIMINAR_ESTADO = gql`
  mutation eliminarEstado($id: ID!) {
    eliminarEstado(id: $id)
  }
`;
