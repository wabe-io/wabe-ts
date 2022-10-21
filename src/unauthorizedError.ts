import { HttpError } from './httpError';
import { HttpStatusCodes } from './httpStatusCodes';

export class UnauthorizedError extends HttpError {
  constructor(
    msg?: string,
    params?: { innerError?: unknown; publicMessage?: string },
  ) {
    super(HttpStatusCodes.Unauthorized, { ...params, msg });
  }
}
