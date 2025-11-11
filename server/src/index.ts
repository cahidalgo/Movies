import "./config";
import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import movieRoutes from "./routes/movies";

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Salud
app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

// Lanzar
const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`API escuchando en http://localhost:${port}`));
