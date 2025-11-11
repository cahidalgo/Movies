import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import toast from "react-hot-toast";

const schema = z
  .object({
    name: z.string().min(2, "Mínimo 2 caracteres"),
    email: z.string().email("Correo inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirm: z.string().min(6, "Mínimo 6 caracteres")
  })
  .refine((v) => v.password === v.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"]
  });

type Form = z.infer<typeof schema>;

export default function Register() {
  const { register: doRegister } = useAuth();
  const nav = useNavigate();
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Form>({ resolver: zodResolver(schema) });

  return (
    <div className="grid place-items-center min-h-[70vh]">
      <Card>
        <CardHeader title="Crear cuenta" subtitle="Regístrate para guardar tus películas" />
        <CardBody>
          <form
            className="grid gap-4 w-[min(480px,90vw)]"
            onSubmit={handleSubmit(async ({ name, email, password }) => {
              try {
                await doRegister(name, email, password);
                toast.success("Cuenta creada");
                nav("/");
              } catch (err: any) {
                const msg =
                  err?.response?.status === 409
                    ? "El correo ya está registrado"
                    : err?.response?.data?.error
                    ? "Datos inválidos"
                    : "No se pudo registrar";
                toast.error(msg);
              }
            })}
          >
            <Input
              label="Nombre"
              placeholder="Tu nombre"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Correo"
              placeholder="tu@correo.com"
              leftIcon={<Mail size={16} />}
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Contraseña"
                type={showPass1 ? "text" : "password"}
                placeholder="••••••••"
                leftIcon={<Lock size={16} />}
                rightIcon={showPass1 ? <EyeOff size={16} /> : <Eye size={16} />}
                onRightIconClick={() => setShowPass1((s) => !s)}
                error={errors.password?.message}
                {...register("password")}
              />
              <Input
                label="Confirmar contraseña"
                type={showPass2 ? "text" : "password"}
                placeholder="••••••••"
                leftIcon={<Lock size={16} />}
                rightIcon={showPass2 ? <EyeOff size={16} /> : <Eye size={16} />}
                onRightIconClick={() => setShowPass2((s) => !s)}
                error={errors.confirm?.message}
                {...register("confirm")}
              />
            </div>

            <p className="text-xs text-slate-500">
              Al registrarte aceptas nuestras condiciones de uso y tratamiento de datos.
            </p>

            <Button disabled={isSubmitting} loading={isSubmitting} type="submit" className="justify-center">
              <UserPlus size={16} />
              Registrarme
            </Button>

            <div className="text-sm text-center">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Inicia sesión
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
