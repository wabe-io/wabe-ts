import { objectHasProp } from './objectHasProp';

export type JSONObject = { [x: string]: JSONValue };

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | Array<JSONValue>;

export const assertJSONValue = (input: unknown): JSONValue => {
  if (
    typeof input === 'string' ||
    typeof input === 'number' ||
    typeof input === 'boolean' ||
    input === null
  ) {
    return input;
  }

  if (typeof input === 'object') {
    if (Array.isArray(input)) {
      return input.map(assertJSONValue);
    } else {
      const keys = Object.keys(input);

      const obj = {} as Record<string, JSONValue>;

      for (const key of keys) {
        if (objectHasProp(input, key)) {
          const val = input[key];
          if (val !== undefined) {
            obj[key] = assertJSONValue(input[key]);
          }
        } else {
          throw new Error('Could not serialize');
        }
      }
      return obj;
    }
  }

  throw new Error(`Type ${typeof input} not supported as JSONValue`);
};

export const isJSONObject = (input: unknown): input is JSONObject => {
  return typeof input === 'object' && input != null && !Array.isArray(input);
};
