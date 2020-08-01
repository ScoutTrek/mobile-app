import React from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import Constants from 'expo-constants';
import CancelIcon from './buttons/CancelIcon';
import {LinearGradient} from 'expo-linear-gradient';

const CalModal = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.goBack}>
      <View
        style={{
          flex: 1,
          marginTop: Constants.statusBarHeight,
          marginBottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
        <CancelIcon white back={props.goBack} />
        <View
          style={{
            width: '88%',
            borderRadius: 8,
            padding: 7,
            backgroundColor: '#fff',
            overflow: 'hidden',
          }}>
          {props.children}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CalModal;
