// movies-app/server/prisma.config.ts
import path from "node:path";
import { defineConfig } from "prisma/config";
// Importa variables de entorno al usar prisma.config.ts
import "dotenv/config";

export default defineConfig({
  // Ubicación del schema
  schema: path.join("prisma", "schema.prisma"),

  // (Opcional) Carpeta de migraciones
  migrations: {
    path: path.join("prisma", "migrations"),
    // (Opcional) Si luego agregas seed:
    // seed: "tsx --env-file=.env prisma/seed.ts",
  },

  // (Opcional) Otros directorios si los llegas a usar:
  // views: { path: path.join("db", "views") },
  // typedSql: { path: path.join("db", "queries") },
});
