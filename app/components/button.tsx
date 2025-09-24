import cn from "~/utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const baseStyles =
  "inline-flex items-center space-x-2 px-4 py-2 rounded-full font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1";

const variants = {
  primary:
    "bg-gray-900 border border-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700",
  secondary:
    "bg-gray-100 border border-gray-300 text-gray-800 hover:bg-gray-200 focus:ring-gray-400",
};

export default function Button({
  children,
  variant = "primary",
  icon,
  className,
  ...props
}: ButtonProps) {
  return (
    <a className={cn(baseStyles, variants[variant], className)} {...props}>
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{children}</span>
    </a>
  );
}
