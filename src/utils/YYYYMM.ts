export default (date: Date) => {
  const year = '' + date.getFullYear();
  let month = '' + (date.getMonth() + 1);

  if (month.length === 1) {
    month = '0' + month;
  }

  return year + '-' + month;
}
