import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";

const typeDefs = `

  
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean
    user: User
  }

  type Query {
    getTodos: [Todo]
    getAllUsers: [User]
    getUser(id : ID!) : User
  }

`;

const resolvers = {
  Todo: {
    user: async (todo) =>
      (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`))
        .data,
  },
  Query: {
    getTodos: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
    getAllUsers: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
    getUser: async (parent, { id }) =>
      (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
        .data,
  },
};

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(), // 🔥 REQUIRED
    expressMiddleware(server),
  );

  app.listen(8000, () => {
    console.log("🚀 Server running at http://localhost:8000/graphql");
  });
}

startServer();
