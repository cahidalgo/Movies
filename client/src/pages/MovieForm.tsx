import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import toast from "react-hot-toast";

const CURRENT_YEAR = new Date().getFullYear();
const schema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  year: z.coerce.number().int().min(1888, "Mínimo 1888").max(CURRENT_YEAR + 1, `Máximo ${CURRENT_YEAR + 1}`),
  director: z.string().min(1, "El director es obligatorio"),
  genre: z.string().min(1, "El género es obligatorio")
});
type Form = z.infer<typeof schema>;

export default function MovieForm({ edit }: { edit?: boolean }) {
  const nav = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState:{ errors, isSubmitting } } =
    useForm<Form>({ resolver: zodResolver(schema) as Resolver<Form> });

  useEffect(() => {
    if (edit && id) {
      setLoading(true);
      api.get(`/movies`, { params: { } })
        .then(({data}) => {
          const m = data.find((x:any)=> String(x.id)===id);
          if (m) {
            setValue("title", m.title);
            setValue("year", m.year);
            setValue("director", m.director);
            setValue("genre", m.genre);
          }
        })
        .finally(()=> setLoading(false));
    }
  }, [edit, id, setValue]);

  return (
    <Card>
      <CardHeader title={edit ? "Editar película" : "Agregar película"} subtitle="Completa los campos y guarda" />
      <CardBody>
        <form
          className="grid gap-4 max-w-xl"
          onSubmit={handleSubmit(async v => {
            try {
              if (edit && id) {
                await api.put(`/movies/${id}`, v);
                toast.success("Cambios guardados");
              } else {
                await api.post("/movies", v);
                toast.success("Película creada");
              }
              nav("/");
            } catch (err:any) {
              toast.error(err?.response?.data?.error ? "Datos inválidos" : "Error al guardar");
            }
          })}
        >
          <Input label="Título" placeholder="Interstellar" {...register("title")} error={errors.title?.message}/>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Año" type="number" placeholder="2014" {...register("year")} error={errors.year?.message}/>
            <Input label="Director" placeholder="Christopher Nolan" {...register("director")} error={errors.director?.message}/>
            <Input label="Género" placeholder="Ciencia ficción" {...register("genre")} error={errors.genre?.message}/>
          </div>
          <div className="flex gap-2">
            <Button disabled={isSubmitting || loading} loading={isSubmitting || loading} type="submit">
              {edit ? "Guardar cambios" : "Crear"}
            </Button>
            <Button variant="secondary" type="button" onClick={()=> nav("/")}>Cancelar</Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
