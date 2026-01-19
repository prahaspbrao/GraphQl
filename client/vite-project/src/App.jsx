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

  return <div className="App">
     <table>
      <tbody>
        {
          data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          ))
        }
      </tbody>
     </table>
  </div>
}

export default App;
