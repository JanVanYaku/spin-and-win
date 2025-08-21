import { Button } from '@/components/ui/button';
import { RotateCcw, X, RotateCw, Play } from 'lucide-react';

interface GameControlsProps {
  balance: number;
  totalBet: number;
  canSpin: boolean;
  isSpinning: boolean;
  onSpin: () => void;
  onClear: () => void;
  onRebet: () => void;
}

export const GameControls = ({
  balance,
  totalBet,
  canSpin,
  isSpinning,
  onSpin,
  onClear,
  onRebet
}: GameControlsProps) => {
  return (
    <div className="space-y-4">
      {/* Balance and bet info */}
      <div className="flex justify-between items-center text-sm">
        <div className="text-foreground">
          Bet: <span className="text-gold font-bold">{totalBet.toFixed(2)} LSL</span>
        </div>
        <div className="text-foreground">
          Balance: <span className="text-gold font-bold">{balance.toFixed(2)} LSL</span>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex gap-2 justify-center">
        <Button
          onClick={onClear}
          disabled={isSpinning || totalBet === 0}
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Clear
        </Button>

        <Button
          onClick={onRebet}
          disabled={isSpinning}
          variant="secondary"
          size="sm"
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Rebet
        </Button>

        <Button
          onClick={onSpin}
          disabled={!canSpin || isSpinning}
          className="flex items-center gap-2 bg-gradient-gold text-primary-foreground hover:opacity-90 font-bold px-6"
        >
          {isSpinning ? (
            <RotateCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          {isSpinning ? 'Spinning...' : 'Spin'}
        </Button>
      </div>
    </div>
  );
};