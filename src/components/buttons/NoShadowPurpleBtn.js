import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';
import Fonts from '../../../constants/Fonts';

const NoShadowPurpleBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.title}>Questions & Updates</Text>
        <Ionicons
          style={{paddingTop: 5, paddingLeft: 5}}
          size={30}
          name="ios-arrow-round-forward"
          color="#fff"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 4,
    borderRadius: 4,
    backgroundColor: Colors.purple,
  },
  title: {
    color: '#fff',
    fontFamily: Fonts.primaryTextBold,
    fontSize: 21,
    paddingHorizontal: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default NoShadowPurpleBtn;
