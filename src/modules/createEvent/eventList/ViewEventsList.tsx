import {StyleSheet, View, ActivityIndicator} from 'react-native';

import Constants from 'expo-constants';

import {gql, useQuery} from '@apollo/client';
import {backArrow} from 'ScoutDesign/icons';
import {ImageTileGrid, LargeFloatingButton} from 'ScoutDesign/library';

import {convertEventIDToText} from 'data/utils/convertEventIDToText';

export const GET_EVENT_SCHEMAS = gql`
  query EventSchemas {
    eventSchemas
  }
`;

type Props = {
  navigation: any;
};

const ViewEventsList = ({navigation}: Props) => {
  const {loading, error, data} = useQuery(GET_EVENT_SCHEMAS);

  if (loading) {
    return <ActivityIndicator />;
  }

  const eventSchemasArr = Object.values(data['eventSchemas']);
  const tiles = eventSchemasArr.map((item) =>
    typeof item === 'object'
      ? {
          id: item?.metaData?.eventID,
          source: item?.metaData?.image,
          title: convertEventIDToText(item?.metaData?.eventID),
          onPress: () =>
            navigation.navigate('CreateEvent', {
              type: item?.metaData?.eventID,
            }),
        }
      : undefined
  );

  return (
    <View style={styles.container}>
      <ImageTileGrid rows={2} padding="xs" tiles={tiles} />
      <LargeFloatingButton
        accessibilityLabel="cancel new event"
        icon={backArrow}
        text="Cancel"
        corner="bottom-right"
        distanceFromCorner="l"
        onPress={navigation.goBack}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ViewEventsList;
