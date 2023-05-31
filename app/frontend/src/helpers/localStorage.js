export const saveObject = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export const readObject = (key, defaultValue) => {
  const object = localStorage.getItem(key);
  return JSON.parse(object) || defaultValue;
};
