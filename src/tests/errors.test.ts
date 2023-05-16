import { describe, it } from 'mocha';
import * as chai from 'chai';
import { HttpError } from '../httpError';
import { HttpStatusCodes } from '../httpStatusCodes';
import { NestedError } from '../nestedError';
import { UnauthorizedError } from '../unauthorizedError';

const expect = chai.expect;

describe('UnauthorizedError', () => {
  it('serializes properly the simplest error', () => {
    const errorString = String(new UnauthorizedError());
    const hydratedError = JSON.parse(errorString);

    const mockError = {
      statusCode: HttpStatusCodes.Unauthorized,
      message: '',
    };

    expect(hydratedError).to.eql(mockError);
  });
});

describe('HTTPError', () => {
  it('serializes properly the simplest error', () => {
    const statusCode = HttpStatusCodes.Accepted;
    const errorString = String(new HttpError(statusCode));
    const hydratedError = JSON.parse(errorString);

    const mockError = {
      statusCode,
      message: '',
    };

    expect(hydratedError).to.eql(mockError);
  });

  it('serializes properly a complex error', () => {
    const statusCode = HttpStatusCodes.AlreadyReported;
    const message = 'xadshhgdjsnmnndc';
    const publicMessage = 'ds99834343';
    const innerError = new Error('InnerErrorText');
    const innerErrorText = String(innerError);
    const errorString = String(
      new HttpError(statusCode, { msg: message, publicMessage, innerError }),
    );
    console.log(errorString);
    const hydratedError = JSON.parse(errorString);

    const mockError = {
      statusCode,
      message,
      innerError: innerErrorText,
      publicMessage,
    };

    expect(hydratedError).to.eql(mockError);
  });

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
