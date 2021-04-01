import React from 'react';
import RadioChoice from '../formfields/RadioChoice';

const DifferentStartLocationInput = ({onPress}) => {
  return (
    <RadioChoice
      text="Do you want every to meet"
      a={{label: 'at the trail?', value: 'trail'}}
      b={{label: 'at a different meet point?', value: 'meet point'}}
      onPress={onPress}
    />
  );
};

export default DifferentStartLocationInput;
