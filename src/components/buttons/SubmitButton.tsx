import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

export default function SubmitBtn({submit, title}) {
  return (
    <TouchableOpacity onPress={submit} style={styles.submitBtn}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: 'green',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    marginVertical: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: Fonts.primaryTextBold,
  },
});
