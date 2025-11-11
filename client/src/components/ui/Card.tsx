export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">{children}</div>;
}
export function CardBody({ children, className="" }: { children: React.ReactNode; className?: string; }) {
  return <div className={"p-4 md:p-6 "+className}>{children}</div>;
}
export function CardHeader({ title, subtitle }: { title: string; subtitle?: string; }) {
  return (
    <div className="p-4 md:p-6 border-b border-slate-100">
      <h3 className="text-lg font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}
