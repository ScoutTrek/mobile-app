import React, {useState} from 'react';
import {eventData} from '../../../App';
import {Dimensions, Keyboard, Text, TouchableOpacity, View} from 'react-native';
import NextButton from '../buttons/NextButton';
import {LinearGradient} from 'expo-linear-gradient';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import RichInputContainer from '../containers/RichInputContainer';
import RTE from '../RichTextEditor';
import PreviewTextBlock from '../PreviewTextBlock';
import InputModalContainer from '../containers/InputModalContainer';

const DescriptionInputButton = ({fieldName, onPress}) => {
  return (
    <View
      style={{
        marginHorizontal: 4,
        flex: 1,
      }}>
      <Text
        style={{
          fontFamily: Fonts.headingBold,
          fontSize: 14,
          paddingTop: 7,
          paddingBottom: 5,
          paddingHorizontal: 7,
          color: Colors.darkGreen,
        }}>
        {fieldName.toUpperCase()}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderBottomWidth: 2,
          fontSize: 15,
          borderColor: Colors.green,
          marginVertical: 10,
          borderRadius: 1,
        }}>
        <LinearGradient
          colors={['rgba(104, 237, 180, 0.045)', 'rgba(23, 161, 101, 0.075)']}
          start={{x: 0.6, y: 0}}
          end={{x: 0.55, y: 1}}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: Fonts.primaryText,
              lineHeight: 25,
              fontSize: 18,
              paddingVertical: 18,
              paddingHorizontal: 12,
              color: Colors.darkGreen,
            }}>
            Add a description or any additional info...
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const DescriptionInput = ({id, Modal, modalProps, questionText}) => {
  const [description, setDescription] = useState(
    eventData()?.description || ''
  );

  const nextForm = () => {
    eventData({
      ...eventData(),
      [id]: description,
    });
    setModalVisible(false);
  };

  return (
    <Modal {...modalProps} title={questionText} onNext={nextForm}>
      <RTE
        description={description}
        setDescription={setDescription}
        fullHeight
      />
    </Modal>
  );
};

export default {
  InitialButton: DescriptionInputButton,
  EditingComponent: DescriptionInput,
  CompletedComponent: PreviewTextBlock,
};
