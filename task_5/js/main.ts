export interface MajorCredits {
  credits: number;
  readonly __brand: 'MajorCredits';
}

export interface MinorCredits {
  credits: number;
  readonly __brand: 'MinorCredits';
}

export function sumMajorCredits(
  subject1: MajorCredits,
  subject2: MajorCredits
): MajorCredits {
  return {
    credits: subject1.credits + subject2.credits,
    __brand: 'MajorCredits',
  };
}

export function sumMinorCredits(
  subject1: MinorCredits,
  subject2: MinorCredits
): MinorCredits {
  return {
    credits: subject1.credits + subject2.credits,
    __brand: 'MinorCredits',
  };
}

// Helpers to create brand values
export const makeMajor = (credits: number): MajorCredits => ({
  credits,
  __brand: 'MajorCredits',
});

export const makeMinor = (credits: number): MinorCredits => ({
  credits,
  __brand: 'MinorCredits',
});

// Tests
const m1 = makeMajor(3);
const m2 = makeMajor(4);
const totalMajor = sumMajorCredits(m1, m2);

const n1 = makeMinor(2);
const n2 = makeMinor(1);
const totalMinor = sumMinorCredits(n1, n2);

console.log({ totalMajor, totalMinor });