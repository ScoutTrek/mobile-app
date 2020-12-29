import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import {makeVar} from '@apollo/client';
import {LinearGradient} from 'expo-linear-gradient';

import Fonts from '../../../../constants/Fonts';

import NextButton from '../../../components/buttons/NextButton';
import Input from '../../../components/formfields/Input';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import ViewHeading from '../../../components/Headings/ViewHeading';
import FormHeading from '../../../components/Headings/FormHeading';

import TitleButtonFakeInput from '../../../components/formfields/TitleButtonFakeInput';

const Row = ({children, valid}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderColor: '#FFCC00',
          paddingLeft: 2,
          marginVertical: 5,
        },
        valid && {
          borderLeftWidth: 7.5,
        },
      ]}>
      {children}
    </View>
  );
};

export const eventData = makeVar({});

const CreateEvent = ({navigation, route}) => {
  const {nextView} = route.params;
  const [name, setName] = useState(eventData()?.title || '');
  const [nameIsValid, setNameIsValid] = useState(eventData() === {} || false);

  const back = () => navigation.popToTop();
  const nextForm = () => {
    if (nameIsValid) {
      eventData({
        ...eventData(),
        title: name,
      });
      navigation.navigate(
        route.params.edit === 'create'
          ? 'ConfirmEventDetails'
          : route.params.edit === 'edit'
          ? 'EditEvent'
          : nextView
      );
    }
  };

  return (
    <RichInputContainer background={'#fff'} icon="back" back={back}>
      <Row valid={true}>
        <TitleButtonFakeInput
          navigation={navigation}
          onPress={() => navigation.navigate('ChooseName')}
          heading="Hike Title"
        />
      </Row>
      <Row valid={true}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChooseLocation')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LinearGradient
            colors={['rgba(104, 237, 180, 0.045)', 'rgba(23, 161, 101, 0.075)']}
            start={{x: 0.6, y: 0}}
            end={{x: 0.55, y: 1}}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 19,
              marginHorizontal: 16,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 24.5,
                paddingLeft: 18,
                fontFamily: Fonts.primaryTextBold,
                color: '#138855',
              }}>
              +
            </Text>
            <Text
              style={{
                paddingRight: 18,
                paddingLeft: 8,
                paddingVertical: 8.5,
                fontSize: 18.5,
                fontFamily: Fonts.primaryTextBold,
                color: '#138855',
              }}>
              Location
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Row>
      <Row valid={true}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChooseDateTime')}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LinearGradient
            colors={['rgba(104, 237, 180, 0.045)', 'rgba(23, 161, 101, 0.075)']}
            start={{x: 0.6, y: 0}}
            end={{x: 0.55, y: 1}}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 19,
              marginHorizontal: 16,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 24.5,
                paddingLeft: 18,
                fontFamily: Fonts.primaryTextBold,
                color: '#138855',
              }}>
              +
            </Text>
            <Text
              style={{
                paddingRight: 18,
                paddingLeft: 8,
                paddingVertical: 8.5,
                fontSize: 18.5,
                fontFamily: Fonts.primaryTextBold,
                color: '#138855',
              }}>
              Date & time
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Row>
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({});

export default CreateEvent;
