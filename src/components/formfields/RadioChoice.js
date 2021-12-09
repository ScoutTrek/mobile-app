import React from 'react';
import {Text} from 'react-native';
// import {Text} from '@ScoutDesign';
import RadioForm from 'react-native-simple-radio-button';
import Colors from '../../../constants/Colors';

const RadioChoice = ({text, a, b, onPress}) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}>
      <Text preset="lg" color="brand">
        {text}
      </Text>

      <RadioForm
        radio_props={[
          {label: <Text>{a.label}</Text>, value: a.value},
          {label: <Text>{b.label}</Text>, value: b.value},
        ]}
        buttonSize={15}
        buttonColor={Colors.green}
        selectedButtonColor={Colors.green}
        initial={-1}
        animation
        style={{paddingTop: 18}}
        onPress={onPress}
      />
    </View>
  );
};

export default RadioChoice;
