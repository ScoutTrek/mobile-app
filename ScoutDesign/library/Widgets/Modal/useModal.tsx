import {useState, useCallback} from 'react';
import Modal, {ModalProps} from './Modal';

export function useModal(): UseModalResult {
  let [visible, setVisible] = useState(false);
  let openModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  let escape = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  let modalProps = {
    visible,
    escape: escape,
    openModal,
  };

  return {
    visible,
    openModal,
    escape,
    modalProps,
    Modal: MyModal,
  };
}

export const MyModal = ({children, ...modalProps}: ModalProps) => {
  return <Modal {...modalProps}>{children}</Modal>;
};
export interface UseModalResult {
  visible: boolean;
  openModal: () => void;
  escape: () => void;
  modalProps: ModalProps;
  Modal?: typeof MyModal;
}
