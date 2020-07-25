import React, {Fragment} from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Constants from 'expo-constants';

import {Ionicons} from '@expo/vector-icons';
import Colors from '../../../../constants/Colors';
import Fonts from '../../../../constants/Fonts';
import BackIcon from '../../../components/buttons/BackIcon';
import moment from 'moment';

const EventHeader = ({navigation, image_path, title, date, name}) => {
  return (
    <ImageBackground
      style={styles.container}
      source={image_path && {uri: image_path}}>
      <BackIcon back={() => navigation.goBack()} />
      <LinearGradient
        style={styles.overlay}
        colors={['transparent', 'rgba(229, 252, 255, 0.2)', '#fff']}
        start={[0.5, 0]}
        end={[0.5, 1]}
        locations={[0, 0.7, 1]}>
        <Text style={styles.title}>{title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 15,
              marginRight: 8,
              paddingTop: 6,
              paddingBottom: 3,
            }}>
            <Ionicons
              style={styles.icon}
              name="ios-calendar"
              size={22}
              color={Colors.darkGreen}
            />
            <Text style={styles.date}>{moment(date).format('MMM D')}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.copySmall}>created by</Text>
            <View style={styles.creatorContainer}>
              <Text style={styles.creator}>{name}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    resizeMode: 'cover',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
    marginBottom: 12,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('window').height / 3,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  title: {
    paddingHorizontal: 15,
    fontFamily: Fonts.primaryTextBold,
    fontSize: 30,
  },
  copySmall: {
    fontFamily: Fonts.primaryTextLight,
    fontSize: 14,
    marginRight: 8,
  },
  date: {
    fontSize: 22,
    fontFamily: Fonts.headingBold,
    color: Colors.darkGreen,
  },
  icon: {
    paddingRight: 10,
  },
  creatorContainer: {
    overflow: 'hidden',
    paddingVertical: 3.5,
    paddingHorizontal: 8,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: Colors.blue,
  },
  creator: {
    color: '#fff',
    fontFamily: Fonts.headingBold,
    fontSize: 15,
  },
});

export default EventHeader;
