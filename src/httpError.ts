import { HttpStatusCodes } from './httpStatusCodes';
import { objectHasProp } from './objectHasProp';

export class HttpError extends Error {
  public readonly type = 'wabe-ts-http-error';

  public statusCode: HttpStatusCodes;
  public innerError: unknown;
  public publicMessage: string | undefined;

  public static isHttpError(val: unknown): val is HttpError {
    return objectHasProp(val, 'type') && val.type === 'wabe-ts-http-error';
  }

  constructor(
    statusCode: HttpStatusCodes,
    params?: { msg?: string; innerError?: unknown; publicMessage?: string },
  ) {
    super(params?.msg);
    this.innerError = params?.innerError;
    this.statusCode = statusCode;
    this.publicMessage = this.publicMessage;
  }

  public toString(): string {
    const data = {
      statusCode: this.statusCode,
      message: this.message,
      innerError: this.innerError != null ? String(this.innerError) : undefined,
      publicMessage: this.publicMessage,
    };

    return JSON.stringify(data);
  }
}
