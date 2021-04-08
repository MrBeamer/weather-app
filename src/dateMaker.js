const dateMaker = () => {
  // Full date of current day - Thu Dec 31 2020 12:27:40 GMT+0100 - wrong format
  const fullDate = new Date();

  // Spefication of how to display the weekday or month (long, short, numeric)
  // returns an object
  const date = { day: "numeric" };
  const weekday = { weekday: "long" };
  const month = { month: "long" };
  const year = { year: "numeric" };

  // new Intl.DateTimeFormat([locales[, options]]) - makes it possible to define properties and methods for all objects.
  // Passing in fullDate as format - date, weekday, month as options
  const currentDate = new Intl.DateTimeFormat("en-US", date).format(fullDate);
  const currentDay = new Intl.DateTimeFormat("en-US", weekday).format(fullDate);
  const currentMonth = new Intl.DateTimeFormat("en-US", month).format(fullDate);
  const currentYear = new Intl.DateTimeFormat("en-US", year).format(fullDate);

  return `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;
};

export default dateMaker;
