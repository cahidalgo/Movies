import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const movieSchema = z.object({
  title: z.string().min(1),
  year: z.coerce.number().int().min(1888).max(new Date().getFullYear() + 1),
  director: z.string().min(1),
  genre: z.string().min(1)
});
