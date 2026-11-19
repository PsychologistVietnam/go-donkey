import { useEffect, useState } from "react";
import Hero from "../../components/hero/Hero";
import JourneyUpdates from "../../components/journey/JourneyUpdates";

function Home() {
  const [message, setMessage] = useState("Connecting...");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function connectAPI() {
      try {
        const response = await fetch("/api/health");

        if (!response.ok) {
          throw new Error("Cannot connect to API");
        }

        const data = await response.json();
        if (active) setMessage(data.message);
      } catch (err) {
        if (active) setError(err.message);
      }
    }

    connectAPI();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <div id="home">
        <Hero />
        <JourneyUpdates />
      </div>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p>{message}</p>
      )}
    </>
  );
}

export default Home;
