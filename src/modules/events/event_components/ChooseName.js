import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {makeVar} from '@apollo/client';

import NextButton from '../../../components/buttons/NextButton';
import Input from '../../../components/formfields/Input';
import RichInputContainer from '../../../components/containers/RichInputContainer';

export const eventData = makeVar({});

const ChooseName = ({navigation, route}) => {
  const {nextView} = route.params;
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(false);

  const back = () => navigation.popToTop();
  const nextForm = () => {
    if (nameIsValid) {
      eventData({
        name: {
          title: 'Name',
          value: name,
          view: route.name,
          type: 'name',
        },
      });
      navigation.navigate(route.params.edit ? 'ConfirmEventDetails' : nextView);
    }
  };

  return (
    <RichInputContainer icon="back" back={back}>
      <View
        style={{
          padding: 15,
          height: Dimensions.get('window').height * 0.5,
        }}>
        <View style={styles.input}>
          <Input
            value={name}
            autoCompleteType="off"
            autoFocus={false}
            autoCorrect={false}
            onChangeText={(value) => {
              setName(value);
              if (name.length > 2) {
                setNameIsValid(true);
              } else {
                setNameIsValid(false);
              }
            }}
            heading={route.params.placeholder}
          />
        </View>
        {nameIsValid && (
          <NextButton
            text="Choose Location"
            iconName="ios-arrow-round-forward"
            onClick={nextForm}
          />
        )}
      </View>
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexDirection: 'row',
    marginTop: Dimensions.get('window').height / 10,
  },
});

export default ChooseName;
