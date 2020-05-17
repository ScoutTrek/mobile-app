import React from 'react';
import {Modal, TouchableWithoutFeedback, View} from 'react-native';

const CalModal = (props) => {
  return (
    <Modal
      presentationStyle="overFullScreen"
      transparent={true}
      visible={props.show}>
      <TouchableWithoutFeedback onPress={props.setShow}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <View
            style={{
              width: '88%',
              borderRadius: 8,
              padding: 7,
              backgroundColor: '#fff',
              overflow: 'hidden',
            }}>
            {props.children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalModal;
