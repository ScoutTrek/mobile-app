import React, {useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';

import RTE from '../../../components/RichTextEditor';

import RichInputContainer from '../../../components/containers/RichInputContainer';
import NextButton from '../../../components/buttons/NextButton';
import {eventData} from '../event_components/ChooseName';

const CanoeingDetails = ({navigation, route}) => {
  const {nextView} = route.params;

  const [description, setDescription] = useState(
    eventData()?.description || ''
  );

  const nextForm = () => {
    const prevData = eventData();
    eventData({
      ...prevData,
      description,
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
      <RTE
        heading="What additional information do you want people to know about this canoeing trip?"
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

export default CanoeingDetails;
