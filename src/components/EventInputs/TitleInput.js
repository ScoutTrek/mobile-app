import React, {useState} from 'react';
import {eventData} from '../../../App';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Text} from '@ScoutDesign';
import Input from '../formfields/Input';
import BasicLineItem from '../BasicLineItem';
import {LinearGradient} from 'expo-linear-gradient';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import InputModalContainer from '../containers/InputModalContainer';

const TitleInputButton = ({fieldName, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          borderRadius: 20,
          zIndex: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: 19,
          height: 19,
          overflow: 'hidden',
          backgroundColor: '#fff',
          marginLeft: 16,
        }}>
        <Text preset="lg" color="brand">
          +
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderBottomWidth: 2,
          fontSize: 15,
          borderColor: Colors.green,
          marginVertical: 5,
          marginLeft: -32,
          marginRight: 16,
        }}>
        <LinearGradient
          colors={['rgba(104, 237, 180, 0.045)', 'rgba(23, 161, 101, 0.075)']}
          start={{x: 0.6, y: 0}}
          end={{x: 0.55, y: 1}}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
          }}>
          <Text
            preset="heading"
            style={{
              fontSize: 18,
              marginHorizontal: 32,
              paddingVertical: 9,
              paddingHorizontal: 8,
            }}
            color="brand">
            {fieldName}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const ChooseName = ({id, setModalVisible, questionText}) => {
  const [title, setTitle] = useState(eventData()?.[id] || '');
  const [nameIsValid, setNameIsValid] = useState(!!eventData()?.[id] || false);

  const back = () => setModalVisible(false);
  const nextForm = () => {
    if (nameIsValid) {
      eventData({
        ...eventData(),
        [id]: title,
      });
      setModalVisible(false);
    }
  };

  return (
    <InputModalContainer
      onPress={nextForm}
      cancel={back}
      title={questionText}
      invalid={!nameIsValid}>
      <Input
        value={title}
        autoCompleteType="off"
        autoCorrect={false}
        onChangeText={(value) => {
          setTitle(value);
          setNameIsValid(title.length > 2);
        }}
      />
    </InputModalContainer>
  );
};

export default {
  InitialButton: TitleInputButton,
  EditingComponent: ChooseName,
  CompletedComponent: BasicLineItem,
};
