export default (date: Date) => {
  const year = `${date.getFullYear()}`;
  let month = `${date.getMonth() + 1}`;
  let day = `${date.getDate()}`;

  if (day.length === 1) {
    day = `0${day}`;
  }

  if (month.length === 1) {
    month = `0${month}`;
  }

  return `${year}-${month}-${day}`;
};
