import Slider from '../formfields/Slider';
import React, {useState} from 'react';
import {eventData} from '../../../App';
import {Dimensions, View, Text} from 'react-native';
import Input from '../formfields/Input';
import NextButton from '../buttons/NextButton';
import BasicLineItem from '../BasicLineItem';
import DefaultInputButton from '../buttons/DefaultInputButton';
import InputModalContainer from '../containers/InputModalContainer';

const ChooseDistance = ({id, setModalVisible, questionText}) => {
  const [distance, setDistance] = useState(eventData()?.[id] || 1);
  const [nameIsValid, setNameIsValid] = useState(!!eventData()?.[id] || false);

  const back = () => setModalVisible(false);
  const nextForm = () => {
    // if (nameIsValid) {
    eventData({
      ...eventData(),
      [id]: distance,
    });
    setModalVisible(false);
    // }
  };

  return (
    <InputModalContainer title={questionText} onPress={nextForm} cancel={back}>
      <Slider distance={distance} setDistance={setDistance} min={1} max={30} />
    </InputModalContainer>
  );
};

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseDistance,
  CompletedComponent: BasicLineItem,
};
