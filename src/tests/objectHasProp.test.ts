import { describe, it } from 'mocha';
import * as chai from 'chai';
import { objectHasProp } from '../objectHasProp';

const expect = chai.expect;

describe('objectHasProp', () => {
  it('returns false on string type', () => {
    expect(objectHasProp('foo', 'dummy')).to.be.false;
  });

  it('returns false on string type w emtpy prop name', () => {
    expect(objectHasProp('foo', '')).to.be.false;
  });

  it('returns false on number type', () => {
    expect(objectHasProp(123, 'dummy')).to.be.false;
  });

  it('returns false on boolean type', () => {
    expect(objectHasProp(true, 'dummy')).to.be.false;
  });

  it('returns true on simple object', () => {
    expect(objectHasProp({ dummy: true }, 'dummy')).to.be.true;
  });

  it('returns false on simple object with empty prop name', () => {
    expect(objectHasProp({ dummy: true }, '')).to.be.false;
  });
});
