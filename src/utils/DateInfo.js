const DateInfo = () => {
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const todayDate = `${months[date.getMonth()]} ${date.getDate()}`;
  return todayDate;
};

export default DateInfo;
