import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import {Ionicons} from '@expo/vector-icons';

const ChatBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.chatContainer}>
      <Ionicons
        name="md-chatbubbles"
        size={45}
        style={{paddingTop: 5}}
        color={Colors.purple}
      />
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
          color={Colors.purple}
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
    borderRadius: 4,
    backgroundColor: Colors.offWhite2,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.22,

    elevation: 3,
  },
  chatHeading: {
    color: Colors.purple,
    fontFamily: 'oxygen-bold',
    fontSize: 21,
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default ChatBtn;
