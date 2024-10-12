import { gql } from "@apollo/client";

export const OBTENER_CIUDADES_ESTADOS = gql`
  query {
    obtenerCiudades {
      id
      nombre
      estado {
        id
        nombre
      }
    }
    obtenerEstados {
      id
      nombre
    }
  }
`;
