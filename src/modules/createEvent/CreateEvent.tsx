import { gql, useMutation, useQuery } from '@apollo/client';
import EventInputTemplate from './Inputs/EventInputTemplate';
import { GET_EVENTS, EVENT_FIELDS } from 'data';
import { useEventForm, clearEventForm } from 'CreateEvent/CreateEventFormStore';
import { ScreenContainer, Container, Button } from 'ScoutDesign/library';
import { StackScreenProps } from '@react-navigation/stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { EventStackParamList } from '../navigation/CreateEventNavigator';
import { MainBottomParamList } from '../navigation/MainTabNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-root-toast';
import React from 'react';

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

export const GET_EVENT_SCHEMAS = gql`
  query EventSchemas {
    eventSchemas
  }
`;

type CreateEventProps = CompositeScreenProps<
  StackScreenProps<EventStackParamList, 'EventForm'>,
  BottomTabScreenProps<MainBottomParamList>
>;

const CreateEvent = ({ navigation, route }: CreateEventProps) => {
  const [addEvent] = useMutation(ADD_EVENT, {
    update(cache, { data: { event } }) {
      try {
        cache.writeQuery({
          query: GET_EVENTS,
          data: { events: events.concat([event]) },
        });
      } catch {
        cache.writeQuery({
          query: GET_EVENTS,
          data: { events: [event] },
        });
      }
    },
  });
  const { loading: schemaLoading, data } = useQuery(GET_EVENT_SCHEMAS);

  const [state, dispatch] = useEventForm() || [null, null];
  const { fields } = state || { fields: null };

  const [updateEvent] = useMutation(UPDATE_EVENT, {
    update(cache, { data: { updateEvent: event } }) {
      try {
        const { events } = cache.readQuery({ query: GET_EVENTS });
        cache.writeQuery({
          query: GET_EVENTS,
          data: {
            events: events
              .filter((existingEvent) => existingEvent.id !== event.id)
              .concat([event]),
          },
        });
      } catch {
        cache.writeQuery({
          query: GET_EVENTS,
          data: { events: [event] },
        });
      }
    },
  });

  if (schemaLoading) return null;

  const schema = data['eventSchemas'][route.params.type.toLowerCase()];

  const createEvent = () => {
    const eventDataCopy = { ...fields };
    if (route.params.update) {
      const omitInvalidFields = (key, value) => {
        if (key === '__typename') {
          return undefined;
        } else if (value === null) {
          return undefined;
        } else {
          return value;
        }
      };
      const cleanedEventData = JSON.parse(
        JSON.stringify(eventDataCopy),
        omitInvalidFields
      );
      updateEvent({
        variables: { id: route.params.id, updates: cleanedEventData },
      })
        .then(() => {
          return new Promise<void>((res, rej) => {
            dispatch && dispatch(clearEventForm());
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
          return new Promise<void>((res, rej) => {
            navigation.popToTop();
            navigation.navigate('UpcomingEvents');
            res();
          });
        })
        .catch((err) => {
          // console.log('before', err);
          // let toast = Toast.show('Request failed to send.', {
          //   duration: Toast.durations.LONG,
          // });
          // console.log('after', err);
        });
    }
  };

  const disabledFields = schema?.options
    ? schema.options.reduce((accumulator, currentValue) => {
        return fields?.[currentValue.condition] === currentValue['shown']
          ? [...accumulator]
          : [...accumulator, ...currentValue.hiddenFields];
      }, [])
    : [];

  return (
    <ScreenContainer
      icon="back"
      padding="none"
      paddingTop="xl"
      back={() => {
        dispatch && dispatch(clearEventForm());
        navigation.goBack();
      }}>
      {/* Schema representing all the types of events currently in the app. This
      comes from the server 
      TODO: gql form schema rewrite: update with the new form types */}
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
      <Container paddingTop="l" paddingBottom="xl">
        <Button
          accessibilityLabel="submit"
          text={route.params?.update ? 'Update' : 'Create Event'}
          onPress={createEvent}
          fullWidth
        />
      </Container>
    </ScreenContainer>
  );
};

export default CreateEvent;
