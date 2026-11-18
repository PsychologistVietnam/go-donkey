
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDist = path.resolve(
  __dirname,
  "../client/dist"
);

app.use(express.json());

// Kiểm tra server
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Go Donkey API is running"
  });
});

// Cho Express phục vụ React đã build
app.use(express.static(clientDist));

// React routes
app.use((req, res, next) => {
  if (req.method !== "GET" || req.path.startsWith("/api/")) {
    return next();
  }

  res.sendFile(
    path.join(clientDist, "index.html"),
    (err) => {
      if (err) next(err);
    }
  );
});



// Serve React static files
app.use(express.static(clientDist));

// React fallback
app.get("/{*path}", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({
      error: "API not found"
    });
  }

  res.sendFile(
    path.join(clientDist, "index.html"),
    (err) => {
      if (err) next(err);
    }
  );
});



app.listen(PORT, "0.0.0.0", () => {
  console.log(`Go Donkey running at http://localhost:${PORT}`);
});
