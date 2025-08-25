# Mini Roulette - Developer Notes & Prediction Guide

## Game Mechanics Overview
This is a simplified roulette with 12 numbers (1-12) arranged in a specific order on the wheel.

## Number Arrangement on Wheel
The numbers are positioned in this exact order (clockwise from top):
`[12, 2, 8, 4, 5, 10, 6, 1, 7, 11, 3, 9]`

## Color Distribution
- **Red Numbers**: 1, 3, 5, 8, 10, 12
- **Black Numbers**: 2, 4, 6, 7, 9, 11

## Betting Categories & Payouts
1. **Single Numbers**: 1-12 (Different multipliers based on frequency)
   - Numbers 2, 4, 6: 11.64x payout
   - Numbers 8, 10, 12: 5.82x payout
   - Numbers 1, 3, 5, 7, 9, 11: 2.91x payout
2. **Color**: Red/Black (1.94x payout)
3. **Even/Odd**: (1.94x payout)
4. **Range**: 1-6 or 7-12 (1.94x payout)

## "Cheat Codes" - Advanced Prediction Strategies

### 🎯 Real Pattern Analysis
1. **Wheel Physics Simulation**:
   - The game uses: `finalRotation = rotation + 1440 - targetAngle`
   - 1440° = exactly 4 full rotations before stopping
   - The ball always stops at the TOP position (12 o'clock)
   - Knowing the formula, you can predict the visual outcome

2. **Pseudo-Random Number Generation**:
   - JavaScript uses `Math.floor(Math.random() * 12) + 1`
   - This is NOT truly random - it's based on system time seed
   - Pattern can emerge based on timing of spins

### 🔥 Hot Exploitation Methods

#### Method 1: "Seed Timing Attack"
```javascript
// The game generates numbers with Math.random()
// Rapid consecutive spins often follow patterns due to seed timing
// Strategy: Spin 3 times quickly, note the sequence, predict 4th
```

#### Method 2: "Sector Concentration"
- Monitor which quarter of the wheel hasn't hit recently
- Wheel sectors (3 numbers each):
  - Sector 1: 12, 2, 8 (1 red, 2 black)
  - Sector 2: 4, 5, 10 (1 black, 2 red) 
  - Sector 3: 6, 1, 7 (2 black, 1 red)
  - Sector 4: 11, 3, 9 (2 black, 1 red)

#### Method 3: "Statistical Deviation Exploit"
- Track 20+ spins for each category
- When one category falls behind expected frequency, bet heavily on it
- Expected frequencies per 12 spins:
  - Red: 6 times
  - Black: 6 times  
  - Even: 6 times
  - Odd: 6 times
  - 1-6: 6 times
  - 7-12: 6 times

### 💰 Bankroll Management "Hacks"

#### The "Pyramid Progression"
1. Start with 1 unit on high-payout numbers (2, 4, 6)
2. If lose, bet 2 units on medium-payout (8, 10, 12)
3. If lose again, bet 4 units on low-payout (1, 3, 5, 7, 9, 11)
4. Reset after win

#### The "Color Streak Breaker"
- After 5+ consecutive same colors, bet maximum on opposite color
- Probability math suggests streak will break
- Use 25% of bankroll for this bet

### 🎮 Making an Unpredictable Game (Anti-Cheat)

#### Server-Side Solutions:
1. **True Random Number Generation**:
   ```javascript
   // Replace Math.random() with crypto.getRandomValues()
   const array = new Uint32Array(1);
   crypto.getRandomValues(array);
   const winningNumber = (array[0] % 12) + 1;
   ```

2. **Variable Spin Duration**:
   - Randomize spin time between 2-5 seconds
   - Add random delay before number generation

3. **Quantum Random APIs**:
   - Use external quantum random number services
   - APIs like random.org or quantum random generators

4. **Multi-Layer Randomization**:
   ```javascript
   // Combine multiple entropy sources
   const timeEntropy = Date.now() % 1000;
   const mouseEntropy = lastMousePosition.x + lastMousePosition.y;
   const cryptoEntropy = crypto.getRandomValues(new Uint32Array(1))[0];
   const seed = timeEntropy ^ mouseEntropy ^ cryptoEntropy;
   ```

#### Client-Side Obfuscation:
1. **Delayed Number Reveal**: Generate number server-side, only reveal after animation
2. **Fake Spin Physics**: Show realistic wheel physics but ignore for actual result
3. **Multiple RNG Calls**: Make several random calls, use only the last one

### 🚨 Current Game Vulnerabilities

1. **Predictable Math.random()**: Easy to exploit with timing
2. **Client-side generation**: Number is generated in browser
3. **Fixed spin duration**: 3 seconds exactly, predictable timing
4. **No entropy mixing**: Single random source
5. **Visible in DevTools**: Can inspect the winning number before animation ends

### Quick Reference - Exploit Priority
```
High Value Targets (Best ROI):
Numbers 2, 4, 6 → 11.64x payout
- Bet when these haven't appeared in 10+ spins

Medium Value:
Numbers 8, 10, 12 → 5.82x payout  
- Sector 2 coverage strategy

Low Risk/High Frequency:
Color bets → 1.94x payout
- Streak breaking method
```

**⚠️ Disclaimer**: These strategies exploit the current implementation. In a real casino or properly secured game, such patterns would not exist. Use for educational purposes only!