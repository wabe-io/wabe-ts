import { describe, it } from 'mocha';
import * as chai from 'chai';
import {
  milliseconds,
  seconds,
  minutes,
  hours,
  days,
  toDate,
  addTimelapses,
  mulTimelapse,
  compareTimelapses,
  divTimelapse,
} from '../timelapse';

const expect = chai.expect;

describe('TimeLapse', () => {
  it('can create timelapses', () => {
    const day = days(1);
    const hour = hours(24);
    const minute = minutes(24 * 60);
    const second = seconds(24 * 60 * 60);
    const millisecond = milliseconds(24 * 60 * 60 * 1000);

    const msVal = 24 * 60 * 60 * 1000;

    expect(toDate(day)).to.eq(msVal);
    expect(toDate(hour)).to.eq(msVal);
    expect(toDate(minute)).to.eq(msVal);
    expect(toDate(second)).to.eq(msVal);
    expect(toDate(millisecond)).to.eq(msVal);
  });

  it('can add two timelapses', () => {
    const t1 = days(1);
    const t2 = days(1);

    expect(toDate(addTimelapses(t1, t2))).to.eq(24 * 1000 * 60 * 60 * 2);
  });

  it('can substract two timelapses', () => {
    const t1 = days(1);
    const t2 = days(-1);

    expect(toDate(addTimelapses(t1, t2))).to.eq(0);
  });

  it('can multiply a timelapse', () => {
    const t1 = days(1);

    expect(toDate(mulTimelapse(t1, 2))).to.eq(24 * 1000 * 60 * 60 * 2);
  });

  it('can divide timelapse', () => {
    const t1 = days(1);

    expect(toDate(divTimelapse(t1, 2))).to.eq(12 * 1000 * 60 * 60);
  });

  it('can compare two equal timelapses', () => {
    const t1 = days(1);
    const t2 = days(1);

    expect(compareTimelapses(t1, t2, (a, b) => a === b)).to.be.true;
  });

  it('can compare two equal timelapses', () => {
    const t1 = days(1);
    const t2 = hours(24);

    expect(compareTimelapses(t1, t2, (a, b) => a === b)).to.be.true;
  });
});
