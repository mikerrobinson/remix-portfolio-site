import { Link, type LinkProps } from "react-router";

import cn from "~/utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  className?: string;
  href: string;
} & Omit<LinkProps, "to">;

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
  href,
  className,
  ...props
}: ButtonProps) {
  return (
    <Link
      to={href}
      className={cn(baseStyles, variants[variant], className)}
      prefetch="viewport"
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{children}</span>
    </Link>
  );
}
