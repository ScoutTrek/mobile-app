import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {GET_EVENT_DATA} from '../../modules/createEvent/createEvent/CreateEvent';
import {Modal} from 'react-native';
import Row from './Row';
import TapToEditContainer from '../containers/TapToEditContainer';

// Component Types
import TitleInput from './TitleInput';
import LocationInput from './LocationInput';
import DateInput from './DateInput';
import TimeInput from './TimeInput';
import DescriptionInput from './DescriptionInput';
import NumberSliderInput from './NumberSliderInput';
import OptionsInput from './OptionsInput';

const eventComponents = {
  shortText: TitleInput,
  location: LocationInput,
  date: DateInput,
  time: TimeInput,
  description: DescriptionInput,
  slider: NumberSliderInput,
  setting: OptionsInput,
};

export default ({fieldType, id, fieldName, questionText, payload}) => {
  const {InitialButton, EditingComponent, CompletedComponent} =
    eventComponents[fieldType];
  const {
    loading,
    error,
    data: {eventData},
  } = useQuery(GET_EVENT_DATA);
  const [editing, setEditing] = useState(false);
  const [showAndroidClock, setShowAndroidClock] = useState(false);

  switch (fieldType) {
    case 'setting':
      return (
        <Row valid={!!eventData?.[id]} key={id} fieldName={fieldName}>
          <InitialButton
            id={id}
            questionText={questionText}
            option1={payload?.options?.[0]}
            option2={payload?.options?.[1]}
          />
        </Row>
      );
    case 'time':
      return (
        <React.Fragment key={id}>
          <EditingComponent
            id={id}
            setModalVisible={setEditing}
            editing={editing}
            showAndroidClock={showAndroidClock}
            setShowAndroidClock={setShowAndroidClock}
            questionText={questionText}
          />
          <Row valid={!!eventData?.[id]} fieldName={fieldName}>
            {!eventData?.[id] ? (
              <InitialButton
                onPress={() =>
                  Platform.OS === 'ios'
                    ? setEditing(true)
                    : setShowAndroidClock(true)
                }
                fieldName={fieldName}
              />
            ) : (
              <TapToEditContainer
                edit={() =>
                  Platform.OS === 'ios'
                    ? setEditing(true)
                    : setShowAndroidClock(true)
                }>
                <CompletedComponent data={+eventData?.[id]} />
              </TapToEditContainer>
            )}
          </Row>
        </React.Fragment>
      );
    case 'date':
      return (
        <React.Fragment key={id}>
          <Modal animationType="fade" transparent={true} visible={editing}>
            <EditingComponent
              id={id}
              setModalVisible={setEditing}
              questionText={questionText}
            />
          </Modal>
          <Row valid={!!eventData?.[id]} fieldName={fieldName}>
            {!eventData?.[id] ? (
              <InitialButton
                onPress={() => setEditing(true)}
                fieldName={fieldName}
              />
            ) : (
              <TapToEditContainer edit={() => setEditing(true)}>
                <CompletedComponent data={+eventData?.[id]} />
              </TapToEditContainer>
            )}
          </Row>
        </React.Fragment>
      );
    default:
      return (
        <React.Fragment key={id}>
          <Modal animationType="fade" transparent={true} visible={editing}>
            <EditingComponent
              id={id}
              setModalVisible={setEditing}
              questionText={questionText}
            />
          </Modal>
          <Row valid={!!eventData?.[id]} fieldName={fieldName}>
            {!eventData?.[id] ? (
              <InitialButton
                onPress={() => setEditing(true)}
                fieldName={fieldName}
              />
            ) : (
              <TapToEditContainer edit={() => setEditing(true)}>
                <CompletedComponent data={eventData?.[id]} />
              </TapToEditContainer>
            )}
          </Row>
        </React.Fragment>
      );
  }
};
