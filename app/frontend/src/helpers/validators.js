export const isValidEmail = (email) => {
  const emailRegex = /^[\w-_.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^.{7,}$/g;
  return passwordRegex.test(password);
};

export const isValidUsername = (password) => {
  const passwordRegex = /^.{2,}$/g;
  return passwordRegex.test(password);
};

export default {
  isValidEmail,
  isValidPassword,
  isValidUsername,
};
