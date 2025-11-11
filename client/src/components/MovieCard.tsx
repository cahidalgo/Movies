// client/src/components/MovieCard.tsx
type Props = {
  movie: { id:number; title:string; year:number; director:string; genre:string; posterUrl?:string|null };
  onEdit: () => void;
  onDelete: () => void;
}

export default function MovieCard({ movie, onEdit, onDelete }: Props) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm
        transition duration-200 ease-out transform-gpu will-change-transform
        hover:scale-[1.015] hover:shadow-lg hover:border-slate-300
      "
      tabIndex={0}
    >
      {/* Póster + contenido en dos columnas con póster GRANDE */}
      <div className="grid grid-cols-[11rem_1fr] md:grid-cols-[13rem_1fr] lg:grid-cols-[15rem_1fr]">
        {/* Póster (aprovecha alto completo, aspecto 2:3 y zoom al hover) */}
        <div className="relative">
          <div className="aspect-[2/3] w-full overflow-hidden">
            <img
              src={movie.posterUrl ?? "https://via.placeholder.com/300x450?text=No+Poster"}
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Contenido más grande y apretado */}
        <div className="p-4 md:p-5 lg:p-6 flex flex-col">
          <div className="min-w-0">
            <div className="flex items-start gap-2">
              <h3 className="text-lg md:text-xl font-semibold leading-tight truncate">
                {movie.title}
              </h3>
              <span className="ml-auto shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                {movie.year}
              </span>
            </div>

            <p className="mt-1 text-sm md:text-base text-slate-700 truncate">
              Director: <span className="font-medium">{movie.director}</span>
            </p>

            <div className="mt-2">
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                {movie.genre}
              </span>
            </div>
          </div>

          {/* Acciones compactas, visibles y con feedback al hover */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={onEdit}
              className="px-3 py-1.5 rounded-lg border text-sm transition hover:bg-slate-50 active:scale-95"
            >
              Editar
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1.5 rounded-lg border text-sm text-red-600 transition hover:bg-red-50 active:scale-95"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
