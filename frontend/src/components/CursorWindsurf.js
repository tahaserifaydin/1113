import React, { useEffect, useState } from 'react';

const CursorWindsurf = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Hareket yönüne göre rotasyon hesaplama
      const deltaX = x - lastPosition.x;
      const deltaY = y - lastPosition.y;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      setLastPosition({ x, y });
      setPosition({ x, y });
      setRotation(angle);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [lastPosition]);

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'transform 0.1s ease',
      }}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Windsurf tahtası */}
        <path
          d="M20 50 L80 50"
          stroke="#ff4081"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Yelken */}
        <path
          d="M50 20 Q60 50 50 80"
          stroke="#2196f3"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Sörfçü */}
        <circle
          cx="50"
          cy="50"
          r="5"
          fill="#333"
        />
      </svg>
    </div>
  );
};

export default CursorWindsurf;
