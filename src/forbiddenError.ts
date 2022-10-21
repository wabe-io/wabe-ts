import { HttpError } from './httpError';
import { HttpStatusCodes } from './httpStatusCodes';

export class ForbiddenError extends HttpError {
  constructor(
    msg?: string,
    params?: { innerError?: unknown; publicMessage?: string },
  ) {
    super(HttpStatusCodes.Forbidden, { ...params, msg });
  }
}
