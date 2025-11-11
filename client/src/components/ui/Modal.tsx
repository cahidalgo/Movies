import Button from "./Button";

export default function Modal({ open, title, desc, onClose, onConfirm }:{
  open: boolean; title: string; desc?: string; onClose: () => void; onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 grid place-items-center bg-black/40 p-4 z-50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="p-5 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          {desc && <p className="text-sm text-slate-500 mt-1">{desc}</p>}
        </div>
        <div className="p-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="danger" onClick={onConfirm} /* añade prop */ loading={false as any} />
        </div>
      </div>
    </div>
  );
}
