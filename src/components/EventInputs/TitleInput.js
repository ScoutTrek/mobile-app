import {useState} from 'react';
import {eventData} from '../../../App';
import BasicLineItem from '../BasicLineItem';
import {Button, ColorfulTextInput} from 'ScoutDesign/library';
import {plusBold} from 'ScoutDesign/icons';

const TitleInputButton = ({fieldName, onPress}) => {
  return (
    <Button
      accessibilityLabel="add-title"
      icon={plusBold}
      backgroundColor="gradient"
      text={fieldName}
      onPress={onPress}
    />
  );
};

const ChooseName = ({id, Modal, modalProps, questionText}) => {
  const [title, setTitle] = useState(eventData()?.[id] || '');
  const [nameIsValid, setNameIsValid] = useState(!!eventData()?.[id] || false);

  const nextForm = () => {
    if (nameIsValid) {
      eventData({
        ...eventData(),
        [id]: title,
      });
    }
  };

  return (
    <Modal
      onNext={nextForm}
      {...modalProps}
      title={questionText}
      valid={nameIsValid}>
      <ColorfulTextInput
        value={title}
        autoCompleteType="off"
        autoCorrect={false}
        onValueChange={(value) => {
          setTitle(value);
          setNameIsValid(title.length > 2);
        }}
      />
    </Modal>
  );
};

export default {
  InitialButton: TitleInputButton,
  EditingComponent: ChooseName,
  CompletedComponent: BasicLineItem,
};
