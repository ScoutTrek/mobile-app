import React from 'react';
import {View} from 'react-native';
import SubmitBtn from '../../../components/buttons/SubmitButton';
import ShowChosenTimeRow from '../../../components/ShowChosenTimeRow';
import Colors from '../../../../constants/Colors';
import RichInputContainer from '../../../components/containers/RichInputContainer';
import {gql, useMutation} from '@apollo/client';
import {GET_EVENTS} from '../../calendar/CalendarView';
import {eventData} from '../event_components/ChooseName';

const ADD_HIKE = gql`
  mutation AddHike($hike: AddHikeInput!) {
    addHike(input: $hike) {
      id
      type
      title
      description
      datetime
      location {
        lat
        lng
      }
      meetLocation {
        lat
        lng
      }
      creator {
        id
        name
      }
    }
  }
`;

const ConfirmTroopMeetingDetails = ({navigation, route}) => {
  const [addHike] = useMutation(ADD_HIKE, {
    update(cache, {data: {addHike}}) {
      try {
        const {events} = cache.readQuery({query: GET_EVENTS});
        cache.writeQuery({
          query: GET_EVENTS,
          data: {events: events.concat([addHike])},
        });
      } catch {
        cache.writeQuery({
          query: GET_EVENTS,
          data: {events: [addHike]},
        });
      }
    },
  });

  const finalData = eventData();

  const submit = () => {
    const datetime = `${finalData.date.date}T${
      finalData.time.time.toISOString().split('T')[1]
    }`;
    addHike({
      variables: {
        hike: {
          title: finalData.name.value,
          description: finalData.description.value,
          datetime,
          meetTime: finalData.meetTime.time,
          leaveTime: finalData.leaveTime.time,
          endDatetime: finalData.endTime.time,
          pickupTime: finalData.pickupTime.time,
          distance: finalData.distance.value,
          location: {
            lat: finalData.location.coords.latitude,
            lng: finalData.location.coords.longitude,
          },
          meetLocation: {
            lat: finalData.meetLocation.coords.latitude,
            lng: finalData.meetLocation.coords.longitude,
          },
        },
      },
    }).catch((err) => console.log(err));
    console.log('success!');
    navigation.popToTop();
    navigation.pop();
    navigation.navigate('Calendar');
  };

  const back = () => {
    navigation.goBack();
  };

  return (
    <RichInputContainer icon="back" back={back}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{marginVertical: 8}}>
          {Object.keys(finalData).map((event) => {
            switch (finalData[event].type) {
              case 'date':
                return (
                  <ShowChosenTimeRow
                    key={finalData[event].title}
                    description={finalData[event].title}
                    value={finalData[event].value}
                    color={Colors.lightOrange}
                    onPress={() =>
                      navigation.navigate(finalData[event].view, {edit: true})
                    }
                    icon="ios-calendar"
                  />
                );
              case 'time':
                return (
                  <ShowChosenTimeRow
                    key={finalData[event].title}
                    description={finalData[event].title}
                    value={finalData[event].value}
                    color={Colors.lightOrange}
                    onPress={() =>
                      navigation.navigate(finalData[event].view, {edit: true})
                    }
                  />
                );
              case 'address':
                return (
                  <ShowChosenTimeRow
                    location
                    key={finalData[event].title}
                    description={finalData[event].title}
                    value={finalData[event].value}
                    color={Colors.backgroundBlue}
                    onPress={() =>
                      navigation.navigate(finalData[event].view, {edit: true})
                    }
                    icon="ios-location"
                  />
                );
              case 'description':
                return (
                  <ShowChosenTimeRow
                    small
                    key={finalData[event].title}
                    description={finalData[event].title}
                    value={finalData[event].value}
                    color={Colors.lightRed}
                    onPress={() =>
                      navigation.navigate(finalData[event].view, {edit: true})
                    }
                    icon="ios-book"
                  />
                );
              default:
                return (
                  <ShowChosenTimeRow
                    key={finalData[event].title}
                    description={finalData[event].title}
                    value={finalData[event].value}
                    color={Colors.lightGreen}
                    onPress={() =>
                      navigation.navigate(finalData[event].view, {edit: true})
                    }
                    icon="ios-information-circle"
                  />
                );
            }
          })}
        </View>
        <SubmitBtn submit={submit} title="Complete" />
      </View>
    </RichInputContainer>
  );
};

export default ConfirmTroopMeetingDetails;
