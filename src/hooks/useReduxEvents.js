import React from 'react';

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function getMonthObject(datestring) {
  const absDate = new Date(datestring);
  const offset = -1 * absDate.getTimezoneOffset() * 60 * 1000;
  const date = new Date(absDate.getTime() - offset);
  let monthObject = {};
  for (let i = 1; i <= daysInMonth(date.getMonth(), date.getFullYear()); i++) {
    const string = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(
      -2
    )}-${('0' + i).slice(-2)}`;
    monthObject[string] = [];
  }
  return monthObject;
}

const useReduxEvents = (data) => {
  if (data) {
    return (calData) => {
      const items = getMonthObject(calData.dateString);
      data.events.forEach(({id, title, creator, datetime, type}) => {
        let strDate = new Date(parseInt(datetime)).toISOString();
        strDate = strDate.split('T')[0];
        const name = creator.name.split(' ');
        if (type === 'ScoutMeeting') {
          type = 'Meeting';
        }
        if (
          calData.month === new Date(parseInt(datetime)).getMonth() + 1 &&
          new Date(parseInt(datetime)).getFullYear() === 2020
        ) {
          items[strDate].push({
            title,
            type,
            name: creator.name,
            id,
            datetime,
            labels: [
              `${name[0]} ${name[1] ? name[1].substring(0, 1) : ''}`,
              type,
            ],
          });
        }
      });
      return items;
    };
  }
};

export default useReduxEvents;
