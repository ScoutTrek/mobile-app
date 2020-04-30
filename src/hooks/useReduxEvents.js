import React from 'react';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/react-hooks';

export const GET_EVENTS = gql`
  query ALL_EVENTS {
    events {
      id
      type
      title
      description
      datetime
      location {
        lat
        lng
      }
      creator {
        id
        name
      }
    }
  }
`;

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

const useReduxEvents = () => {
  const {data, loading, error} = useQuery(GET_EVENTS);

  const getItems = calData => {
    const items = getMonthObject(calData.dateString);
    data.events.forEach(({id, creator, datetime, type}) => {
      let strDate = new Date(parseInt(datetime)).toISOString();
      strDate = strDate.split('T')[0];
      if (
        calData.month === new Date(parseInt(datetime)).getMonth() + 1 &&
        new Date(parseInt(datetime)).getFullYear() === 2020
      ) {
        items[strDate].push({
          type,
          name: creator.name,
          id,
          datetime,
          labels: [creator.name, type],
        });
      }
    });

    return items;
  };

  return {getItems, loading, error};
};

export default useReduxEvents;
