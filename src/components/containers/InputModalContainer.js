import React from 'react';
import {Platform} from 'react-native';
// import {Text, ConfirmButton} from '@ScoutDesign';
import Constants from 'expo-constants';
import Colors from '../../../constants/Colors';
// import {Ionicons} from '@expo/vector-icons';

const InputModalContainer = ({
  title,
  onPress,
  cancel,
  toolbar,
  invalid,
  children,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          marginTop: 10 + Constants.statusBarHeight,
          marginBottom: Constants.statusBarHeight,
          marginHorizontal: 20,
          borderRadius: 4,
          overflow: 'hidden',
        }}>
        <View
          style={{
            padding: 30,
            backgroundColor: Colors.green,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text preset="heading-alt" color="white">
            {title}
          </Text>
        </View>
        <View style={{flex: 1}}>{children}</View>
        {!invalid ? (
          <ConfirmButton
            ID="titleConfirm"
            icon={<Ionicons size={27} name="arrow-forward" color="white" />}
            onPress={onPress}
            toolbar={toolbar}
          />
        ) : null}
      </View>
      <Ionicons
        onPress={cancel}
        style={{position: 'absolute', top: Constants.statusBarHeight, left: 12}}
        name="close-circle"
        size={36}
        color="white"
      />
    </KeyboardAvoidingView>
  );
};

export default InputModalContainer;
