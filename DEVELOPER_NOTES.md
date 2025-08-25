# Mini Roulette - Developer Notes & Prediction Guide

## Game Mechanics Overview
This is a simplified roulette with 12 numbers (1-12) arranged in a specific order on the wheel.

## Number Arrangement on Wheel
The numbers are positioned in this exact order (clockwise from top):
`[12, 2, 8, 4, 5, 10, 6, 1, 7, 11, 3, 9]`

## Color Distribution
- **Red Numbers**: 1, 3, 5, 8, 10, 12
- **Black Numbers**: 2, 4, 6, 7, 9, 11

## Betting Categories
1. **Single Numbers**: 1-12 (Payout: 11:1)
2. **Color**: Red/Black (Payout: 1:1)
3. **Even/Odd**: (Payout: 1:1)
4. **Range**: 1-6 or 7-12 (Payout: 1:1)

## "Cheat Codes" - Prediction Strategies

### Pattern Analysis
1. **Wheel Sectors**: 
   - First Quarter (12, 2, 8): Contains 1 red, 2 black
   - Second Quarter (4, 5, 10): Contains 2 red, 1 black
   - Third Quarter (6, 1, 7): Contains 1 red, 2 black
   - Fourth Quarter (11, 3, 9): Contains 1 red, 2 black

2. **Adjacent Number Strategy**:
   - Numbers next to each other on wheel often alternate colors
   - Use wheel position to predict color outcomes

### Statistical Approaches
1. **Hot/Cold Numbers**: Track which numbers haven't appeared recently
2. **Color Streaks**: After 3+ consecutive reds/blacks, opposite color becomes more likely
3. **Even/Odd Balance**: In long runs, even and odd should appear roughly equally

### Advanced Techniques
1. **Sector Betting**: Bet on multiple numbers in same wheel sector
2. **Opposite Betting**: Bet on numbers directly across from recent winners
3. **Progressive Systems**: 
   - Martingale: Double bet after losses on even-money bets
   - Fibonacci: Use sequence for bet sizing

### Wheel Physics Simulation
The wheel spins with these parameters:
- Base rotation: 1440° (4 full rotations)
- Targeting: Exact alignment with winning number
- Timing: 3-second spin duration

### Quick Reference - Number Properties
```
Number | Color | Even/Odd | Range | Wheel Position
   1   | Red   | Odd      | 1-6   | Position 7
   2   | Black | Even     | 1-6   | Position 1
   3   | Red   | Odd      | 1-6   | Position 10
   4   | Black | Even     | 1-6   | Position 3
   5   | Red   | Odd      | 1-6   | Position 4
   6   | Black | Even     | 1-6   | Position 6
   7   | Black | Odd      | 7-12  | Position 8
   8   | Red   | Even     | 7-12  | Position 2
   9   | Black | Odd      | 7-12  | Position 11
  10   | Red   | Even     | 7-12  | Position 5
  11   | Black | Odd      | 7-12  | Position 9
  12   | Red   | Even     | 7-12  | Position 0
```

### Best Prediction Method
1. Track last 5-10 results
2. Look for patterns in colors and ranges
3. Use wheel position knowledge for adjacent betting
4. Combine multiple small bets rather than single large bets
5. Set stop-loss limits and stick to them

**Remember**: This is still a game of chance. These strategies can improve odds but don't guarantee wins!