// Return date in `month/day/yaer` (e.g. 12/23/2019)

export default function getCurrentDate(): string {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${month}/${day}/${year}`;
  return currentDate;
}
