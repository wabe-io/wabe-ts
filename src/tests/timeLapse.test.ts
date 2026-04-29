import { describe, it } from 'mocha';
import * as chai from 'chai';
import { Day, Hour, Millisecond, Minute, Second } from '../timelapse';
import {
  dayToMs,
  hourToMs,
  minuteToMs,
  secondToMs,
} from '../timelapseOperations';

const expect = chai.expect;

describe('TimeLapse', () => {
  it('can create timelapses', () => {
    const day = Day(1);
    console.log(`DAY ${day}`);
    const hour = Hour(24);
    const minute = Minute(24 * 60);
    const second = Second(24 * 60 * 60);
    const millisecond = Millisecond(24 * 60 * 60 * 1000);

    const msVal = 24 * 60 * 60 * 1000;

    expect(dayToMs(day)).to.eq(msVal);
    expect(hourToMs(hour)).to.eq(msVal);
    expect(minuteToMs(minute)).to.eq(msVal);
    expect(secondToMs(second)).to.eq(msVal);
    expect(millisecond).to.eq(msVal);
  });

  it('can add two timelapses', () => {
    const t1 = Day(1);
    const t2 = Day(1);

    expect(t1 + t2).to.eq(2);
  });

  it('can compare two equal timelapses', () => {
    const t1 = Day(1);
    const t2 = Hour(24);

    expect(dayToMs(t1) === hourToMs(t2)).to.be.true;
  });
});
