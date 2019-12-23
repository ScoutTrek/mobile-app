import React, {useState} from 'react'
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

import GridRow from '../../components/GridRow'
import {exp} from 'react-native-reanimated'

const listData = [
  {
    id: 1,
    eventType: 'Hiking',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Take the troop on the trail for part of a day.',
    badge: 'NEW',
    badgeColor: '#3cd39f',
    image: require('../../../assets/images/event_img/hiking_trip.jpg'),
  },
  {
    id: 2,
    eventType: 'Troop Meeting',
    title: 'NEXT-LEVEL WEAR',
    subtitle:
      'Plan all the logistics for your weekly meetings in a fraction of the time.',
    priceFrom: true,
    image: require('../../../assets/images/event_img/scouts-images.jpg'),
  },
  {
    id: 3,
    eventType: 'Camping',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: 'Spend a few days in mother nature.',
    priceFrom: true,
    badge: 'SALE',
    badgeColor: '#ee1f78',
    image: require('../../../assets/images/event_img/campfire.jpg'),
  },
  {
    id: 4,
    eventType: 'Backpacking',
    title: 'CITIZEN ECO-DRIVE',
    subtitle: "It's like hiking, but more Pro.",
    badge: 'NEW',
    badgeColor: 'green',
    image: require('../../../assets/images/event_img/backpacking_trip.jpg'),
  },
]

const GridsScreen = ({navigation}) => {
  const [tabIndex, setTabIndex] = useState(1)
  const [data, setData] = useState(listData)

  const _getRenderItemFunction = () =>
    [renderRowOne, renderRowTwo, renderRowThree][tabIndex]

  const _openArticle = article => {
    navigation.navigate({
      routeName: 'Article',
      params: {...article},
    })
  }

  const renderRowTwo = ({item}) => (
    <TouchableOpacity
      key={item.id}
      style={styles.eventContainer}
      onPress={() => _openArticle(item)}>
      <View style={styles.eventContent}>
        <Image
          style={styles.eventImage}
          source={item.image}
          resizeMode="cover"
        />
        <View style={styles.eventOverlay} />
        <Text style={styles.eventTitle}>{item.eventType}</Text>
        <Text style={styles.eventSubTitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  )

  const groupedData = tabIndex === 0 ? GridRow.groupByRows(data, 2) : data

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item =>
          item.id ? `${tabIndex}-${item.id}` : `${item[0] && item[0].id}`
        }
        style={{backgroundColor: colors.white, paddingHorizontal: 15}}
        data={groupedData}
        renderItem={_getRenderItemFunction()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  eventContainer: {
    width: '100%',
    paddingVertical: 5,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  eventContent: {
    padding: 20,
    flex: 1,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 180,
  },
  eventTitle: {
    color: 'white',
    fontFamily: fonts.primaryBold,
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  eventSubTitle: {
    color: 'white',
    fontFamily: fonts.primaryRegular,
    fontSize: 18,
    marginVertical: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  eventImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: 180,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  eventOverlay: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6233da',
    opacity: 0.5,
  },
})

export default GridsScreen
