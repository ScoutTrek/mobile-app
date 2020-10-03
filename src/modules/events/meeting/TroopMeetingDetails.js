import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Keyboard} from 'react-native';

import RadioForm from 'react-native-simple-radio-button';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import FormHeading from '../../../components/Headings/FormHeading';
import Slider from '../../../components/formfields/Slider';
import NextButton from '../../../components/buttons/NextButton';
import {eventData} from '../event_components/ChooseName';

const TroopMeetingDetails = ({navigation, route}) => {
  const [numWeeksRepeat, setNumWeeksRepeat] = useState(5);

  const [day, setDay] = useState('Monday');

  const nextForm = () => {
    const prevData = eventData();
    eventData({
      ...prevData,
      day,
      numWeeksRepeat,
    });
    Keyboard.dismiss();
    navigation.navigate(
      route.params.edit === 'create'
        ? 'ConfirmEventDetails'
        : route.params.edit === 'edit'
        ? 'EditEvent'
        : route.params.nextView
    );
  };

  return (
    <RichInputContainer icon="back" back={navigation.goBack}>
      <View style={styles.time}>
        <FormHeading
          indented
          title="What day will your Troop meeting take place?"
        />
        <RadioForm
          radio_props={[
            {label: 'M', value: 'Monday'},
            {label: 'T', value: 'Tuesday'},
            {label: 'W', value: 'Wednesday'},
            {label: 'Th', value: 'Thursday'},
            {label: 'F', value: 'Friday'},
            {label: 'S', value: 'Saturday'},
            {label: 'Su', value: 'Sunday'},
          ]}
          buttonSize={Dimensions.get('window').width / 16}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={'#2196f3'}
          style={{paddingHorizontal: 2, paddingVertical: 18}}
          initial={'Tuesday'}
          onPress={(value) => setDay(value)}
        />
        <Slider
          title="How many weeks will your Troop meeting repeat for?"
          min={5}
          max={20}
          distance={numWeeksRepeat}
          setDistance={setNumWeeksRepeat}
        />
        <NextButton
          inline
          text="Next"
          iconName="ios-arrow-round-forward"
          onClick={nextForm}
        />
      </View>
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({
  time: {
    margin: 21,
  },
});

export default TroopMeetingDetails;
