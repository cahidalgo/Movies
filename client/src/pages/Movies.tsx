import { useEffect, useState } from "react";
import { api } from "../api";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

type Movie = { id:number; title:string; year:number; director:string; genre:string; posterUrl?:string|null };

export default function Movies() {
  const [, setDeleting] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState<string>("");
  const [toDelete, setToDelete] = useState<Movie | null>(null);

  const nav = useNavigate();
  const { ready, token } = useAuth();

  async function load() {
    const { data } = await api.get("/movies", { params: { q, genre, year } });
    setMovies(data);
  }

  useEffect(() => { if (ready && token) load(); }, [ready, token]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border bg-white p-4 md:p-5 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <Input label="Buscar" placeholder="Título o director" value={q} onChange={e=>setQ(e.target.value)} leftIcon={<Search size={16}/>}/>
          <Input label="Género" placeholder="Acción, Drama…" value={genre} onChange={e=>setGenre(e.target.value)}/>
          <Input label="Año" placeholder="2023" value={year} onChange={e=>setYear(e.target.value)} />
          <div className="flex items-end">
            <Button className="w-full" onClick={load}>Filtrar</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {movies.map(m => (
          <MovieCard
            key={m.id}
            movie={m}
            onEdit={() => nav(`/movies/${m.id}/edit`)}
            onDelete={() => setToDelete(m)}
          />
        ))}
        {movies.length === 0 && (
          <div className="rounded-2xl border border-dashed p-10 text-center text-slate-600 bg-white/60">
            No hay películas. Usa “Agregar” para crear tu primera ✨
          </div>
        )}
      </div>

      <Modal
        open={!!toDelete}
        title="Eliminar película"
        desc={toDelete ? `¿Seguro que deseas eliminar “${toDelete.title}”?` : ""}
        onClose={() => setToDelete(null)}
        onConfirm={async () => {
        if (!toDelete) return;
        try {
          setDeleting(true);
          await api.delete(`/movies/${toDelete.id}`);
          toast.success("Película eliminada");
          setToDelete(null);
          load();
        } catch {
          toast.error("No se pudo eliminar");
        } finally {
          setDeleting(false);
        }
      }}
        
      />
    </div>
  );
}
