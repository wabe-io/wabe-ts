import { describe, it } from 'mocha';
import * as chai from 'chai';
import {
  ifNotNull,
  ifNotNullish,
  ifNotUndefined,
  mapIfNotNull,
  mapIfNotNullish,
  mapIfNotUndefined,
} from '../mapIf';

const expect = chai.expect;

describe('mapIfNotNull', () => {
  it('maps something', () => {
    const mapped = mapIfNotNull((x) => x * 2, 42);
    expect(mapped).to.eq(84);
  });

  it('does not map null', () => {
    const mapped = mapIfNotNull((x: number) => x * 2, null);
    expect(mapped).to.be.null;
  });
});

describe('ifNotNull', () => {
  it('maps something', () => {
    const mapped = ifNotNull((x: number) => x * 2)(42);
    expect(mapped).to.eq(84);
  });

  it('does not map null', () => {
    const mapped = ifNotNull((x: number) => x * 2)(null);
    expect(mapped).to.be.null;
  });
});

describe('mapIfNotUndefined', () => {
  it('maps something', () => {
    const mapped = mapIfNotUndefined((x) => x * 2, 42);
    expect(mapped).to.eq(84);
  });

  it('does not map undefined', () => {
    const mapped = mapIfNotUndefined((x: number) => x * 2, undefined);
    expect(mapped).to.be.undefined;
  });
});

describe('ifNotUndefined', () => {
  it('maps something', () => {
    const mapped = ifNotUndefined((x: number) => x * 2)(42);
    expect(mapped).to.eq(84);
  });

  it('does not map undefined', () => {
    const mapped = ifNotUndefined((x: number) => x * 2)(undefined);
    expect(mapped).to.be.undefined;
  });
});

describe('mapIfNotNullish', () => {
  it('maps something', () => {
    const mapped = mapIfNotNullish((x) => x * 2, 42);
    expect(mapped).to.eq(84);
  });

  it('does not map undefined', () => {
    const mapped = mapIfNotNullish((x: number) => x * 2, undefined);
    expect(mapped).to.be.undefined;
  });

  it('does not map null', () => {
    const mapped = mapIfNotNullish((x: number) => x * 2, null);
    expect(mapped).to.be.null;
  });
});

describe('ifNotNullish', () => {
  it('maps something', () => {
    const mapped = ifNotNullish((x: number) => x * 2)(42);
    expect(mapped).to.eq(84);
  });

  it('does not map undefined', () => {
    const mapped = ifNotNullish((x: number) => x * 2)(undefined);
    expect(mapped).to.be.undefined;
  });

  it('does not map null', () => {
    const mapped = ifNotNullish((x: number) => x * 2)(null);
    expect(mapped).to.be.null;
  });
});
