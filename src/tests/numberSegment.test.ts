import { describe, it } from 'mocha';
import * as chai from 'chai';
import {
  NumberSegment,
  getNumberSegmentLength,
  mergeOverlappingNumberSegments,
  verifyNumberSegment,
} from '../numberSegment';

const expect = chai.expect;

describe('mergeOverlappingNumberSegments', () => {
  it('does nothing when an empty set is provided', () => {
    const res = mergeOverlappingNumberSegments([]);
    expect(res).to.deep.equals([]);
  });

  it('does nothing with non-mixed segments', () => {
    const segments: NumberSegment[] = [
      { start: 0, end: 100 },
      { start: 110, end: 200 },
      { start: 310, end: 300 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals(segments);
  });

  it('can merge an included segment', () => {
    const segments: NumberSegment[] = [
      { start: 0, end: 100 },
      { start: 10, end: 20 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals([{ start: 0, end: 100 }]);
  });

  it('can merge two included segments', () => {
    const segments: NumberSegment[] = [
      { start: 0, end: 100 },
      { start: 10, end: 20 },
      { start: 50, end: 70 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals([{ start: 0, end: 100 }]);
  });

  it('can merge two included segments in inverse order', () => {
    const segments: NumberSegment[] = [
      { start: 50, end: 70 },
      { start: 10, end: 20 },
      { start: 0, end: 100 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals([{ start: 0, end: 100 }]);
  });

  it('can merge two equal segments', () => {
    const segments: NumberSegment[] = [
      { start: 0, end: 100 },
      { start: 0, end: 100 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals([{ start: 0, end: 100 }]);
  });

  it('can merge a partilly included segment', () => {
    const segments: NumberSegment[] = [
      { start: 0, end: 100 },
      { start: 50, end: 200 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals([{ start: 0, end: 200 }]);
  });

  it('can merge adjacent segments', () => {
    const segments: NumberSegment[] = [
      { start: 0, end: 100 },
      { start: 101, end: 200 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals([{ start: 0, end: 200 }]);
  });

  it('can merge adjacent segments and an included segment', () => {
    const segments: NumberSegment[] = [
      { start: 0, end: 100 },
      { start: 101, end: 200 },
      { start: 80, end: 110 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals([{ start: 0, end: 200 }]);
  });

  it('can merge adjacent segments of length 1', () => {
    const segments: NumberSegment[] = [
      { start: 2, end: 2 },
      { start: 0, end: 0 },
      { start: 1, end: 1 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals([{ start: 0, end: 2 }]);
  });

  it('can merge two exact segments', () => {
    const segments: NumberSegment[] = [
      { start: 0, end: 100 },
      { start: 0, end: 100 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals([{ start: 0, end: 100 }]);
  });

  it('can merge two exact segments with negative values', () => {
    const segments: NumberSegment[] = [
      { start: -100, end: 100 },
      { start: 0, end: 100 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals([{ start: -100, end: 100 }]);
  });

  it('can merge anything into infinity+-', () => {
    const segments: NumberSegment[] = [
      { start: 0, end: 0 },
      { start: -Infinity, end: +Infinity },
      { start: 1, end: 1 },
    ];
    const res = mergeOverlappingNumberSegments(segments);
    expect(res).to.deep.equals([{ start: -Infinity, end: +Infinity }]);
  });
});

describe('verifyNumberSegment', () => {
  it('passes when a single element is provided', () => {
    expect(verifyNumberSegment({ start: 0, end: 1 })).to.be.true;
  });

  it('passes a single element of length 1', () => {
    expect(verifyNumberSegment({ start: 0, end: 0 })).to.be.true;
  });

  it('rejects a segment having end before start', () => {
    expect(verifyNumberSegment({ start: 1, end: 0 })).to.be.false;
  });

  it('rejects NaNs', () => {
    expect(verifyNumberSegment({ start: NaN, end: NaN })).to.be.false;
  });
});

describe('getNumberSegmentLength', () => {
  it('Gets a 1 length', () => {
    expect(getNumberSegmentLength({ start: 0, end: 0 })).to.eq(1);
  });

  it('Gets a non-1 length', () => {
    expect(getNumberSegmentLength({ start: 0, end: 100 })).to.eq(101);
  });
});
