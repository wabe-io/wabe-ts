export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export const assertJSONValue = (input: any): JSONValue => {
  const type = typeof input;

  if (
    type === 'string' ||
    type === 'number' ||
    type === 'boolean' ||
    input === null
  ) {
    return input;
  }

  if (type === 'object') {
    if (Array.isArray(input)) {
      return input.map(assertJSONValue);
    } else {
      const keys = Object.keys(input);

      const obj = {} as any;

      for (const key of keys) {
        const val = input[key];
        if (val !== undefined) {
          obj[key] = assertJSONValue(input[key]);
        }
      }

      return obj;
    }
  }

  throw new Error(`Type ${type} not supported as JSONValue`);
};
