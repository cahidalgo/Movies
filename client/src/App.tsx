import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import MovieForm from "./pages/MovieForm";
import type { JSX } from "react";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function Private({ children }: { children: JSX.Element }) {
  const { token, ready } = useAuth();
  if (!ready) {
    return <div className="p-6 text-center text-gray-500">Cargando…</div>;
  }
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar />
          <main className="p-4 md:p-6 max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Private><Movies/></Private>} />
              <Route path="/movies/new" element={<Private><MovieForm/></Private>} />
              <Route path="/movies/:id/edit" element={<Private><MovieForm edit/></Private>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
            </Routes>
          </main>
          <Toaster position="top-center" />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
