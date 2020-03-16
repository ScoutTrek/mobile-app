import {useDispatch, useSelector} from 'react-redux';

const ITEMS_LOADED = 'CalendarState/ITEMS_LOADED';

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

function itemsLoaded(items) {
  return {
    type: ITEMS_LOADED,
    items,
  };
}

function getDatesInMonth(startDate) {
  if (!startDate) return;
  let date = new Date(startDate);
  const days = [];
  while (date.getMonth() === 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const useReduxEvents = dates => {
  const dispatch = useDispatch();

  return month => {
    const items = {};

    dates.forEach(({id, creator, date, name, type}) => {
      let strTime = new Date(date.seconds * 1000).toISOString();
      strTime = strTime.split('T')[0];
      items[strTime] = [];
      items[strTime].push({
        name,
        id,
        time: `${randomNumber(0, 24)}:${randomNumber(9, 60)}`,
        labels: [creator, type],
      });
    });

    const remainingDaysInMonth = getDatesInMonth(month.timestamp);
    remainingDaysInMonth.map(date => {
      let strTime = date.toISOString().split('T')[0];
      if (!items[strTime]) {
        items[strTime] = [];
      }
    });

    const newItems = {};

    Object.keys(items).forEach(key => {
      newItems[key] = items[key];
    });

    dispatch(itemsLoaded(newItems));
  };
};

export default useReduxEvents;
