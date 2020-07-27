import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Button} from 'react-native';

import ChooseLocationView from '../event_components/ChooseLocation';
import HikeDetails from './HikeDetails';
import ChooseName from '../event_components/ChooseName';

const HikeStack = createStackNavigator();

function ModalScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 30}}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const HikeStackNavigator = () => {
  return (
    <HikeStack.Navigator
      screenOptions={() => ({
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
      })}>
      <HikeStack.Screen
        name="ChooseName"
        component={ChooseName}
        initialParams={{
          placeholder: 'What do you want to call your hike?',
          nextView: 'ChooseLocation',
        }}
      />
      <HikeStack.Screen
        name="ChooseLocation"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where do you want to hike?',
          chooseDate: 'What day is your hike?',
          chooseTime: 'What time do you want to be at the trailhead?',
          initialModal: 'date',
          nextView: 'ChooseMeetPoint',
        }}
      />
      <HikeStack.Screen
        name="ChooseMeetPoint"
        component={ChooseLocationView}
        initialParams={{
          placeholder: 'Where should everyone meet?',
          chooseMeetTime: 'What time should everybody meet?',
          chooseLeaveTime: 'What time do you plan to leave your meet place?',
          initialModal: 'time',
          nextView: 'CoolModal',
        }}
      />
      <HikeStack.Screen
        options={{
          animationEnabled: false,
        }}
        name="CoolModal"
        component={ModalScreen}
      />
      <HikeStack.Screen name="EventDetails" component={HikeDetails} />
    </HikeStack.Navigator>
  );
};

export default HikeStackNavigator;
