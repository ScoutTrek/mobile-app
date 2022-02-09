import {useState} from 'react';
import moment from 'moment';

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function getMonthObject(datestring) {
  const absDate = new Date(datestring);
  const offset = absDate.getTimezoneOffset() * 60 * 1000;
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

const useFetchEvents = () => {
  const [events, setEvents] = useState({});
  const [prevRenderMonth, setPrevRenderMonth] = useState();
  const getItems = (data, calData) => {
    if (calData.month === prevRenderMonth) return;
    if (calData) {
      const eventsInMonth = data.events.filter(
        ({date}) =>
          new Date(+date).getMonth() + 1 === calData.month &&
          new Date(+date).getFullYear() === 2021
      );

      const items = getMonthObject(calData.dateString);
      if (!eventsInMonth.length) {
        setEvents(items);
        return;
      }
      eventsInMonth.forEach(({id, title, creator, date, type}) => {
        const name = creator.name.split(' ');
        if (type === 'TroopMeeting') {
          type = 'Meeting';
        }
        if (type === 'SpecialEvent') {
          type = 'Special Event';
        }
        if (type === 'SummerCamp') {
          type = 'Camp';
        }
        const strDate = moment(+date).format('YYYY-MM-DD');
        items[strDate].push({
          title,
          type,
          id,
          date,
          labels: [
            `${name[0]} ${name[1] ? name[1].substring(0, 1) : ''}`,
            type,
          ],
        });
        setPrevRenderMonth(calData.month);
        setEvents(items);
      });
    }
  };
  return [events, getItems];
};

export default useFetchEvents;
