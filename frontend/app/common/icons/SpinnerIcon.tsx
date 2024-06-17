import { cn } from "../cn";

type SpinnerIconProps = {
  className?: string;
};

export function SpinnerIcon({ className }: SpinnerIconProps) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="m1,12C1,5.92,5.92,1,12,1"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
