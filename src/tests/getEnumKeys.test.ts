import { describe, it } from 'mocha';
import * as chai from 'chai';
import { getEnumKeys, getEnumValues } from '../getEnum';

const expect = chai.expect;

describe('getEnumKeys', () => {
  it('returns an empty aray', () => {
    enum Foo {}
    expect(getEnumKeys(Foo)).to.eql([]);
  });

  it('returns some string names backed by integers', () => {
    enum Foo {
      bar,
      baz,
    }
    expect(getEnumKeys(Foo)).to.eql(['bar', 'baz']);
  });

  it('returns some string names backed by explicit integers', () => {
    enum Foo {
      bar = 55,
      baz,
    }
    expect(getEnumKeys(Foo)).to.eql(['bar', 'baz']);
  });

  it('returns some string names backed by strings', () => {
    enum Foo {
      bar = 'barr',
      baz = 'bazz',
    }
    expect(getEnumKeys(Foo)).to.eql(['bar', 'baz']);
  });
});

describe('getEnumValues', () => {
  it('returns an empty aray', () => {
    enum Foo {}
    expect(getEnumValues(Foo)).to.eql([]);
  });

  it('returns some number values', () => {
    enum Foo {
      bar,
      baz,
    }
    expect(getEnumValues(Foo)).to.eql([0, 1]);
  });

  it('returns some number valyes backed by explicit integers', () => {
    enum Foo {
      bar = 55,
      baz,
    }
    expect(getEnumValues(Foo)).to.eql([55, 56]);
  });

  it('returns some string names backed by strings', () => {
    enum Foo {
      bar = 'barr',
      baz = 'bazz',
    }
    expect(getEnumValues(Foo)).to.eql(['barr', 'bazz']);
  });
});
