import { Input } from '../../types';
import calculateSolution from '../calculateSolution';

describe('calculateSolutions() unit tests', () => {
  it('returns [0, 0, 0] for initial values', () => {
    const input: Input = {
      innerPos: 0, middlePos: 0, outerPos: 0,
      innerCircles: 1, middleCircles: 1, outerCircles: 1,
      innerDir: 1, middleDir: 1, outerDir: 1,
      combo1: { inner: true, middle: true, outer: false },
      combo2: { inner: false, middle: true, outer: true },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([0, 0, 0]);
  });

  it('returns [-1, -1, -1] for no solution because of odd pos even circles', () => {
    const input: Input = {
      innerPos: 1, middlePos: 0, outerPos: 0,
      innerCircles: 2, middleCircles: 1, outerCircles: 1,
      innerDir: 1, middleDir: 1, outerDir: 1,
      combo1: { inner: true, middle: true, outer: false },
      combo2: { inner: false, middle: true, outer: true },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([-1, -1, -1]);
  })

  it('returns [-1, -1, -1] for no solution because all rings connected', () => {
    const input: Input = {
      innerPos: 1, middlePos: 0, outerPos: 0,
      innerCircles: 1, middleCircles: 1, outerCircles: 1,
      innerDir: 1, middleDir: 1, outerDir: 1,
      combo1: { inner: true, middle: true, outer: true },
      combo2: { inner: true, middle: true, outer: true },
      combo3: { inner: true, middle: true, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([-1, -1, -1]);
  })

  it('solves the simple case', () => {
    const input: Input = {
      innerPos: 2, innerCircles: 2, innerDir: 1,
      middlePos: 0, middleCircles: 2, middleDir: 1,
      outerPos: 4, outerCircles: 2, outerDir: 1,
      combo1: { inner: true, middle: false, outer: false },
      combo2: { inner: false, middle: true, outer: false },
      combo3: { inner: false, middle: false, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([2, 0, 1]);
  })

  it('solves with one connected combination', () => {
    const input: Input = {
      innerPos: 3, innerCircles: 1, innerDir: 1,
      middlePos: 4, middleCircles: 2, middleDir: -1,
      outerPos: 4, outerCircles: 4, outerDir: 1,
      combo1: { inner: true, middle: false, outer: false },
      combo2: { inner: false, middle: true, outer: false },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([1, 2, 2]);
  })

  it('solves with two connected combinations', () => {
    const input: Input = {
      innerPos: 2, innerCircles: 2, innerDir: -1,
      middlePos: 4, middleCircles: 2, middleDir: 1,
      outerPos: 0, outerCircles: 2, outerDir: -1,
      combo1: { inner: true, middle: false, outer: false },
      combo2: { inner: false, middle: true, outer: true },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([2, 1, 2]);
  })

  it('solves Timetable 2-4', () => {
    const input: Input = {
      innerPos: 0, innerCircles: 4, innerDir: 1,
      middlePos: 3, middleCircles: 1, middleDir: -1,
      outerPos: 2, outerCircles: 2, outerDir: 1,
      combo1: { inner: true, middle: true, outer: false },
      combo2: { inner: false, middle: true, outer: true },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([2, 1, 1]);
  })

  it('solves Timetable 3-1', () => {
    const input: Input = {
      innerPos: 1, innerCircles: 1, innerDir: 1,
      middlePos: 3, middleCircles: 3, middleDir: 1,
      outerPos: 2, outerCircles: 4, outerDir: -1,
      combo1: { inner: true, middle: true, outer: false },
      combo2: { inner: false, middle: true, outer: true },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([3, 0, 2]);
  })

  it('solves Timetable 3-2', () => {
    const input: Input = {
      innerPos: 4, innerCircles: 2, innerDir: 1,
      middlePos: 4, middleCircles: 4, middleDir: 1,
      outerPos: 3, outerCircles: 1, outerDir: -1,
      combo1: { inner: true, middle: true, outer: false },
      combo2: { inner: false, middle: true, outer: true },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([0, 2, 1]);
  })

  it('solves Timetable 3-3', () => {
    const input: Input = {
      innerPos: 4, innerCircles: 2, innerDir: 1,
      middlePos: 3, middleCircles: 3, middleDir: -1,
      outerPos: 3, outerCircles: 3, outerDir: 1,
      combo1: { inner: true, middle: true, outer: false },
      combo2: { inner: false, middle: true, outer: true },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([1, 0, 3]);
  })

  it('solves Timetable 3-4', () => {
    const input: Input = {
      innerPos: 4, innerCircles: 1, innerDir: -1,
      middlePos: 0, middleCircles: 3, middleDir: -1,
      outerPos: 0, outerCircles: 3, outerDir: 1,
      combo1: { inner: true, middle: true, outer: false },
      combo2: { inner: false, middle: true, outer: true },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect([
      [4, 0, 0],
      [0, 0, 4]
    ]).toContainEqual(calculateSolution(input));
  })

  it('solves Divination Commission 4', () => {
    const input: Input = {
      innerPos: 2, innerCircles: 1, innerDir: -1,
      middlePos: 0, middleCircles: 2, middleDir: -1,
      outerPos: 0, outerCircles: 2, outerDir: 1,
      combo1: { inner: true, middle: true, outer: false },
      combo2: { inner: false, middle: true, outer: true },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([1, 2, 1]);
  })

  it('solves Artisanship Commission 1', () => {
    const input: Input = {
      innerPos: 0, innerCircles: 3, innerDir: -1,
      middlePos: 1, middleCircles: 1, middleDir: 1,
      outerPos: 2, outerCircles: 2, outerDir: 1,
      combo1: { inner: true, middle: true, outer: false },
      combo2: { inner: false, middle: true, outer: true },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect(calculateSolution(input)).toStrictEqual([0, 5, 0]);
  })

  it('solves Artisanship Commission 2', () => {
    const input: Input = {
      innerPos: 0, innerCircles: 2, innerDir: -1,
      middlePos: 2, middleCircles: 1, middleDir: 1,
      outerPos: 4, outerCircles: 4, outerDir: 1,
      combo1: { inner: true, middle: true, outer: false },
      combo2: { inner: false, middle: true, outer: true },
      combo3: { inner: true, middle: false, outer: true },
    }
    expect([
      [1, 3, 2],
      [4, 0, 2]
    ]).toContainEqual(calculateSolution(input));
  })
});
