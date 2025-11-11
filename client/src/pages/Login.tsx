import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres")
});
type Form = z.infer<typeof schema>;

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Form>({ resolver: zodResolver(schema) });

  return (
    <div className="grid place-items-center min-h-[70vh]">
      <Card>
        <CardHeader title="Bienvenido" subtitle="Inicia sesión para continuar" />
        <CardBody>
          <form
            className="grid gap-4 w-[min(420px,90vw)]"
            onSubmit={handleSubmit(async (v) => {
              try {
                await login(v.email, v.password);
                toast.success("Sesión iniciada");
                nav("/");
              } catch (err: any) {
                toast.error(err?.response?.data?.error ? "Credenciales inválidas" : "No se pudo iniciar sesión");
              }
            })}
          >
            <Input
              label="Correo"
              placeholder="tu@correo.com"
              leftIcon={<Mail size={16} />}
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Contraseña"
              type={showPass ? "text" : "password"}
              placeholder="••••••••"
              leftIcon={<Lock size={16} />}
              rightIcon={showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              onRightIconClick={() => setShowPass((s) => !s)}
              error={errors.password?.message}
              {...register("password")}
            />

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">¿Olvidaste tu contraseña?</span>
              <Link to="/register" className="text-indigo-600 hover:underline">
                Crear cuenta
              </Link>
            </div>

            <Button disabled={isSubmitting} loading={isSubmitting} type="submit" className="justify-center">
            <LogIn size={16} />
            Iniciar sesión
          </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
