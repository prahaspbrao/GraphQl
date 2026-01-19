import "./App.css";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const QUERY = gql`
  query GetTodosWithUser {
    getTodos {
      title
      completed
      user {
        id
        name
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default App;
