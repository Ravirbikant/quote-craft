export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  return `${day} ${date.toLocaleString("en-GB", {
    month: "long",
  })}, ${date.getFullYear()} | ${date.toLocaleTimeString()}`;
};
