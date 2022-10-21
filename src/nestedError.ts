import { objectHasProp } from './objectHasProp';

export class NestedError extends Error {
  public readonly type = 'wabe-ts-nested-error';

  public innerError: unknown;
  public publicMessage: string | undefined;

  public static isNestedError(val: unknown): val is NestedError {
    return objectHasProp(val, 'type') && val.type === 'wabe-ts-nested-error';
  }

  constructor(params?: {
    msg?: string;
    innerError?: unknown;
    publicMessage?: string;
  }) {
    super(params?.msg);
    this.innerError = params?.innerError;
    this.publicMessage = this.publicMessage;
  }

  public toString(): string {
    const data = {
      message: this.message,
      innerError: this.innerError != null ? String(this.innerError) : undefined,
      publicMessage: this.publicMessage,
    };

    return JSON.stringify(data);
  }
}
