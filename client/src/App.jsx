
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Connecting...");
  const [error, setError] = useState("");

  useEffect(() => {
    async function connectAPI() {
      try {
        const response = await fetch("/api/health");

        if (!response.ok) {
          throw new Error("Cannot connect to API");
        }

        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        setError(err.message);
      }
    }

    connectAPI();
  }, []);

  return (
    <main>
      <h1>Go Donkey</h1>

      <p>ReactJS + Node.js + Express</p>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>{message}</p>
      )}
    </main>
  );
}

export default App;
