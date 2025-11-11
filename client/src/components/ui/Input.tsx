import { cn } from "./cn";
import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, leftIcon, rightIcon, onRightIconClick, className, ...rest }, ref) => {
    return (
      <label className="block">
        {label && <span className="block text-sm mb-1 text-slate-700">{label}</span>}
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm",
            "focus-within:ring-2 focus-within:ring-indigo-500",
            error ? "border-red-300" : "border-slate-200",
            className
          )}
        >
          {leftIcon && <span className="text-slate-500">{leftIcon}</span>}
          <input ref={ref} className="w-full outline-none placeholder:text-slate-400" {...rest} />
          {rightIcon &&
            (onRightIconClick ? (
              <button type="button" onClick={onRightIconClick} className="text-slate-500 hover:text-slate-700">
                {rightIcon}
              </button>
            ) : (
              <span className="text-slate-500">{rightIcon}</span>
            ))}
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </label>
    );
  }
);

export default Input;
