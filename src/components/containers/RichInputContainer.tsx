import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import Colors from '../../../constants/Colors';
import {BackButton, DismissButton} from 'ScoutDesign/library';

type Props = {
  background: string;
  icon?: 'back' | 'close';
  back: () => void;
  children: any;
};

const RichInputContainer = ({background, back, icon, children}: Props) => (
  <KeyboardAvoidingView
    behavior="padding"
    enabled={Platform.OS === 'ios'}
    keyboardVerticalOffset={0}
    style={styles.screen}>
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      style={background ? {backgroundColor: background} : undefined}
      keyboardDismissMode="none"
      keyboardShouldPersistTaps="always">
      {icon === 'back' ? (
        <BackButton corner="top-left" distanceFromCorner="s" onDismiss={back} />
      ) : (
        <DismissButton
          corner="top-right"
          distanceFromCorner="s"
          onDismiss={back}
        />
      )}
      <View style={styles.inputContainer}>{children}</View>
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
    marginTop: 40,
    flex: 1,
  },
});

export default RichInputContainer;
