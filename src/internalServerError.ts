import { HttpError } from './httpError';
import { HttpStatusCodes } from './httpStatusCodes';

export class InternalServerError extends HttpError {
  constructor(
    msg?: string,
    params?: { innerError?: unknown; publicMessage?: string },
  ) {
    super(HttpStatusCodes.InternalServerError, { ...params, msg });
  }
}
