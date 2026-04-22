import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputCardProps {
  number: number;
  title: string;
  children: ReactNode;
  className?: string;
}

export function InputCard({ number, title, children, className }: InputCardProps) {
  return (
    <div className={cn("bg-card border border-border/40 rounded-xl overflow-hidden shadow-sm", className)}>
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border/40 bg-card/50">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
          {number}
        </div>
        <p className="font-semibold text-lg">{title}</p>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}
