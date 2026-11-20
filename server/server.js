
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import db from "./config.js";
import authRouter from "./routes/auth.routes.js";
import { error } from "node:console";
import e from "express";



const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDist = path.resolve(
  __dirname,
  "../client/dist"
);


app.use((req, res, next)=> {
    const requestPath = req.path;

    res.on("finish",()=> {
      const message = `[HTTP] ${req.method} ${requestPath} → ${res.statusCode}`;

      if (res.statusCode >= 500) {
        console.error(message);
      }else if (res.statusCode >= 400) {
        console.warn(message);
      } else {
        console.log(message);
        
      }
    })
    next() 
}) ;






app.use(express.json());



app.use("/auth", authRouter) ;

// Kiểm tra server
app.get("/api/health", (req, res) => {
  res.json({
    success: true
  });
});





// API 404
app.use(["/auth", "/tracking", "/journey"], (req, res) => {
  res.status(404).json({
    success: false,
    message: "API not found"
  });
});

// React static files
app.use(express.static(clientDist));

// React fallback
app.get("/{*path}", (req, res, next) => {
  res.sendFile(path.join(clientDist, "index.html"), (err) => {
    if (err) next(err);
  });
});






app.listen(PORT, "0.0.0.0", () => {
  console.log(`Go Donkey running at http://localhost:${PORT}`);
});

db.getConnection()
  .then((connection) => {
    connection.release();
    console.log("MySQL connected successfully.");
  })
  .catch((error) => {
    console.error("MySQL connection failed:", error);
  });
