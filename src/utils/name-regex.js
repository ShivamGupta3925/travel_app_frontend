export const validateName = (name) => {
  const regex = /^[a-z\s]+$/i;
  return regex.test(name);
};
