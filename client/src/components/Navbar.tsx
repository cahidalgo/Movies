import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";
import { Plus, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur border-b border-white/60 bg-white/70">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center gap-3">
        <Link to="/" className="font-semibold tracking-tight">🎬 Mis Películas</Link>
        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden md:inline text-sm text-slate-600">Hola, <b>{user.name}</b></span>
              <Button onClick={() => nav("/movies/new")}><Plus size={16}/> Agregar</Button>
              <Button variant="secondary" onClick={() => { logout(); nav("/login"); }}>
                <LogOut size={16}/> Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
