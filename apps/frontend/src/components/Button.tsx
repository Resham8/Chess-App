export default function Button({
  onclick,
  label,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
}: {
  onclick?: () => void;
  label: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
}) {
  const baseClasses = `font-bold rounded-lg transition-all duration-200 ease-in-out transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${fullWidth ? 'w-full' : ''}`;
  
  const variantClasses = {
    primary: "bg-gradient-to-b from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl focus:ring-emerald-400",
    secondary: "bg-gradient-to-b from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-lg hover:shadow-xl focus:ring-slate-400",
    outline: "border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white focus:ring-emerald-400",
    ghost: "text-slate-300 hover:text-white hover:bg-slate-700/50 focus:ring-slate-400"
  };
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg"
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      onClick={onclick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}