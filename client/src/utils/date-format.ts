export default function formatDate(dateTimeString: string) {
  const months = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ];

  const dateTime = new Date(dateTimeString);
  const day = dateTime.getDate();
  const month = months[dateTime.getMonth()];
  const year = dateTime.getFullYear();

  return `${day} ${month} ${year}`;
}
