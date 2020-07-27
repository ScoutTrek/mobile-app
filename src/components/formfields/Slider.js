import React from 'react';
import {Text, View, StyleSheet, Slider} from 'react-native';
import Fonts from '../../../constants/Fonts';
import FormHeading from '../Headings/FormHeading';

const CustomSlider = ({distance, setDistance, min, max}) => {
  return (
    <View style={styles.sliderContainer}>
      <FormHeading title="Hike Distance (in miles)?" />
      <View style={styles.sliderRow}>
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
    marginTop: 20,
  },
  sliderRow: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 18,
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
    paddingTop: 7,
  },
});

export default CustomSlider;
