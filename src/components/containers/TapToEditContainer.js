import {Platform, TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import React from 'react';
import Constants from 'expo-constants';
import {MaterialIcons} from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import {LinearGradient} from 'expo-linear-gradient';

const TapToEditContainer = ({text, edit, children}) => (
  <View style={styles.screen}>
    <LinearGradient
      colors={['rgba(104, 237, 180, 0.065)', 'rgba(23, 161, 101, 0.095)']}
      start={{x: 0.6, y: 0}}
      end={{x: 0.55, y: 1}}
      style={{
        alignItems: 'center',
        borderRadius: 19,
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={edit} style={styles.editBtn}>
        <MaterialIcons name="edit" size={23} color={Colors.green} />
      </TouchableOpacity>
    </LinearGradient>
    {children}
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBtn: {
    padding: 6,
    borderRadius: 19,
  },
});

export default TapToEditContainer;
