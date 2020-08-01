import React, {useState} from 'react';

import RTE from '../../../components/RichTextEditor';

import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import NextButton from '../../../components/buttons/NextButton';
import {eventData} from '../event_components/ChooseName';
import {Keyboard, Alert} from 'react-native';

const CampoutDetails = ({navigation, route}) => {
  const [description, setDescription] = useState(eventData().description || '');

  const nextForm = () => {
    if (!description) {
      Alert.alert(
        'Looks like you forgot something.',
        "Are you sure you don't want to tell us anything about the event."
      );
    } else {
      const prevData = eventData();
      eventData({
        ...prevData,
        description: description,
      });
      Keyboard.dismiss();
      navigation.navigate(
        route.params.edit ? 'ConfirmEventDetails' : route.params.nextView
      );
    }
  };

  return (
    <RichInputContainer icon="back" back={navigation.goBack}>
      <RTE
        heading="What additional information do you want people to know about this campout?"
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

export default CampoutDetails;
