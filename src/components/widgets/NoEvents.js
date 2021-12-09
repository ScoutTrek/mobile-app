import React from 'react';
import {View, Text} from 'react-native';
import GradientButton from '../buttons/GradientButton';
import FormHeading from '../Headings/FormHeading';

const NoEvents = ({navigation}) => {
  return (
    <View style={{margin: 30}}>
      <FormHeading title="You have no upcoming events." />
      <GradientButton
        title="Create one"
        onPress={() => navigation.navigate('New Event')}
      />
    </View>
  );
};

export default NoEvents;
