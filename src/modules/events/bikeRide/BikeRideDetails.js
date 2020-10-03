import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';

import RTE from '../../../components/RichTextEditor';

import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Constants from 'expo-constants';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import Slider from '../../../components/formfields/Slider';
import NextButton from '../../../components/buttons/NextButton';
import {eventData} from '../event_components/ChooseName';

const BikeRideDetails = ({navigation, route}) => {
  const {nextView} = route.params;

  const [description, setDescription] = useState(
    eventData()?.description || ''
  );
  const [distance, setDistance] = useState(eventData()?.distance || 1);

  const nextForm = () => {
    const prevData = eventData();
    eventData({
      ...prevData,
      description,
      distance,
    });
    Keyboard.dismiss();
    navigation.navigate(
      route.params.edit === 'create'
        ? 'ConfirmEventDetails'
        : route.params.edit === 'edit'
        ? 'EditEvent'
        : nextView
    );
  };

  const back = () => {
    navigation.goBack();
  };

  return (
    <RichInputContainer icon="back" back={back}>
      <Slider
        title="Bike Ride Distance (in miles)?"
        distance={distance}
        setDistance={setDistance}
        min={1}
        max={30}
      />
      <RTE
        heading="What additional information do you want people to know about this bike ride?"
        description={description}
        setDescription={setDescription}>
        <NextButton
          inline
          text="Next"
          iconName="ios-arrow-round-forward"
          onClick={nextForm}
        />
      </RTE>
    </RichInputContainer>
  );
};

export default BikeRideDetails;
