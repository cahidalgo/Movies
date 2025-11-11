import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { auth, AuthRequest } from "../middleware/auth";
import { movieSchema } from "../validators";
import { fetchPosterUrl } from "../lib/omdb";

const prisma = new PrismaClient();
const router = Router();

// Todas requieren JWT
router.use(auth);

// Listar todas las películas del usuario (con filtro opcional por género / año / q)
router.get("/", async (req: AuthRequest, res) => {
  const { genre, year, q } = req.query as { genre?: string; year?: string; q?: string };
  const where: any = { userId: req.userId };
  if (genre) where.genre = { contains: genre};
  if (year) where.year = Number(year);
  if (q) {
    where.OR = [
      { title: { contains: q} },
      { director: { contains: q} }
    ];
  }
  const movies = await prisma.movie.findMany({ where, orderBy: { createdAt: "desc" } });
  res.json(movies);
});

// Crear
router.post("/", async (req: AuthRequest, res) => {
  const parsed = movieSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const { title, year, director, genre } = parsed.data;

  const posterUrl = await fetchPosterUrl(title, year).catch(() => null);

  const movie = await prisma.movie.create({
    data: { title, year, director, genre, posterUrl, userId: req.userId! }
  });
  res.status(201).json(movie);
});

// Actualizar
router.put("/:id", async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const parsed = movieSchema.partial().strict().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const existing = await prisma.movie.findFirst({ where: { id, userId: req.userId! }});
  if (!existing) return res.status(404).json({ error: "No encontrada" });

  const data = parsed.data;

  // Si cambian título/año, refrescamos poster
  let posterUrl = existing.posterUrl;
  if (data.title || data.year) {
    posterUrl = await fetchPosterUrl(data.title ?? existing.title, data.year ?? existing.year).catch(() => posterUrl);
  }

  const updated = await prisma.movie.update({
    where: { id },
    data: { ...data, posterUrl }
  });
  res.json(updated);
});

// Eliminar
router.delete("/:id", async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const existing = await prisma.movie.findFirst({ where: { id, userId: req.userId! }});
  if (!existing) return res.status(404).json({ error: "No encontrada" });

  await prisma.movie.delete({ where: { id } });
  res.status(204).send();
});

export default router;
