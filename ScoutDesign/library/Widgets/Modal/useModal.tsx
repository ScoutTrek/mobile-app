import React, { useState, useCallback } from "react";
import Modal, { ModalProps } from "./Modal";

export interface ModalOptions {
  onNext?: () => void;
}

export function useModal({ onNext }: ModalOptions): UseModalResult {
  let [visible, setVisible] = useState(false);
  let openModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  let escape = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  let next = onNext
    ? useCallback(() => {
        onNext();
        setVisible(false);
      }, [setVisible])
    : undefined;

  let modalProps = {
    visible,
    onEscape: escape,
    onNext: next,
    openModal,
  };

  return {
    visible,
    openModal,
    escape,
    next,
    modalProps,
    Modal: MyModal,
  };
}

export const MyModal = ({ children, ...modalProps }: ModalProps) => {
  return <Modal {...modalProps}>{children}</Modal>;
};
export interface UseModalResult {
  visible: boolean;
  openModal: () => void;
  escape: () => void;
  next?: () => void;
  modalProps: ModalProps;
  Modal?: any;
}
