import {useState} from 'react';
import {eventData} from '../../../App';
import BasicLineItem from './components/BasicLineItem';
import {ColorfulTextInput} from 'ScoutDesign/library';
import {EventInputProps} from './EventInputTypes';
import DefaultInputButton from './components/DefaultInputButton';

const ChooseName = ({id, Modal, modalProps, questionText}: EventInputProps) => {
  const [title, setTitle] = useState(eventData()?.[id] || '');
  const [nameIsValid, setNameIsValid] = useState(!!eventData()?.[id] || false);

  const next = () => {
    if (nameIsValid) {
      eventData({
        ...eventData(),
        [id]: title,
      });
    }
  };

  return (
    <Modal
      {...modalProps}
      onNext={next}
      title={questionText}
      valid={nameIsValid}>
      <ColorfulTextInput
        value={title}
        autoCompleteType="off"
        autoCorrect={false}
        onValueChange={(value) => {
          if (typeof value === 'number') {
            value = value.toString();
          }
          setTitle(value);
          setNameIsValid(value.length > 2);
        }}
      />
    </Modal>
  );
};

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseName,
  CompletedComponent: BasicLineItem,
};
