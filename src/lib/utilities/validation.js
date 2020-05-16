/**
 * checks if a value is undefined
 * @param {any} value the value to check
 * @return {boolean} true if value is undefined, false otherwise
 */
export const isUndefined = (value) => value === undefined;

/**
 * checks if a value is not undefined
 * @param {any} value the value to check
 * @return {boolean} false if value is undefined, true otherwise
 */
export const isNotUndefined = (value) => !isUndefined(value);

/**
 * checks if a value is null
 * @param {any} value the value to check
 * @return {boolean} true if value is null, false otherwise
 */
export const isNull = (value) => value === null;

/**
 * checks if a value is not null
 * @param {any} value the value to check
 * @return {boolean} false if value is null, true otherwise
 */
export const isNotNull = (value) => !isNull(value);

/**
 * checks if a value is neither undefined nor null
 * @param {any} value the value to check
 * @return {boolean} true if value is neither undefined nor null, false otherwise
 */
export const exists = (value) => isNotUndefined(value) && isNotNull(value);

/**
 * checks if a value is either undefined or null
 * @param {any} value the value to check
 * @return {boolean} true if value is either undefined or null, false otherwise
 */
export const notExists = (value) => !exists(value);
