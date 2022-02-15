import {Event} from '../../createEvent/eventTypes';
import {EventSignature} from '../UpcomingEvents';
import {Card, Badge, Image, Text, Container} from 'ScoutDesign/library';
import {
  bike,
  boat,
  bonfire,
  compass,
  hiking,
  people,
  tent,
} from 'ScoutDesign/icons';

function getIcon(eventType: Event) {
  switch (eventType) {
    case 'Hike':
      return hiking;
    case 'BikeRide':
      return bike;
    case 'Canoeing':
      return boat;
    case 'TroopMeeting':
      return people;
    case 'Campout':
      return bonfire;
    case 'SummerCamp':
      return tent;
    default:
      return compass;
  }
}

type Props = {
  id: string;
  title: string;
  type: Event;
  date: string;
  onSelect: (item: EventSignature) => void;
};

const EventCard = ({id, title, type, date, onSelect}: Props) => {
  const absDate = new Date(+date);
  const offset = -1 * absDate.getTimezoneOffset() * 60 * 1000;
  const localDate = new Date(absDate.getTime() - offset);
  return (
    <Card
      accessibilityLabel="solid card"
      headerLeft={
        <Badge
          accessibilityLabel="campout-solid-badge"
          text={type}
          icon={getIcon(type)}
          color="brandSecondaryDark"
        />
      }
      titleAlignment="right"
      headerRight={
        <Container padding="none" flexDirection="row" alignItems="baseline">
          <Text preset="micro">
            {
              [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
              ][localDate.getDay()]
            }
          </Text>
          <Text weight="light" marginHorizontal="micro" paddingLeft="micro">
            {
              [
                'Jan.',
                'Feb.',
                'Mar.',
                'Apr.',
                'May',
                'June',
                'July',
                'Aug',
                'Sept.',
                'Oct.',
                'Nov.',
                'Dec.',
              ][localDate.getMonth()]
            }
          </Text>
          <Text preset="h3">{localDate.getDate()}</Text>
        </Container>
      }
      onPress={() => onSelect({id, type})}>
      <Image
        accessibilityLabel="card-picture"
        placement="foreground"
        radius="m"
        padding="micro"
        size={{
          height: 100,
        }}
        source={{
          uri: 'https://picsum.photos/1000',
        }}
      />
      <Card.Description
        sameLine
        heading={title}
        bodyText={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus'
        }
      />
    </Card>
  );
};

export default EventCard;
