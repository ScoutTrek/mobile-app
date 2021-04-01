import React from 'react';
import RadioChoice from '../formfields/RadioChoice';
import {eventData} from '../../../App';

const OptionsInput = ({questionText, option1, option2, id}) => {
  return (
    <RadioChoice
      text={questionText}
      a={{label: option1, value: option1}}
      b={{label: option2, value: option2}}
      onPress={(choice) => {
        eventData({
          ...eventData(),
          [id]: choice,
        });
      }}
    />
  );
};

export default {
  InitialButton: OptionsInput,
};
