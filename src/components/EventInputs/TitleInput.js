import React, {useState} from 'react';
import {eventData} from '../../../App';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Input from '../formfields/Input';
import BasicLineItem from '../BasicLineItem';
import {LinearGradient} from 'expo-linear-gradient';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import ConfirmCircle from '../buttons/ConfirmCircle';
import InputModalContainer from '../containers/InputModalContainer';

const TitleInputButton = ({fieldName, onPress}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          borderRadius: 20,
          zIndex: 10,
          alignItems: 'center',
          width: 19,
          height: 19,
          overflow: 'hidden',
          backgroundColor: '#fff',
          marginLeft: 16,
          marginTop: -1.5,
        }}>
        <Text
          style={{
            fontSize: 20,
            marginTop: -3,
            marginRight: -1,
            fontFamily: Fonts.primaryTextBold,
            color: '#138855',
          }}>
          +
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderBottomWidth: 2,
          fontSize: 15,
          borderColor: Colors.green,
          marginVertical: 5,
          marginLeft: -33,
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
            style={{
              fontFamily: Fonts.primaryTextBold,
              fontSize: 18,
              marginHorizontal: 32,
              paddingVertical: 9,
              paddingHorizontal: 8,
              color: Colors.darkGreen,
            }}>
            {fieldName}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
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
