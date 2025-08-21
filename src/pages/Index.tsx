import { useState, useCallback } from 'react';
import { RouletteWheel } from '@/components/roulette/RouletteWheel';
import { BettingGrid } from '@/components/roulette/BettingGrid';
import { ChipSelector } from '@/components/roulette/ChipSelector';
import { GameControls } from '@/components/roulette/GameControls';
import { HowToPlayModal, GameRulesModal, PaytableModal } from '@/components/roulette/GameModals';
import { useToast } from '@/hooks/use-toast';

interface Bet {
  type: 'number' | 'group';
  value: number | string;
  amount: number;
}

const Index = () => {
  const [balance, setBalance] = useState(1000);
  const [selectedChip, setSelectedChip] = useState(10);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [bets, setBets] = useState<Bet[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [lastBets, setLastBets] = useState<Bet[]>([]);
  const { toast } = useToast();

  // Payout multipliers based on the paytable from the images
  const getPayoutMultiplier = (bet: string | number): number => {
    if (typeof bet === 'number') {
      // Single numbers with different multipliers
      if ([2, 4, 6].includes(bet)) return 11.64;
      if ([8, 10, 12].includes(bet)) return 5.82;
      if ([1, 3, 5, 7, 9, 11].includes(bet)) return 2.91;
    } else {
      // Group bets
      if (['1-6', 'Even', 'Odd', '7-12'].includes(bet)) return 1.94;
    }
    return 0;
  };

  const getTotalBet = () => {
    return bets.reduce((sum, bet) => sum + bet.amount, 0);
  };

  const handleNumberSelect = (number: number) => {
    if (isSpinning) return;
    
    const existingBetIndex = bets.findIndex(bet => bet.type === 'number' && bet.value === number);
    const newBets = [...bets];
    
    if (existingBetIndex >= 0) {
      // Add to existing bet
      newBets[existingBetIndex].amount += selectedChip;
    } else {
      // Create new bet
      newBets.push({ type: 'number', value: number, amount: selectedChip });
      setSelectedNumbers([...selectedNumbers, number]);
    }
    
    if (getTotalBetAmount(newBets) <= balance) {
      setBets(newBets);
    } else {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this bet.",
        variant: "destructive"
      });
    }
  };

  const handleGroupSelect = (group: string) => {
    if (isSpinning) return;
    
    const existingBetIndex = bets.findIndex(bet => bet.type === 'group' && bet.value === group);
    const newBets = [...bets];
    
    if (existingBetIndex >= 0) {
      // Add to existing bet
      newBets[existingBetIndex].amount += selectedChip;
    } else {
      // Create new bet
      newBets.push({ type: 'group', value: group, amount: selectedChip });
      setSelectedGroups([...selectedGroups, group]);
    }
    
    if (getTotalBetAmount(newBets) <= balance) {
      setBets(newBets);
    } else {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this bet.",
        variant: "destructive"
      });
    }
  };

  const getTotalBetAmount = (betsList: Bet[]) => {
    return betsList.reduce((sum, bet) => sum + bet.amount, 0);
  };

  const handleSpin = () => {
    if (bets.length === 0) {
      toast({
        title: "No Bets Placed",
        description: "Please place at least one bet before spinning.",
        variant: "destructive"
      });
      return;
    }

    const totalBet = getTotalBet();
    if (totalBet > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for these bets.",
        variant: "destructive"
      });
      return;
    }

    setIsSpinning(true);
    setBalance(balance - totalBet);
    setLastBets([...bets]);
    
    // Generate random winning number (1-12)
    const winNumber = Math.floor(Math.random() * 12) + 1;
    setWinningNumber(winNumber);
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);
    
    if (winningNumber === null) return;

    let totalWin = 0;
    const winningBets: Bet[] = [];

    // Check winning bets
    bets.forEach(bet => {
      let isWinner = false;
      
      if (bet.type === 'number' && bet.value === winningNumber) {
        isWinner = true;
      } else if (bet.type === 'group') {
        switch (bet.value) {
          case '1-6':
            isWinner = winningNumber >= 1 && winningNumber <= 6;
            break;
          case '7-12':
            isWinner = winningNumber >= 7 && winningNumber <= 12;
            break;
          case 'Even':
            isWinner = winningNumber % 2 === 0;
            break;
          case 'Odd':
            isWinner = winningNumber % 2 === 1;
            break;
        }
      }
      
      if (isWinner) {
        const winAmount = bet.amount * getPayoutMultiplier(bet.value);
        totalWin += winAmount;
        winningBets.push(bet);
      }
    });

    if (totalWin > 0) {
      setBalance(balance => balance + totalWin);
      toast({
        title: "Congratulations! 🎉",
        description: `You won ${totalWin.toFixed(2)} LSL! Winning number: ${winningNumber}`,
        variant: "default"
      });
    } else {
      toast({
        title: "Better luck next time!",
        description: `Winning number: ${winningNumber}. Try again!`,
        variant: "default"
      });
    }

    // Clear bets
    handleClear();
  };

  const handleClear = () => {
    setBets([]);
    setSelectedNumbers([]);
    setSelectedGroups([]);
  };

  const handleRebet = () => {
    if (lastBets.length === 0) {
      toast({
        title: "No Previous Bets",
        description: "No previous bets to repeat.",
        variant: "destructive"
      });
      return;
    }

    const totalLastBet = lastBets.reduce((sum, bet) => sum + bet.amount, 0);
    if (totalLastBet > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance to repeat the last bet.",
        variant: "destructive"
      });
      return;
    }

    setBets([...lastBets]);
    setSelectedNumbers(lastBets.filter(bet => bet.type === 'number').map(bet => bet.value as number));
    setSelectedGroups(lastBets.filter(bet => bet.type === 'group').map(bet => bet.value as string));
  };

  const canSpin = bets.length > 0 && getTotalBet() <= balance;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gold mb-2">MINI ROULETTE</h1>
          <div className="flex justify-center gap-4 text-xs">
            <HowToPlayModal />
            <GameRulesModal />
            <PaytableModal />
          </div>
        </div>

        {/* Roulette Wheel */}
        <div className="flex justify-center">
          <RouletteWheel
            isSpinning={isSpinning}
            winningNumber={winningNumber}
            onSpinComplete={handleSpinComplete}
          />
        </div>

        {/* Betting Grid */}
        <BettingGrid
          selectedNumbers={selectedNumbers}
          selectedGroups={selectedGroups}
          onNumberSelect={handleNumberSelect}
          onGroupSelect={handleGroupSelect}
          getPayoutMultiplier={getPayoutMultiplier}
        />

        {/* Game Controls */}
        <GameControls
          balance={balance}
          totalBet={getTotalBet()}
          canSpin={canSpin}
          isSpinning={isSpinning}
          onSpin={handleSpin}
          onClear={handleClear}
          onRebet={handleRebet}
        />

        {/* Chip Selector */}
        <ChipSelector
          selectedChip={selectedChip}
          onChipSelect={setSelectedChip}
        />
      </div>
    </div>
  );
};

export default Index;