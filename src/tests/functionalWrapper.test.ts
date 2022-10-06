import { describe, it } from 'mocha';
import * as chai from 'chai';
import { wrap } from '../functionalWrapper';

const expect = chai.expect;

describe('functionalWrapper', () => {
  it('returns the wrapped value', () => {
    expect(wrap(10).value()).to.eq(10);
  });

  it('returns a mapped value', () => {
    expect(
      wrap(10)
        .map((x) => x * 2)
        .value(),
    ).to.eq(20);
  });

  it('throws when no value is present', () => {
    expect(() => {
      wrap(undefined).value();
    }).to.throw();
  });

  it('returns default when no value is present', () => {
    expect(wrap(undefined).valueOrDefault(11)).to.eq(11);
  });

  it('isSomething when value is present', () => {
    expect(wrap(1).isSomething()).to.be.true;
  });

  it('not isSomething when no value is present', () => {
    expect(wrap(undefined).isSomething()).to.be.false;
  });

  it('valueOrUndefined returns undefined', () => {
    expect(wrap(undefined).valueOrUndefined()).to.be.undefined;
  });

  it('valueOrUndefined returns value', () => {
    expect(wrap(123).valueOrUndefined()).to.eq(123);
  });
});
