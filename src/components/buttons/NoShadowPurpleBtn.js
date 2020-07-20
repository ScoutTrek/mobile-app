import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';

const NoShadowPurpleBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.chatContainer}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.chatHeading}>Questions & Updates</Text>
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
  chatContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 6,
    borderRadius: 4,
    backgroundColor: Colors.purple,
  },
  chatHeading: {
    color: '#fff',
    fontFamily: 'oxygen-bold',
    fontSize: 21,
    paddingHorizontal: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default NoShadowPurpleBtn;
