'use client';

import { useState, useEffect } from 'react';

export const Meteors = () => {
    const [meteors, setMeteors] = useState<React.ReactNode[]>([]);
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
      if (!isMounted) return;

      const meteorCount = 20;
      const generatedMeteors = Array.from({ length: meteorCount }).map((_, i) => (
        <div
          key={i}
          className="meteor"
          style={{
            top: `${Math.random() * -10}vh`,
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 2 + 3}s`,
          }}
        />
      ));
      setMeteors(generatedMeteors);
    }, [isMounted]);

    if (!isMounted) {
        return null;
    }
  
    return <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">{meteors}</div>;
  };
