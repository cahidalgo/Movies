import { useState } from "react";

type Ripple = { id: number; x: number; y: number; size: number };
let _id = 0;

export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  function addRipple(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    setRipples((rs) => [...rs, { id: _id++, x, y, size }]);
    // limpia después de la animación
    setTimeout(() => setRipples((rs) => rs.slice(1)), 500);
  }
  return { ripples, addRipple };
}
