import {Platform, View, KeyboardAvoidingView, Button} from 'react-native';
import {Text, CircleButton} from 'ScoutDesign/library';
import Constants from 'expo-constants';
import Colors from '../../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import {forwardArrow} from 'ScoutDesign/icons';

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
          <Text preset="h2" color="white">
            {title}
          </Text>
        </View>
        <View style={{flex: 1}}>{children}</View>
        {!invalid ? (
          <CircleButton
            accessibilityLabel="titleConfirm"
            icon={forwardArrow}
            onPress={onPress}
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
