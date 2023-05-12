
export type Position = 0 | 60 | 120 | 180 | 240 | 300;

export type Circles = 1 | 2 | 3 | 4;

export type Direction = 1 | -1;

export type Combination = {inner: boolean, middle: boolean, outer: boolean};

export type CombinationList = [Combination, Combination, Combination];

export type Input = {
  innerPos: Position;
  middlePos: Position;
  outerPos: Position;

  innerCircles: Circles;
  middleCircles: Circles;
  outerCircles: Circles;

  innerDir: Direction;
  middleDir: Direction;
  outerDir: Direction;

  combo1: Combination;
  combo2: Combination;
  combo3: Combination;
}

export type Solution = [number, number, number];