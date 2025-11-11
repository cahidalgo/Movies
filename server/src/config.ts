import path from "node:path";
import dotenv from "dotenv";

// Carga .env SIEMPRE desde la carpeta server, sin depender del cwd
dotenv.config({ path: path.join(__dirname, "..", ".env") });

export const JWT_SECRET = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  // Falla rápido y con mensaje claro en desarrollo
  throw new Error("Falta JWT_SECRET en server/.env");
}
