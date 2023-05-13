import generateSolutions from '../generateSolutions';

describe('generateSolutions() unit tests', () => {
  it('returns 216 values', () => {
    expect([...generateSolutions()]).toHaveLength(216);
  });

  it('is in ascending order of sum', () => {
    const sums = [...generateSolutions()].map(arr => arr.reduce((acc, val) => acc + val, 0))
    expect(sums).toStrictEqual([...sums].sort((a, b) => a - b));
  });

  it('only returns values between 0 and 5', () => {
    for (const solution of generateSolutions()) {
      for (const element of solution) {
        expect(element).toBeGreaterThanOrEqual(0);
        expect(element).toBeLessThanOrEqual(5);
      }
    }
  });
});