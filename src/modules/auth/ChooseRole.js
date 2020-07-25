import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import Constants from 'expo-constants';

const ROLES = [
  'SCOUTMASTER',
  'SENIOR_PATROL_LEADER',
  'PATROL_LEADER',
  'SCOUT',
  'PARENT',
];

const ChooseRole = ({navigation, route}) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={0}
      style={{flex: 1}}
      enabled>
      <View style={{flex: 1}}>
        <View style={styles.inputContainer}>
          <Text style={styles.formHeading}>
            What is your role within the Troop?
          </Text>
          {ROLES.map((role) => (
            <TouchableOpacity
              onPress={() => {
                const signUpData = {
                  ...route.params,
                  role,
                };
                delete signUpData.nextView;
                navigation.navigate(route.params.nextView, signUpData);
              }}
              style={styles.role}
              key={role}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Fonts.primaryTextBold,
                  color: '#fff',
                }}>
                {role.replace(/_/g, ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15 + Constants.statusBarHeight,
    paddingHorizontal: 15,
  },
  role: {
    padding: 12,
    margin: 10,
    width: '100%',
    paddingHorizontal: 22,
    borderWidth: 1,
    backgroundColor: Colors.purple,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.32,
    shadowRadius: 3,
    elevation: 3,
  },
  troopNumber: {
    padding: 16,
    alignItems: 'flex-start',
    width: 100,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.purple,
    fontSize: 15,
    flexDirection: 'row',
    fontFamily: Fonts.primaryText,
    backgroundColor: '#fff',
  },
  formHeading: {
    borderColor: Colors.green,
    fontSize: 15,
    fontFamily: Fonts.primaryTextBold,
    margin: 18,
  },
});

export default ChooseRole;
