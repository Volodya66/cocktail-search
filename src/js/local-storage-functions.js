export const getItemFromLocalStorage = key => {
  return JSON.parse(localStorage.getItem(key));
};

export const setItemToLocalStorage = (key, data) => {
  const dataForLocalStorage = JSON.stringify(data);
  localStorage.setItem(key, dataForLocalStorage);
};
