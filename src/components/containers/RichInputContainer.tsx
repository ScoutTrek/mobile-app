import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import CancelIcon from '../buttons/CancelIcon';
import Colors from '../../../constants/Colors';
import {DismissButton, Icon} from 'ScoutDesign/library';
import {backChevron, close} from 'ScoutDesign/icons';

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
        <Icon
          size="m"
          color="informationDark"
          icon={backChevron}
          onPress={back}
        />
      ) : (
        <DismissButton corner="top-right" onDismiss={back} />
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
