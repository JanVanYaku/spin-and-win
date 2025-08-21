interface BettingGridProps {
  selectedNumbers: number[];
  selectedGroups: string[];
  onNumberSelect: (number: number) => void;
  onGroupSelect: (group: string) => void;
  getPayoutMultiplier: (bet: string | number) => number;
}

export const BettingGrid = ({ 
  selectedNumbers, 
  selectedGroups, 
  onNumberSelect, 
  onGroupSelect, 
  getPayoutMultiplier 
}: BettingGridProps) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const redNumbers = [1, 3, 5, 7, 9, 12];
  
  const groups = [
    { id: '1-6', label: '1-6', multiplier: getPayoutMultiplier('1-6') },
    { id: 'Even', label: 'Even', multiplier: getPayoutMultiplier('Even') },
    { id: 'Odd', label: 'Odd', multiplier: getPayoutMultiplier('Odd') },
    { id: '7-12', label: '7-12', multiplier: getPayoutMultiplier('7-12') }
  ];

  return (
    <div className="bg-card rounded-lg p-4 border-2 border-gold">
      {/* Individual numbers grid */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        {numbers.map((number) => {
          const isRed = redNumbers.includes(number);
          const isSelected = selectedNumbers.includes(number);
          const multiplier = getPayoutMultiplier(number);
          
          return (
            <div key={number} className="relative">
              {/* Multiplier label */}
              <div className="text-xs text-gold font-bold mb-1 text-center">
                {multiplier}x
              </div>
              <button
                onClick={() => onNumberSelect(number)}
                className={`
                  w-12 h-12 rounded-full border-2 border-gold font-bold text-white text-sm
                  transition-all duration-200 hover:scale-110 shadow-lg
                  ${isRed ? 'bg-gradient-red' : 'bg-gradient-black'}
                  ${isSelected ? 'ring-4 ring-primary scale-110' : ''}
                `}
              >
                {number}
              </button>
            </div>
          );
        })}
      </div>

      {/* Group betting options */}
      <div className="grid grid-cols-4 gap-2">
        {groups.map((group) => {
          const isSelected = selectedGroups.includes(group.id);
          
          return (
            <div key={group.id} className="relative">
              {/* Multiplier label */}
              <div className="text-xs text-gold font-bold mb-1 text-center">
                {group.multiplier}x
              </div>
              <button
                onClick={() => onGroupSelect(group.id)}
                className={`
                  w-full h-12 rounded-lg border-2 border-gold font-bold text-white text-sm
                  bg-secondary transition-all duration-200 hover:bg-secondary/80 shadow-lg
                  ${isSelected ? 'ring-4 ring-primary scale-105' : ''}
                `}
              >
                {group.label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};