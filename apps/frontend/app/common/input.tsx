import { ComponentPropsWithoutRef } from "react";
import { cn } from "./cn";

export type InputProps = ComponentPropsWithoutRef<"input">;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-neutral-900 shadow-xs ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-puerta-600 sm:w-56 sm:text-sm sm:leading-6",
        className,
      )}
    />
  );
}
