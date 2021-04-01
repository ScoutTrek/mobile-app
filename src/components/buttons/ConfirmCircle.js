import React from 'react';
import {Animated, Easing, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ConfirmCircle = ({color, icon, onClick, primaryView, toolbar}) => {
  let scaleValue = new Animated.Value(0);
  const cardScale = scaleValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.99, 1],
    outputRange: [1, 3, 25, 40, 1],
  });
  return (
    <>
      <AnimatedTouchable
        style={{
          padding: 26,
          borderRadius: 26,
          transform: [{scale: cardScale}],
          backgroundColor: Colors.green,
          position: 'absolute',
          bottom: toolbar ? 55 : 30,
          right: 20,
        }}
      />
      <AnimatedTouchable
        onPress={() => {
          scaleValue.setValue(0);
          !primaryView &&
            Animated.timing(scaleValue, {
              toValue: 1,
              duration: 650,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start();
          setTimeout(() => onClick(), 300);
        }}
        style={[
          {
            height: 52,
            width: 52,
            borderRadius: 26,
            backgroundColor: Colors.yellow,
            justifyContent: 'center',
            alignItems: 'center',
          },
          color && {backgroundColor: color},
          {position: 'absolute', bottom: toolbar ? 55 : 30, right: 20},
        ]}>
        {icon ? (
          icon
        ) : (
          <Ionicons size={27} name={'arrow-forward'} color="white" />
        )}
      </AnimatedTouchable>
    </>
  );
};

export default ConfirmCircle;
