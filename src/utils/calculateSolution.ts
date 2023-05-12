import { Combination, CombinationList, Input, Solution } from '../types';

const MAX_ROTATION = 6;

const sum = (nums: Array<number>): number => {
  return nums.reduce((prev, curr) => prev + curr, 0);
}

const generateSolutions = (n: number): Solution[] => {
  const solutions: Solution[] = [];
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      for (let k = 0; k <= n; k++) {
        solutions.push([i, j, k]);
      }
    }
  }
  solutions.sort((a, b) => sum(a) - sum(b));
  return solutions;
}

const sumRotations = (solution: Solution, ring: keyof Combination, combos: CombinationList) => {
  return sum(combos.map((combo, idx) => solution[idx] * (combo[ring] ? 1 : 0), 0));
}

const calculateSolution = ({
  innerPos, middlePos, outerPos,
  innerCircles, middleCircles, outerCircles,
  innerDir, middleDir, outerDir,
  combo1, combo2, combo3
}: Input) => {
  const combos: CombinationList = [combo1, combo2, combo3];
  for (const solution of generateSolutions(MAX_ROTATION)) {
    const innerFinal = innerPos + sumRotations(solution, 'inner', combos) * innerDir * innerCircles * 60;
    const middleFinal = middlePos + sumRotations(solution, 'middle', combos) * middleDir * middleCircles * 60;
    const outerFinal = outerPos + sumRotations(solution, 'outer', combos) * outerDir * outerCircles * 60;
    if ([innerFinal, middleFinal, outerFinal].every(x => x % 360 === 0)) {
      return solution;
    }
  }
}

export default calculateSolution;
