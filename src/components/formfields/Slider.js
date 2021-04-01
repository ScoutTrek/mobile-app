import React from 'react';
import {Text, View, StyleSheet, Slider} from 'react-native';
import Fonts from '../../../constants/Fonts';
import FormHeading from '../Headings/FormHeading';

const CustomSlider = ({title, distance, setDistance, min, max}) => {
  return (
    <View style={styles.sliderContainer}>
      <Text style={{fontSize: 60, padding: 15}}>{distance}</Text>
      {title ? <FormHeading title={title} /> : null}

      <View style={styles.sliderRow}>
        <Slider
          minimumValue={min}
          maximumValue={max}
          step={1}
          style={styles.slider}
          value={distance}
          onValueChange={setDistance}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderRow: {
    flexDirection: 'row',
    marginVertical: 18,
    marginHorizontal: 28,
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
