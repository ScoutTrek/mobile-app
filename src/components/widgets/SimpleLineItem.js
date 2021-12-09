import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Fonts from '../../../constants/Fonts';

const SimpleLineItem = ({troopName, key, accordionComponent}) => {
  const [selected, setSelected] = useState();
  return (
    <View
      style={{
        padding: 20,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => setSelected((prev) => !prev)}>
        <View style={{alignItems: 'flex-start'}}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.primaryTextBold,
            }}>
            Troop
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.primaryText,
              marginTop: 10,
            }}>
            <Text>{troopName}</Text>
          </Text>
        </View>
        <Ionicons name={selected ? 'caret-up' : 'caret-down'} size={24} />
      </TouchableOpacity>
      {!!selected && accordionComponent}
    </View>
  );
};

export default SimpleLineItem;
