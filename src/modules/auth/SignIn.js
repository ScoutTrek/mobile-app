import React, {useReducer, useEffect, useState} from 'react';
import {
  Button,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
  AsyncStorage,
  Platform,
} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';
import InlineButton from '../../components/buttons/InlineButton';
import AuthInput from './components/Input';

import {gql} from '@apollo/client';
import {useApolloClient, useMutation} from '@apollo/react-hooks';
import {GET_TOKEN} from './JoinPatrol';
import Footer from './components/Footer';

const formReducer = (state, action) => {
  if (action.type === 'UPDATE_INPUT_FIELD') {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    return {
      inputValues: updatedValues,
    };
  }
};

const LOG_IN = gql`
  mutation Login($userInfo: LoginInput!) {
    login(input: $userInfo) {
      token
    }
  }
`;

const SignIn = ({navigation}) => {
  const [secure, setSecure] = useState(false);
  const [logIn, {data, loading}] = useMutation(LOG_IN);
  const client = useApolloClient();

  const [formState, dispatchFormChange] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = async () => {
    await logIn({
      variables: {
        userInfo: {
          email: formState.inputValues.email,
          password: formState.inputValues.password,
          expoNotificationToken: '',
        },
      },
    }).catch((error) => console.log('An error', error));
  };

  const handleInputChange = (inputIdentifier, value) =>
    dispatchFormChange({
      type: 'UPDATE_INPUT_FIELD',
      value: value,
      input: inputIdentifier,
    });

  useEffect(() => {
    const setToken = async () => {
      try {
        await AsyncStorage.setItem('userToken', data.login.token);
        await client.writeQuery({
          query: GET_TOKEN,
          data: {userToken: data.login.token},
        });
      } catch (e) {
        console.log(e);
      }
    };
    if (data) {
      setToken();
    }
  });

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
        style={styles.gradientOverlay}
      />
      <Image
        style={styles.jumboImage}
        source={{
          uri:
            'https://res.cloudinary.com/wow-your-client/image/upload/v1581455286/ScoutTrek/adventure-alps-backpack_2x.png',
        }}
      />

      <View style={styles.main}>
        <View>
          <Text style={styles.heading}>Welcome back to ScoutTrek</Text>
          <Text style={styles.text}>
            Your personal assistant for all the Scouting activities you already
            do.
          </Text>
          <AuthInput
            autoCapitalize="none"
            onInputChange={(value) => handleInputChange('email', value)}
            placeholder="email"
            autoCompleteType="email"
          />
          <AuthInput
            autoCapitalize="none"
            onFocus={() => setSecure(true)}
            onInputChange={(value) => handleInputChange('password', value)}
            placeholder="password"
            textContentType="none"
            autoCompleteType="off"
            secureTextEntry={secure}
            blurOnSubmit={false}
            autoComplete={false}
          />

          <GradientButton
            title={loading ? `Loading...` : `Log In`}
            onPress={handleSignIn}
          />
        </View>
      </View>
      <Footer
        footerText="Don&rsquo;t have an account?"
        btnType="Sign Up Now"
        onPress={() => navigation.navigate('SignUp')}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  heading: {
    fontSize: 25,
    fontFamily: 'oxygen-bold',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    zIndex: 1,
    color: '#382B14',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'oxygen',
    padding: 22,
    color: '#382B14',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: Dimensions.get('window').height * 0.62,
  },
  jumboImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: Dimensions.get('window').height * 0.62,
    zIndex: -1,
  },
  main: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontSize: 10,
    marginBottom: 12,
  },
  footerText: {
    fontFamily: 'oxygen',
    color: '#241C0D',
    fontSize: 14,
  },
});

export default SignIn;
