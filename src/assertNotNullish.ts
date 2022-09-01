/**
 * Asserts whether val is nullish. The function will throw an Error with {text} message
 * if val is null or undefined. It will also display an error box.
 * @param val The val
 * @param text An optional text to include as part of the error and log.
 */
export function assertNotNullish<T>(
  val: T | null | undefined,
  text?: string,
): asserts val is T {
  if (val != null) return;

  const resolvedText = text ?? 'Assertion failed';
  console.trace(resolvedText);
  console.error(resolvedText);
  throw new Error(resolvedText);
}
