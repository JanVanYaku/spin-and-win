import { useState, useEffect } from 'react';

interface RouletteWheelProps {
  isSpinning: boolean;
  winningNumber: number | null;
  onSpinComplete: () => void;
}

const numbers = [12, 2, 8, 4, 5, 10, 6, 1, 7, 11, 3, 9];

export const RouletteWheel = ({ isSpinning, winningNumber, onSpinComplete }: RouletteWheelProps) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isSpinning && winningNumber !== null) {
      // Calculate the angle for the winning number
      const numberIndex = numbers.indexOf(winningNumber);
      const anglePerSegment = 360 / 12;
      const targetAngle = numberIndex * anglePerSegment;
      
      // Add multiple full rotations plus the target angle, offset by half segment to center on number
      const finalRotation = rotation + 1440 + (360 - targetAngle) + (anglePerSegment / 2);
      
      setRotation(finalRotation);
      
      // Complete spin after animation
      setTimeout(() => {
        onSpinComplete();
      }, 3000);
    }
  }, [isSpinning, winningNumber, rotation, onSpinComplete]);

  const getSegmentColor = (number: number) => {
    // Red numbers: 1, 3, 5, 9, 12
    // Black numbers: 2, 4, 6, 7, 8, 10, 11
    const redNumbers = [1, 3, 5, 9, 12];
    return redNumbers.includes(number) ? 'bg-gradient-red' : 'bg-gradient-black';
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Wheel container */}
      <div className="relative w-64 h-64">
        {/* Wheel */}
        <div 
          className="relative w-full h-full rounded-full border-4 border-gold shadow-2xl transition-transform duration-[3000ms] ease-out"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            background: 'conic-gradient(from 0deg, hsl(0 84% 60%) 0deg 30deg, hsl(0 0% 15%) 30deg 60deg, hsl(0 84% 60%) 60deg 90deg, hsl(0 0% 15%) 90deg 120deg, hsl(0 84% 60%) 120deg 150deg, hsl(0 0% 15%) 150deg 180deg, hsl(0 84% 60%) 180deg 210deg, hsl(0 0% 15%) 210deg 240deg, hsl(0 84% 60%) 240deg 270deg, hsl(0 0% 15%) 270deg 300deg, hsl(0 84% 60%) 300deg 330deg, hsl(0 0% 15%) 330deg 360deg)'
          }}
        >
          {/* Numbers on wheel */}
          {numbers.map((number, index) => {
            const angle = (index * 30) - 90; // 30 degrees per segment, -90 to start at top
            return (
              <div
                key={number}
                className="absolute w-6 h-6 flex items-center justify-center text-white font-bold text-sm"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-90px) rotate(${-angle}deg)`
                }}
              >
                {number}
              </div>
            );
          })}
        </div>
        
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-gray-200 rounded-full border-4 border-gold transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-2 h-2 bg-roulette-black rounded-full"></div>
        </div>
      </div>
      
      {/* Pointer */}
      <div className="absolute top-2 w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-gold"></div>
    </div>
  );
};
