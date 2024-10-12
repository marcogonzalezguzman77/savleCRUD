import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import conectarDB from "./db.js";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import cors from "cors";

const iniciarServidor = async () => {
  const app = express();

  const servidorApollo = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await servidorApollo.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(servidorApollo)
  );

  await conectarDB();

  app.listen({ port: 4001 }, () =>
    console.log("Servidor corriendo en http://localhost:4001/graphql")
  );
};

iniciarServidor();
