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
import Colors from '../../../constants/Colors';

const RichInputContainer = (props) => (
  <KeyboardAvoidingView
    behavior="padding"
    enabled={Platform.OS === 'ios'}
    keyboardVerticalOffset={0}
    style={styles.screen}>
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardDismissMode="none"
      keyboardShouldPersistTaps="always">
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
    backgroundColor: Colors.offWhite2,
  },
  inputContainer: {
    marginTop: 30,
    flex: 1,
  },
});

export default RichInputContainer;
