import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import // previously imported modules

'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const NextButton = ({inline, text, color, iconName, onClick}) => {
  let scaleValue = new Animated.Value(0);
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 5, 40],
  });
  return (
    <AnimatedTouchable
      onPress={() => {
        scaleValue.setValue(0);
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();

        onClick();
      }}
      style={[
        styles.nextBtn,
        {
          height: 42,
          transform: [{scale: cardScale}],
        },
        color && {backgroundColor: color},
        !inline && {position: 'absolute', bottom: 24, right: 30},
      ]}>
      {text && <Text style={styles.text}>{text}</Text>}
      <Ionicons size={35} name={iconName} color="white" style={{height: 35}} />
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  nextBtn: {
    backgroundColor: Colors.green,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 21,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: Fonts.primaryText,
    paddingRight: 15,
  },
});

export default NextButton;
