'use client';

import { useState, useEffect } from 'react';

export const Meteors = () => {
    const [meteors, setMeteors] = useState<React.ReactNode[]>([]);
  
    useEffect(() => {
      const meteorCount = 20;
      const generatedMeteors = Array.from({ length: meteorCount }).map((_, i) => (
        <div
          key={i}
          className="meteor"
          style={{
            top: `${Math.random() * 20}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ));
      setMeteors(generatedMeteors);
    }, []);
  
    return <>{meteors}</>;
  };
