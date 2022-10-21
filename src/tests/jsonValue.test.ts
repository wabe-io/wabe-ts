import { describe, it } from 'mocha';
import * as chai from 'chai';
import { assertJSONValue, isJSONObject } from '../jsonValue';

const expect = chai.expect;

describe('isJSONObject', () => {
  it('can spot a number', () => {
    expect(isJSONObject(1)).to.be.false;
  });

  it('can spot a string', () => {
    expect(isJSONObject('foo')).to.be.false;
  });

  it('can spot a boolean', () => {
    expect(isJSONObject(true)).to.be.false;
  });

  it('can spot an array', () => {
    expect(isJSONObject(['foo', 'bar'])).to.be.false;
  });

  it('can spot a null', () => {
    expect(isJSONObject(null)).to.be.false;
  });

  it('can spot an undefined', () => {
    expect(isJSONObject(undefined)).to.be.false;
  });

  it('can spot a function', () => {
    expect(isJSONObject(() => undefined)).to.be.false;
  });

  it('can identify an object', () => {
    expect(isJSONObject({})).to.be.true;
  });

  it('can identify a complex object', () => {
    expect(isJSONObject({ foo: 1, bar: 2 })).to.be.true;
  });

  it('can identify a nested object', () => {
    expect(isJSONObject({ foo: 1, bar: 2, baz: [] })).to.be.true;
  });
});

describe('assertJsonValue', () => {
  it('asserts a string as valid', () => {
    const val = assertJSONValue('foo');
    expect(val).to.eq('foo');
  });

  it('asserts a number as valid', () => {
    const val = assertJSONValue(123);
    expect(val).to.eq(123);
  });

  it('asserts a boolean as valid', () => {
    const val = assertJSONValue(true);
    expect(val).to.eq(true);
  });

  it('asserts a null as valid', () => {
    const val = assertJSONValue(null);
    expect(val).to.be.null;
  });

  it('asserts an array of strings as valid', () => {
    const val = assertJSONValue(['foo', 'boo', 'bah']);
    expect(val).deep.eq(['foo', 'boo', 'bah']);
  });

  it('asserts an mixed object as valid', () => {
    const val = assertJSONValue({ foo: 1, boo: 'bar' });
    expect(val).deep.eq({ foo: 1, boo: 'bar' });
  });

  it('asserts deeply mixed object as valid', () => {
    const val = assertJSONValue({ foo: 1, boo: 'bar', baz: { a: 1, b: null } });
    expect(val).deep.eq({ foo: 1, boo: 'bar', baz: { a: 1, b: null } });
  });

  it('fails on symbol', () => {
    expect(() => {
      assertJSONValue(Symbol());
    }).to.throw();
  });

  it('fails on function', () => {
    expect(() => {
      assertJSONValue(() => undefined);
    }).to.throw();
  });

  it('fails on undefined', () => {
    expect(() => {
      assertJSONValue(undefined);
    }).to.throw();
  });

  it('fails on undefined as array member', () => {
    expect(() => {
      assertJSONValue(['foo', undefined]);
    }).to.throw();
  });

  it('strips away undefined values', () => {
    const stripped = assertJSONValue({ foo: undefined, bar: 'baz' });
    expect(stripped).deep.eq({ bar: 'baz' });
  });
});
