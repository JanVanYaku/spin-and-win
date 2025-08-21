interface ChipSelectorProps {
  selectedChip: number;
  onChipSelect: (value: number) => void;
}

export const ChipSelector = ({ selectedChip, onChipSelect }: ChipSelectorProps) => {
  const chips = [
    { value: 1, color: 'bg-gray-400', label: '1' },
    { value: 10, color: 'bg-gradient-red', label: '10' },
    { value: 50, color: 'bg-blue-500', label: '50' },
    { value: 100, color: 'bg-green-500', label: '100' },
    { value: 500, color: 'bg-purple-600', label: '500' }
  ];

  return (
    <div className="flex gap-2 justify-center items-center">
      {chips.map((chip) => (
        <button
          key={chip.value}
          onClick={() => onChipSelect(chip.value)}
          className={`
            relative w-14 h-14 rounded-full border-4 border-gold font-bold text-white text-sm
            transition-all duration-200 hover:scale-110 shadow-lg
            ${chip.color}
            ${selectedChip === chip.value ? 'ring-4 ring-primary scale-110' : ''}
          `}
        >
          <div className="absolute inset-0 rounded-full shadow-inner bg-black/20"></div>
          <span className="relative z-10">{chip.label}</span>
        </button>
      ))}
    </div>
  );
};