/**
 * Checks whether we're running under Cypress
 * @returns true if running Cypress
 */
export const isRunningCypress = () => {
  // @ts-expect-error Check if running Cypress
  return typeof window !== 'undefined' && window.Cypress != null;
};
