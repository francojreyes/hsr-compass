import { Solution } from '../types';

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

export default generateSolutions;