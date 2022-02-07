import {View} from 'react-native';
import {Text} from 'ScoutDesign/library';
import RadioForm from 'react-native-simple-radio-button';

const RadioChoice = ({text, a, b, onPress}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        marginHorizontal: 4,
      }}>
      <Text color="darkGrey">{text}</Text>

      <RadioForm
        radio_props={[
          {
            label: <Text color="darkGrey">{a.label}</Text>,
            value: a.value,
          },
          {
            label: <Text color="darkGrey">{b.label}</Text>,
            value: b.value,
          },
        ]}
        buttonSize={15}
        buttonColor="#34A86C"
        selectedButtonColor="#34A86C"
        initial={-1}
        animation
        style={{paddingTop: 18}}
        onPress={onPress}
      />
    </View>
  );
};

export default RadioChoice;
