
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const statCardVariants = cva(
  "relative overflow-hidden rounded-xl p-6 backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-white/60 dark:bg-gray-800/50 border border-border",
        primary: "bg-primary/10 border border-primary/20",
        success: "bg-green-500/10 border border-green-500/20",
        warning: "bg-yellow-500/10 border border-yellow-500/20",
        danger: "bg-red-500/10 border border-red-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

export function StatCard({
  className,
  variant,
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
  ...props
}: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ variant }), className)} {...props}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                  trend.isPositive
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1.5">
                {trend.isPositive ? "hausse" : "baisse"}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="rounded-full p-2.5 bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
