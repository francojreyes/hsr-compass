import { Combination, CombinationList, Input, Solution } from '../types';

const sum = (nums: Array<number>): number => {
  return nums.reduce((prev, curr) => prev + curr, 0);
}

/**
 * Generator function that yields all possible solutions in order of least to
 * most total rotations. Maximum is [5, 5, 5] as 6 rotations is guaranteed no-op.
 */
function *generateSolutions(): Generator<Solution> {
  // Generate all solutions with a total of 0 and go up
  for (let n = 0; n <= 15; n++) {
    // Fix the first number i
    for (let i = 0; i <= Math.min(n, 5); i++) {
      // Partition the remaining value (n - i) into two
      for (let j = 0; j <= Math.min(n - i, 5); j++) {
        if (n - i - j <= 5) {
          yield [i, j, n - i - j];
        }
      }
    }
  }
}

const sumRotations = (solution: Solution, ring: keyof Combination, combos: CombinationList) => {
  return sum(combos.map((combo, idx) => solution[idx] * (combo[ring] ? 1 : 0), 0));
}

const calculateSolution = ({
  innerPos, middlePos, outerPos,
  innerCircles, middleCircles, outerCircles,
  innerDir, middleDir, outerDir,
  combo1, combo2, combo3
}: Input): Solution => {
  const combos: CombinationList = [combo1, combo2, combo3];
  console.log([...generateSolutions()])
  for (const solution of generateSolutions()) {
    const innerFinal = innerPos + sumRotations(solution, 'inner', combos) * innerDir * innerCircles * 60;
    const middleFinal = middlePos + sumRotations(solution, 'middle', combos) * middleDir * middleCircles * 60;
    const outerFinal = outerPos + sumRotations(solution, 'outer', combos) * outerDir * outerCircles * 60;
    if ([innerFinal, middleFinal, outerFinal].every(x => x % 360 === 0)) {
      return solution;
    }
  }
  return [-1, -1, -1];
}

export default calculateSolution;
