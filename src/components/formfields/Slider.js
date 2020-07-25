import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Fonts from '../../../constants/Fonts';

const Slider = ({distance, setDistance, min, max}) => {
  return (
    <View>
      <Text style={styles.formHeading}>Hike Distance (in miles)?</Text>
      <View style={styles.sliderContainer}>
        <Slider
          minimumValue={min}
          maximumValue={max}
          step={1}
          style={styles.slider}
          value={distance}
          onValueChange={setDistance}
        />
        <Text style={styles.sliderText}>{distance}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 28,
    marginRight: 8,
  },
  slider: {
    flex: 7,
    justifyContent: 'center',
  },
  sliderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: Fonts.primaryTextBold,
    paddingTop: 5,
  },
});

export default Slider;
