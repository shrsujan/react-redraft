/**
 * Get value from storage for given key
 *
 * @param {string} key
 * @returns {string}
 */
export function get(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

/**
 * Set value to given key in storage
 *
 * @param {string} key
 * @param {any} value
 */
export function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Remove item from storage for given key
 *
 * @param {string} key
 */
export function remove(key) {
  localStorage.removeItem(key);
}

/**
 * Clear storage
 */
export function clear() {
  localStorage.clear();
}
