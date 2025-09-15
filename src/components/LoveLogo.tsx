import { cn } from '@/lib/utils';

export function LoveLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('h-16 w-16 text-accent', className)}
      {...props}
      fill="currentColor"
    >
        <path d="M50 85C45 80 40 70 40 60C40 50 45 40 50 30C55 40 60 50 60 60C60 80 55 80 50 85Z" />
        <path d="M70 55C65 50 60 45 60 35C60 25 65 15 70 10C75 15 80 25 80 35C80 45 75 50 70 55Z" />
        <path d="M30 55C35 50 40 45 40 35C40 25 35 15 30 10C25 15 20 25 20 35C20 45 25 50 30 55Z" />
    </svg>
  );
}
