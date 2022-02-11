import {StyleSheet, View} from 'react-native';
import {Container, Text, TextInputWithButton} from 'ScoutDesign/library';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import {plusBold} from 'ScoutDesign/icons';

const AddItemForm = ({
  value,
  setValue,
  isValid,
  setIsValid,
  onPress,
  heading,
  placeholder,
}) => {
  return (
    <Container paddingHorizontal="s">
      <Text paddingTop="s" preset="label">
        {heading}
      </Text>

      <TextInputWithButton
        placeholder={placeholder}
        onValueChange={(value) => {
          setValue(value);
          if (value.toString().length > 2) {
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        }}
        value={value}
        buttonText="Add"
        buttonIcon={plusBold}
        buttonColor="brandSecondary"
        disabled={!isValid}
        onPress={onPress}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  btnAddPatrol: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    marginRight: 7,
    borderRadius: 7,
    padding: 10,
    backgroundColor: Colors.lightGreen,
  },
  patrolName: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.offWhite,
    fontSize: 16,
    padding: 12,
    margin: 6,
    marginLeft: 7,
    borderRadius: 5,
    borderColor: Colors.tabIconDefault,
    borderWidth: 1,
  },
  addPatrol: {
    fontSize: 18,
    fontFamily: Fonts.primaryTextBold,
  },
  patrolHeading: {
    padding: 10,
    fontSize: 18,
    fontFamily: Fonts.primaryTextBold,
  },
});

export default AddItemForm;
