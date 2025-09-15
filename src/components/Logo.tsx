import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn('h-8 w-8', className)}
      {...props}
    >
      <defs>
        <linearGradient id="grass-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#a7f3d0' }} />
          <stop offset="33%" style={{ stopColor: '#bae6fd' }} />
          <stop offset="66%" style={{ stopColor: '#d8b4fe' }} />
          <stop offset="100%" style={{ stopColor: '#fed7aa' }} />
        </linearGradient>
      </defs>
      
      {/* Spade Shape */}
      <path
        d="M 50,5 C 25,25 10,45 20,65 C 25,75 40,95 50,95 C 60,95 75,75 80,65 C 90,45 75,25 50,5 Z"
        fill="black"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />
      <path
        d="M 45,90 L 55,90 L 50,100 Z"
        fill="black"
        stroke="#e5e7eb"
        strokeWidth="1.5"
      />

      {/* Splashed dots */}
      <circle cx="45" cy="40" r="2.5" fill="grey" opacity="0.6" />
      <circle cx="60" cy="35" r="1.5" fill="grey" opacity="0.5" />
      <circle cx="52" cy="55" r="3" fill="grey" opacity="0.7" />
      <circle cx="42" cy="65" r="1.5" fill="grey" opacity="0.4" />
      <circle cx="58" cy="70" r="2" fill="grey" opacity="0.6" />
      <circle cx="38" cy="50" r="2" fill="grey" opacity="0.5" />
      
      {/* Curvy grass */}
      <path
        d="M10 60 C 30 40, 70 80, 90 50"
        stroke="url(#grass-gradient)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
