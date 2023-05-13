import { Combination, CombinationList, Input, Solution } from '../types';
import generateSolutions from './generateSolutions';

const sum = (nums: Array<number>): number => {
  return nums.reduce((prev, curr) => prev + curr, 0);
}

/**
 * Calculate the total number of times ring is rotated in the given solution
 * according to the given combinations
 */
const sumRotations = (solution: Solution, ring: keyof Combination, combos: CombinationList) => {
  return sum(combos.map((combo, idx) => solution[idx] * (combo[ring] ? 1 : 0), 0));
}

/**
 * Try all possible solutions and return the first one that works.
 * Returns [-1, -1, -1] if no solution is found.
 */
const calculateSolution = ({
  innerPos, middlePos, outerPos,
  innerCircles, middleCircles, outerCircles,
  innerDir, middleDir, outerDir,
  combo1, combo2, combo3
}: Input): Solution => {
  const combos: CombinationList = [combo1, combo2, combo3];
  for (const solution of generateSolutions()) {
    const innerFinal = innerPos + sumRotations(solution, 'inner', combos) * innerDir * innerCircles;
    const middleFinal = middlePos + sumRotations(solution, 'middle', combos) * middleDir * middleCircles;
    const outerFinal = outerPos + sumRotations(solution, 'outer', combos) * outerDir * outerCircles;
    if ([innerFinal, middleFinal, outerFinal].every(x => x % 6 === 0)) {
      return solution;
    }
  }
  return [-1, -1, -1];
}

export default calculateSolution;
