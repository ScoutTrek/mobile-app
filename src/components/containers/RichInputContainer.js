import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
import CancelIcon from '../buttons/CancelIcon';
import BackIcon from '../buttons/BackIcon';

const RichInputContainer = (props) => (
  <KeyboardAvoidingView
    behavior="padding"
    enabled={Platform.OS === 'ios'}
    style={styles.screen}>
    <ScrollView keyboardDismissMode="none" keyboardShouldPersistTaps="always">
      {props.icon === 'back' ? (
        <BackIcon back={props.back} />
      ) : (
        <CancelIcon back={props.back} />
      )}
      <View style={styles.inputContainer}>{props.children}</View>
    </ScrollView>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  inputContainer: {
    marginTop: 30,
  },
});

export default RichInputContainer;
