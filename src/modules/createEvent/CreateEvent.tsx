import {gql, useMutation, useQuery} from '@apollo/client';
import RichInputContainer from '../../components/containers/RichInputContainer';
import EventInputTemplate from './Inputs/EventInputTemplate';
import {GET_EVENTS} from '../calendar/CalendarView';
import {EVENT_FIELDS, GET_UPCOMING_EVENTS} from '../home/UpcomingEvents';
import {useEventForm, clearEventForm} from 'CreateEvent/CreateEventFormStore';
import {Button} from 'ScoutDesign/library';

const ADD_EVENT = gql`
  ${EVENT_FIELDS}
  mutation AddEvent($event: AddEventInput!) {
    event: addEvent(input: $event) {
      ...EventFragment
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $updates: UpdateEventInput!) {
    updateEvent(id: $id, input: $updates) {
      ...EventFragment
    }
  }
  ${EVENT_FIELDS}
`;

export const GET_EVENT_DATA = gql`
  query GetEventData {
    eventData @client
  }
`;

export const GET_EVENT_SCHEMAS = gql`
  query EventSchemas {
    eventSchemas
  }
`;

const CreateEvent = ({navigation, route}) => {
  const [addEvent] = useMutation(ADD_EVENT, {
    update(cache, {data: {event}}) {
      try {
        const {events} = cache.readQuery({query: GET_EVENTS});
        cache.writeQuery({
          query: GET_EVENTS,
          data: {events: events.concat([event])},
        });
        const {upcomingEvents} = cache.readQuery({query: GET_UPCOMING_EVENTS});
        cache.writeQuery({
          query: GET_UPCOMING_EVENTS,
          data: {upcomingEvents: upcomingEvents.concat([event])},
        });
      } catch {
        cache.writeQuery({
          query: GET_EVENTS,
          data: {events: [event]},
        });
      }
    },
  });
  const {loading: schemaLoading, data} = useQuery(GET_EVENT_SCHEMAS);

  const [state, dispatch] = useEventForm();
  const {fields} = state;

  const [updateEvent] = useMutation(UPDATE_EVENT);

  if (schemaLoading) return null;

  const schema = data['eventSchemas'][route.params.type.toLowerCase()];

  const createEvent = () => {
    if (true) {
      const eventDataCopy = {...fields};
      if (route.params.update) {
        const omitTypename = (key, value) =>
          key === '__typename' ? undefined : value;
        const cleanedEventData = JSON.parse(
          JSON.stringify(eventDataCopy),
          omitTypename
        );
        updateEvent({
          variables: {id: route.params.id, updates: cleanedEventData},
        })
          .then(() => {
            return new Promise((res, rej) => {
              dispatch(clearEventForm());
              navigation.goBack();
              res();
            });
          })
          .catch((err) => console.log(err));
      } else {
        addEvent({
          variables: {
            event: {
              type: schema.metaData.eventID,
              ...eventDataCopy,
            },
          },
        })
          .then(() => {
            return new Promise((res, rej) => {
              navigation.popToTop();
              navigation.navigate('UpcomingEvents');
              res();
            });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const disabledFields = schema.options.reduce((accumulator, currentValue) => {
    return fields?.[currentValue.condition] === currentValue['shown']
      ? [...accumulator]
      : [...accumulator, ...currentValue.hiddenFields];
  }, []);

  return (
    <RichInputContainer
      background={'#fff'}
      icon="back"
      back={() => {
        dispatch(clearEventForm());
        navigation.goBack();
      }}>
      {schema.form.map(
        (field) =>
          !disabledFields.includes(field.fieldID) && (
            <EventInputTemplate
              fieldType={field.fieldType}
              key={field.fieldID}
              id={field.fieldID}
              fieldName={field.title}
              questionText={field.questionText}
              payload={field?.payload}
            />
          )
      )}
      <Button
        accessibilityLabel="submit"
        text="Create Event"
        onPress={createEvent}
      />
    </RichInputContainer>
  );
};

export default CreateEvent;
