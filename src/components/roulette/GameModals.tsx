import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle, BookOpen } from 'lucide-react';

export const HowToPlayModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
          <HelpCircle className="w-4 h-4 mr-2" />
          How to Play
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-gold">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gold">
            <div className="w-8 h-8 rounded-full bg-gradient-green flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gold rounded-full"></div>
            </div>
            MINI ROULETTE
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p>Just like classic roulette, but with better odds!</p>
          <p>Select your chips, then place them where you want on the table and spin the wheel!</p>
          <p>You can check the paytable for the odds.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const GameRulesModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
          <BookOpen className="w-4 h-4 mr-2" />
          Game Rules
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-gold max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gold">
            <div className="w-8 h-8 rounded-full bg-gradient-green flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gold rounded-full"></div>
            </div>
            MINI ROULETTE
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-gold mb-2">GAME RULES</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>- Mini Roulette is a game of chance with a rotating wheel of 12 numbers, each with red or black background;</li>
              <li>- Player can make a bet on a number, group of numbers, or different combinations;</li>
              <li>- This is a single player game. When player made his bets, he can click the spin button to start the round;</li>
              <li>- Player wins if one of his selected numbers or combinations matches the number hit by the ball;</li>
              <li>- Win multipliers are displayed in the paytable.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-gold mb-2">GAME INTERFACE</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>- Player balance shows available funds to play;</li>
              <li>- Sound can be turned off and back on from game menu;</li>
              <li>- Bet history can be accessed from game menu;</li>
              <li>- Game information and rules can be accessed from game menu;</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const PaytableModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
          Paytable
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-gold">
        <DialogHeader>
          <DialogTitle className="text-gold text-center">PAYTABLE</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-gold font-bold text-lg mb-2">11.64x</div>
            <div className="text-xs text-muted-foreground">Single Numbers<br />2, 4, 6</div>
          </div>
          <div>
            <div className="text-gold font-bold text-lg mb-2">5.82x</div>
            <div className="text-xs text-muted-foreground">Single Numbers<br />8, 10, 12</div>
          </div>
          <div>
            <div className="text-gold font-bold text-lg mb-2">2.91x</div>
            <div className="text-xs text-muted-foreground">Single Numbers<br />1, 3, 5, 7, 9, 11</div>
          </div>
          <div className="col-span-3">
            <div className="text-gold font-bold text-lg mb-2">1.94x</div>
            <div className="text-xs text-muted-foreground">1-6, Even, Odd, 7-12</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};