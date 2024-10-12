import { gql } from "graphql-tag";

const typeDefs = gql`
  type Estado {
    id: ID!
    nombre: String!
  }

  type Ciudad {
    id: ID!
    nombre: String!
    estado: Estado!
  }

  type Query {
    obtenerEstados: [Estado]
    obtenerCiudades: [Ciudad]
    obtenerCiudad(id: ID!): Ciudad
    obtenerEstado(id: ID!): Estado
  }

  type Mutation {
    agregarEstado(nombre: String!): Estado
    actualizarEstado(id: ID!, nombre: String!): Estado
    eliminarEstado(id: ID!): Boolean
    agregarCiudad(nombre: String!, estadoId: ID!): Ciudad
    actualizarCiudad(id: ID!, nombre: String!, estadoId: ID!): Ciudad
    eliminarCiudad(id: ID!): Boolean
  }
`;

export default typeDefs;
