export const debounce = (func, delay) => {
  let timeoutId: string | number | NodeJS.Timeout;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
