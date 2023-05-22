// Dedicated to public domain/licensed using [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
// Credit: Reddit u/firefly431
// https://www.reddit.com/r/HonkaiStarRail/comments/13g4pal/comment/jjzh2cz/?utm_source=share&utm_medium=web2x&context=3
import { Constraint, Input, Solution } from '../types';

/**
 * Mod that always returns positive
 */
const modPos = (x: number, n: number): number => {
  const mod = x % n;
  return mod >= 0 ? Math.abs(mod) : mod + n;
}

// copied from SO
const egcd = (a: number, b: number): [number, number, number] => {
  // returns Bezout coefficients directly
  if (a === 0) {
    return [b, 0, 1];
  } else {
    const [g, y, x] = egcd(b % a, a);
    return [g, x - Math.floor(b / a) * y, y];
  }
}

const modularInverse = (n: number, mod: number): number => {
  const [g, x] = egcd(n, mod);
  if (g !== 1) {
    throw new Error('not relatively prime');
  }
  return modPos(x, mod);
}

const bezout = (a: number, b: number): [number, number] => {
  try {
    const x = modularInverse(a, b);
    const y = Math.floor((1 - x * a) / b);
    return [x, y]
  } catch {
    const [, x, y] = egcd(a, b)
    return [x, y]
  }
}

/**
 * Solve Ax = b (mod n) where n is prime
 * Returns all possible solutions.
 *
 * e.g. solvePrime([[0, 0, 0], [0, 0, 0], [0, 1, 1]], [0, 0, 1], 2))
 * -> [[0, 1, 0], [0, 0, 1], [1, 1, 0], [1, 0, 1]]
 *
 * e.g.solvePrime([[2, 0, 2], [1, 1, 0], [0, 2, 2]], [2, 2, 0], 3))
 * -> [[0, 2, 1]]
 */
const solvePrime = (A: number[][], b: number[], n: number): number[][] => {
  const rows = A.length;
  const cols = A[0].length;
  let solved = 0;
  const freeVars: number[] = [];
  for (let pivot = 0; pivot < cols; pivot++) {
    let r = solved;
    while (r < rows) {
      if (A[r][pivot] !== 0) {
        break;
      }
      r++;
    }
    if (r === rows) {
      freeVars.push(pivot);
      continue;
    }
    for (let c = 0; c < cols; c++) {
      [A[r][c], A[solved][c]] = [A[solved][c], A[r][c]]
    }
    [b[r], b[solved]] = [b[solved], b[r]];
    r = solved
    solved += 1
    // invert row
    const inv = modularInverse(A[r][pivot], n)
    A[r] = A[r].map(val => modPos(val * inv, n))
    b[r] = modPos(b[r] * inv, n);
    // subtract from other rows
    for (let other = 0; other < rows; other++) {
      if (other === r) continue;
      const mul = A[other][pivot];
      A[other] = A[other].map((val, c) => modPos(val - mul * A[r][c], n))
      b[other] = modPos(b[other] - mul * b[r], n);
    }
  }

  // check zero row -> zero rhs
  for (let r = 0; r < rows; r++) {
    let allZero = true;
    for (let c = 0; c < cols; c++) {
      if (A[r][c] !== 0) {
        allZero = false;
        break;
      }
    }
    if (allZero && b[r] !== 0) {
      return [];
    }
  }

  const solns: number[][] = [];
  // loop over assignments to free vars
  const freeAssn = new Array<number>(freeVars.length).fill(0);
  while (true) {
    // get assignment
    const assn = new Array<number>(cols).fill(0);
    // assign free vars
    for (let i = 0; i < freeVars.length; i++) {
      assn[freeVars[i]] = freeAssn[i];
    }
    // assign solved vars
    let curVar = 0
    for (let r = 0; r < solved; r++) {
      while (A[r][curVar] === 0) {
        curVar += 1;
      }
      assn[curVar] = b[r];
      for (const i of freeVars) {
        assn[curVar] = modPos(assn[curVar] - A[r][i] * assn[i], n);
      }
    }
    solns.push(assn);
    // increment freeAssn
    let j = freeVars.length - 1;
    while (j >= 0) {
      freeAssn[j] += 1;
      if (freeAssn[j] === n) {
        freeAssn[j] = 0;
      } else {
        break;
      }
      j--;
    }
    if (j < 0) break;
  }
  return solns;
}

/**
 * Solve Ax = b (mod n) where n is a prime power p^k for some prime p and integer k.
 * Returns all possible solutions.
 *
 * e.g. solveComposite([[1, 3, 2], [1, 0, 1], [0, 2, 2]], [2, 2, 0], 2, 2)
 * -> [[0, 5, 4], [0, 2, 1], [3, 5, 4], [3, 2, 1]]
 */
