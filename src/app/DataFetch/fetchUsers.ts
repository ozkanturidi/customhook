export const checkName = async (value: any) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data.some((user: any) => user.name === value);
};

export const checkMail = async (value: any) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data.some((user: any) => user.email === value);
};
