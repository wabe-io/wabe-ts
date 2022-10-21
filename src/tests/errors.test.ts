import { describe, it } from 'mocha';
import * as chai from 'chai';
import { HttpError } from '../httpError';
import { HttpStatusCodes } from '../httpStatusCodes';
import { NestedError } from '../nestedError';

const expect = chai.expect;

describe('HTTPError', () => {
  it('can nest an HTTPError', () => {
    expect(
      (
        new HttpError(HttpStatusCodes.Accepted, {
          innerError: new HttpError(HttpStatusCodes.Ok),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).innerError as any as HttpError
      ).statusCode,
    ).to.eq(HttpStatusCodes.Ok);
  });

  it('can identify an HTTPError', () => {
    expect(HttpError.isHttpError(new HttpError(HttpStatusCodes.Accepted))).to.be
      .true;
    expect(HttpError.isHttpError(new Error())).to.be.false;
  });
});

describe('NestedError', () => {
  it('can nest a NestedError', () => {
    expect(
      (
        new NestedError({
          innerError: new NestedError({ msg: 'foo' }),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).innerError as any as NestedError
      ).message,
    ).to.eq('foo');
  });

  it('can identify a NestedError', () => {
    expect(NestedError.isNestedError(new NestedError())).to.be.true;
    expect(NestedError.isNestedError(new Error())).to.be.false;
  });
});
