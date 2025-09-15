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
        <clipPath id="spade-clip">
           <path d="M50,10 C25,40 20,60 50,90 C80,60 75,40 50,10 Z" />
        </clipPath>
      </defs>
      
      {/* Spade shape */}
      <path d="M50,10 C25,40 20,60 50,90 C80,60 75,40 50,10 Z" fill="black" stroke="white" strokeWidth="2" />
      <path d="M45 85 h10 l-5 15 z" fill="black" />

      {/* Splashed dots */}
      <g clipPath="url(#spade-clip)">
        <circle cx="40" cy="40" r="2" fill="grey" opacity="0.7" />
        <circle cx="60" cy="35" r="1.5" fill="grey" opacity="0.6" />
        <circle cx="50" cy="55" r="2.5" fill="grey" opacity="0.8" />
        <circle cx="45" cy="65" r="1" fill="grey" opacity="0.5" />
        <circle cx="58" cy="70" r="2" fill="grey" opacity="0.7" />
        <circle cx="35" cy="50" r="1.2" fill="grey" opacity="0.6" />
      </g>
      
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
