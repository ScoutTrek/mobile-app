import Slider from '../formfields/Slider';
import {useEffect, useState} from 'react';
import {eventData} from '../../../App';
import BasicLineItem from './components/BasicLineItem';
import DefaultInputButton from './components/DefaultInputButton';
import {EventInputProps} from './EventInputTypes';

const ChooseDistance = ({
  id,
  Modal,
  modalProps,
  questionText,
}: EventInputProps) => {
  const [distance, setDistance] = useState(eventData()?.[id] || 1);
  const [valid, setValid] = useState(!!eventData()?.[id] || false);

  useEffect(() => {
    if (distance) {
      setValid(true);
    }
  }, [distance]);

  const nextForm = () => {
    if (valid) {
      eventData({
        ...eventData(),
        [id]: distance,
      });
    }
  };

  return (
    <Modal title={questionText} {...modalProps} onNext={nextForm} valid={valid}>
      <Slider distance={distance} setDistance={setDistance} min={1} max={30} />
    </Modal>
  );
};

export default {
  InitialButton: DefaultInputButton,
  EditingComponent: ChooseDistance,
  CompletedComponent: BasicLineItem,
};