const solvePrimePow = (
  A: number[][], b: number[], p: number, k: number
): number[][] => {
  // for finding multiple solutions, since the matrix itself
  // doesn't change for each solution, it's possible to cache
  // the row-operation matrix to avoid recomputing RREF
  const rows = A.length;
  const cols = A[0].length;
  if (k === 1) {
    return solvePrime(A, b, p);
  }
  // make a copy as solvePrime modifies A, b
  const origA = A.map(row => [...row]);
  const origb = [...b];
  const x1s = solvePrime(A, b, p)
  const newmod = Math.pow(p, k - 1);
  const mod = newmod * p;
  const solns: number[][] = [];
  for (const x1 of x1s) {
    // make a copy of A, b as we need to modify it
    A = origA.map(row => [...row]);
    b = [...origb];
    // substitute p x' + x1
    // in terms of p x', the RHS is then less by (coeff) * x1
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        b[r] = modPos(b[r] - A[r][c] * x1[c], mod);
      }
      b[r] = Math.floor(b[r] / p);
    }
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        A[r][c] = modPos(A[r][c], newmod);
      }
    }

    const xps = solvePrimePow(A, b, p, k - 1)
    for (const xp of xps) {
      const soln = new Array<number>(cols).fill(0);
      for (let c = 0; c < cols; c++) {
        soln[c] = p * xp[c] + x1[c];
      }
      solns.push(soln);
    }
  }
  return solns;
}

/**
 * Calculates all prime factors and their power.
 *
 * e.g. primeFactors(588) -> [[2, 2], [3, 1], [7, 2]]
 */
const primeFactors = (n: number): [number, number][] => {
  const ret: [number, number][] = [];
  let twoExp = 0;
  while (n % 2 === 0) {
    twoExp += 1;
    n = Math.floor(n / 2);
  }
  if (twoExp > 0) {
    ret.push([2, twoExp]);
  }
  let p = 3;
  while (p <= n) {
    if (n % p === 0) {
      // note: p is always prime
      // as if p were composite there would be a smaller
      // prime factor which would have already been divided out
      let exp = 0;
      while (n % p === 0) {
        exp += 1;
        n = Math.floor(n / p);
      }
      ret.push([p, exp])
    }
    p += 2
  }

  return ret
}

/**
 * Solve Ax = b (mod n) where n is composite.
 * Returns all possible solutions.
 *
 * e.g. solveComposite([[2, 0, 2], [4, 4, 0], [0, 5, 5]], [2, 2, 3], 6)
 * -> [[0, 5, 4], [0, 2, 1], [3, 5, 4], [3, 2, 1]]
 */
const solveComposite = (A: number[][], b: number[], n: number): number[][] => {
  const cols = A[0].length;
  if (n === 1) {
    // everything = 0
    return [new Array<number>(cols).fill(0)];
  }
  // a lot of this can be pre-computed for a given n
  // each soln is a list of CRT constraints (mod, vals)
  let solnCons: Constraint[][] = [[]]
  for (const [p, e] of primeFactors(n)) {
    const mod = Math.pow(p, e);
    // make copies bc modify
    const tempA = A.map(row => row.map(val => modPos(val, mod)));
    const tempb = b.map(val => modPos(val, mod));
    const oldSolns = solnCons;
    const curSolns = solvePrimePow(tempA, tempb, p, e);
    solnCons = []
    for (const old of oldSolns) {
      for (const cur of curSolns) {
        solnCons.push([...old, [mod, cur]]);
      }
    }
  }

  // compute solutions using CRT
  const solns: number[][] = [];
  for (const cons of solnCons) {
    // there's probably more efficient ways to do CRT
    // than pairwise but this works
    while (cons.length >= 2) {
      const [mod2, vals2] = cons.pop() as Constraint;
      const [mod1, vals1] = cons.pop() as Constraint;
      const [m1, m2] = bezout(mod1, mod2);
      const mod = mod1 * mod2;
      const c1 = modPos(m2 * mod2, mod);
      const c2 = modPos(m1 * mod1, mod);
      const soln = new Array<number>(cols).fill(0);
      for (let c = 0; c < cols; c++) {
        soln[c] = modPos(c1 * vals1[c] + c2 * vals2[c], mod);
      }
      cons.push([mod, soln]);
    }
    const [, vals] = cons[0];
    solns.push(vals);
  }
  return solns;
}

/**
 * Calculate the sum of an array
 */
const sum = (arr: number[]) => {
  return arr.reduce((acc, val) => acc + val, 0);
}

const calculateSolution = ({
 innerPos, middlePos, outerPos,
 innerCircles, middleCircles, outerCircles,
 innerDir, middleDir, outerDir,
 combo1, combo2, combo3
}: Input): Solution => {
  // Convert to the form Ax = b (mod 6)
  const mod = 6;
  const innerCoeff = modPos(innerCircles * innerDir, mod);
  const middleCoeff = modPos(middleCircles * middleDir, mod);
  const outerCoeff = modPos(outerCircles * outerDir, mod);
  const A = [
    [innerCoeff * +combo1.inner, innerCoeff * +combo2.inner, innerCoeff * +combo3.inner],
    [middleCoeff * +combo1.middle, middleCoeff * +combo2.middle, middleCoeff * +combo3.middle],
    [outerCoeff * +combo1.outer, outerCoeff * +combo2.outer, outerCoeff * +combo3.outer]
  ];
  const b = [
    modPos(-innerPos, mod),
    modPos(-middlePos, mod),
    modPos(-outerPos, mod)
  ];

  const solns = solveComposite(A, b, mod) as Solution[];
  if (solns.length !== 0) {
    return solns.sort((a, b) => sum(a) - sum(b))[0];
  } else {
    return [-1, -1, -1];
  }
}

export default calculateSolution;
