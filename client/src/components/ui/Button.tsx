import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "./cn";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRipple } from "./useRipple";

type Variant = "primary" | "secondary" | "danger" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  ripple?: boolean;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:ring-indigo-500",
  secondary:
    "bg-white text-slate-900 border hover:bg-slate-50 focus-visible:ring-slate-300",
  danger:
    "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500",
  ghost:
    "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-300"
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-4 py-2 text-sm rounded-xl",
  lg: "px-5 py-3 text-base rounded-2xl"
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", size = "md", loading = false, ripple = true, disabled, onClick, children, ...rest }, ref) => {
    const { ripples, addRipple } = useRipple();
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex select-none items-center justify-center gap-2 font-medium transition",
          "focus:outline-none focus-visible:ring-2 ring-offset-2 shadow-sm",
          styles[variant],
          sizes[size],
          isDisabled && "opacity-70 cursor-not-allowed",
          className
        )}
        whileHover={!isDisabled ? { y: -1 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        onClick={(e) => {
          if (!isDisabled && ripple) addRipple(e);
          onClick?.(e);
        }}
        {...(rest as any)}
      >
        {/* Ripple layer */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-inherit">
          {ripples.map(r => (
            <span
              key={r.id}
              className="absolute rounded-full bg-white/30 animate-[ripple_500ms_ease-out]"
              style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
            />
          ))}
        </span>

        {/* Contenido */}
        {loading && <Loader2 className="animate-spin" size={16} />}
        <span className={cn(loading && "opacity-80")}>{children}</span>

        {/* brillo sutil */}
        <span className="pointer-events-none absolute inset-0 rounded-inherit bg-white/0 group-hover:bg-white/[.00]" />
      </motion.button>
    );
  }
);

export default Button;
