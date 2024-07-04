/**
 * checkName - Check if the name is unique
 * @param {string} value - Name to check
 * @returns {boolean} - Result of the check
 */
export const checkName = async (value: string): Promise<boolean> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data.some((user: { name: string }) => user.name === value);
};

/**
 * checkMail - Check if the email is unique
 * @param {string} value - Email to check
 * @returns {boolean} - Result of the check
 */
export const checkMail = async (value: string): Promise<boolean> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data.some((user: { email: string }) => user.email === value);
};
