import { HttpError } from './httpError';
import { HttpStatusCodes } from './httpStatusCodes';

export class NotFoundError extends HttpError {
  constructor(
    msg?: string,
    params?: { innerError?: unknown; publicMessage?: string },
  ) {
    super(HttpStatusCodes.NotFound, { ...params, msg });
  }
}
