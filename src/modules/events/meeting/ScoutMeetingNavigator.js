import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import ChooseLocationView from '../eventComponents/ChooseLocation';
import SelectScoutMeetingInfo from '../../events/eventComponents/SelectScoutMeetingInfo';

export default createStackNavigator(
  {
    Location: ({navigation}) => (
      <ChooseLocationView
        navigation={navigation}
        nextView="ScoutMeetingInfo"
        placeholder="Where will this meeting take place?"
      />
    ),
    ScoutMeetingInfo: SelectScoutMeetingInfo,
  },
  {
    headerMode: null,
  }
);
