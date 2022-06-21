export function toDateInputValue(date) {
  return new Date(date).toJSON().substring(0, 10);
}
