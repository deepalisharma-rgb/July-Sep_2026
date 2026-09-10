/**
 * Generic test data / utility helpers shared across page objects and tests.
 */

/**
 * Generates a random integer between 0 and 999999.
 * Useful for creating unique test data (e.g. analysis names) to avoid
 * collisions between parallel test runs.
 * @returns {number}
 */
export function randomNumber() {
  return Math.floor(Math.random() * 1000000);
}