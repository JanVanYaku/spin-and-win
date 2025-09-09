import { useState, useEffect } from 'react';

interface RouletteWheelProps {
  isSpinning: boolean;
  winningNumber: number | null;
  onSpinComplete: () => void;
}

// Numbers arranged clockwise starting from 12 o'clock position
const numbers = [12, 3, 1, 8, 5, 10, 6, 11, 7, 2, 9, 4];

export const RouletteWheel = ({ isSpinning, winningNumber, onSpinComplete }: RouletteWheelProps) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isSpinning && winningNumber !== null) {
      // Calculate the angle for the winning number
      const numberIndex = numbers.indexOf(winningNumber);
      const anglePerSegment = 360 / 12;
      
      // Calculate target angle - we need to align the winning number with the ball (top pointer)
      // Since the ball is at the top, we need to rotate so the winning number aligns with 0 degrees
      const targetAngle = numberIndex * anglePerSegment;
      
      // Add multiple full rotations (4 full spins) and rotate to the target
      const finalRotation = rotation + 1440 + (360 - targetAngle);
      
      setRotation(finalRotation);
      
      // Complete spin after animation
      setTimeout(() => {
        onSpinComplete();
      }, 3000);
    }
  }, [isSpinning, winningNumber, rotation, onSpinComplete]);

  const getSegmentColor = (number: number) => {
    // Red numbers: 1, 3, 5, 8, 10, 12
    // Black numbers: 2, 4, 6, 7, 9, 11
    const redNumbers = [1, 3, 5, 8, 10, 12];
    return redNumbers.includes(number) ? 'bg-gradient-red' : 'bg-gradient-black';
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer rim */}
      <div className="relative w-72 h-72 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 p-2">
        {/* Wheel container */}
        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-amber-700 to-amber-900 p-1">
          {/* Inner wheel with pockets */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gold">
            {/* Wheel segments with pockets */}
            <div 
              className="relative w-full h-full rounded-full transition-transform duration-[3000ms] ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {numbers.map((number, index) => {
                const angle = (index * 30); // 30 degrees per segment
                const redNumbers = [1, 3, 5, 8, 10, 12];
                const isRed = redNumbers.includes(number);
                
                return (
                  <div
                    key={number}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${angle}deg)`,
                      clipPath: 'polygon(50% 50%, 50% 0%, 56.7% 25%)'
                    }}
                  >
                    {/* Pocket segment */}
                    <div 
                      className={`w-full h-full ${isRed ? 'bg-gradient-to-r from-red-600 to-red-700' : 'bg-gradient-to-r from-gray-800 to-gray-900'}`}
                    />
                    
                    {/* Pocket border lines */}
                    <div 
                      className="absolute inset-0 border-r-2 border-gold"
                      style={{ transformOrigin: '0 50%' }}
                    />
                  </div>
                );
              })}
              
              {/* Numbers on wheel */}
              {numbers.map((number, index) => {
                const angle = (index * 30) + 15; // Center of each segment
                return (
                  <div
                    key={`number-${number}`}
                    className="absolute text-white font-bold text-lg drop-shadow-lg"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-110px) rotate(${-angle}deg)`
                    }}
                  >
                    {number}
                  </div>
                );
              })}
            </div>
            
            {/* Center hub */}
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-4 border-gold transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-xl">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Ball - positioned to fall into winning pocket */}
        {winningNumber !== null && (
          <div 
            className="absolute w-4 h-4 bg-gradient-to-br from-white to-gray-300 rounded-full border border-gray-400 shadow-lg transition-all duration-[3000ms] ease-out z-10"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${(numbers.indexOf(winningNumber) * 30) + 15}deg) translateY(-120px)`
            }}
          />
        )}
        
        {/* Static pointer at top */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-gold"></div>
        </div>
      </div>
    </div>
  );
};