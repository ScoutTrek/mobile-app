import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import RTE from '../../../components/RichTextEditor';

import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import Constants from 'expo-constants';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import Slider from '../../../components/formfields/Slider';
import NextButton from '../../../components/buttons/NextButton';
import {eventData} from '../event_components/ChooseName';
import {toTitleCase} from '../../../components/utils/toTitleCase';

const HikeDetails = ({navigation, route}) => {
  const {nextView} = route.params;

  const [description, setDescription] = useState([]);
  const [distance, setDistance] = useState(1);

  const nextForm = () => {
    const prevData = eventData();
    eventData({
      ...prevData,
      description: {
        title: 'Description',
        value: description,
        type: 'description',
        view: route.name,
      },
      distance: {
        title: 'Distance',
        value: distance,
        view: route.name,
      },
    });
    navigation.navigate(route.params.edit ? 'ConfirmEventDetails' : nextView);
  };

  const back = () => {
    navigation.goBack();
  };

  return (
    <RichInputContainer icon="back" back={back}>
      <Slider distance={distance} setDistance={setDistance} min={1} max={20} />
      <RTE
        heading="What additional information do you want people to know about this hike?"
        description={description}
        setDescription={setDescription}
      />
      <NextButton
        text="Next"
        iconName="ios-arrow-round-forward"
        onClick={nextForm}
      />
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({
  endTimeContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  dateTime: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 12,
  },
  chooseEndTimeBtn: {
    backgroundColor: Colors.purple,
    padding: 8,
    borderRadius: 8,
  },
  formHeading: {
    borderColor: Colors.secondary,
    fontSize: 15,
    fontFamily: Fonts.primaryTextBold,
    marginHorizontal: 22,
    marginVertical: 18,
  },
  submitBtn: {
    backgroundColor: Colors.green,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: Fonts.primaryTextBold,
  },
  backIcon: {
    paddingVertical: Constants.statusBarHeight / 3 + 5,
    paddingHorizontal: 16,
    position: 'absolute',
    left: '1.5%',
    top: Constants.statusBarHeight / 2,
    zIndex: 1,
  },
});

export default HikeDetails;
