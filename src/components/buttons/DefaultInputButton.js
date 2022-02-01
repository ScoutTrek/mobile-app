import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Fonts from '../../../constants/Fonts';

const DefaultInputButton = ({fieldName, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LinearGradient
        colors={['rgba(23, 161, 101, 0.095)', 'rgba(104, 237, 180, 0.045)']}
        start={{x: 0.525, y: 1}}
        end={{x: 0.6, y: 0}}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 19,
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
          {fieldName}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default DefaultInputButton;
