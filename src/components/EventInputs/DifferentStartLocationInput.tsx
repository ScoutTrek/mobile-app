import RadioChoice from '../formfields/RadioChoice';

type Props = {
  onPress: () => void;
};

const DifferentStartLocationInput = ({onPress}: Props) => {
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
