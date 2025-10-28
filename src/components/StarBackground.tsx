import { useEffect, useState } from "react";

interface Star {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number;
}

interface Meteor extends Omit<Star, 'opacity'> {
  delay: number;
}

export const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    generateStars();
    generateMeteors();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generateStars = () => {
    if (typeof window === 'undefined') return;
    
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    const newStars: Star[] = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors: Meteor[] = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 15,
        animationDuration: Math.random() * 3 + 3,
      });
    }

    setMeteors(newMeteors);
  };

  return (
    <div className="fixed inset-0 overflow-hidden -z-10">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: '50%'
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor"
          style={{
            width: `${meteor.size * 50}px`,
            height: `${meteor.size * 2}px`,
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            position: 'absolute',
            backgroundColor: 'white',
            animation: `meteor ${meteor.animationDuration}s linear ${meteor.delay}s infinite`,
            transform: 'rotate(-45deg)',
            borderRadius: '50%',
            boxShadow: `0 0 ${meteor.size * 2}px ${meteor.size}px rgba(255, 255, 255, 0.5)`
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes meteor {
            0% { transform: rotate(-45deg) translateX(0); opacity: 1; }
            70% { opacity: 1; }
            100% { transform: rotate(-45deg) translateX(-500px); opacity: 0; }
          }
          .animate-pulse-subtle {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `
      }} />
    </div>
  );
};
