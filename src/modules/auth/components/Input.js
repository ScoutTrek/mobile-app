import React, {useState, useEffect} from 'react';
import {StyleSheet, TextInput} from 'react-native';

const AuthInput = ({placeholder, onInputChange, ...props}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    onInputChange(value);
  }, [value]);

  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholder={placeholder}
      {...props}
      placeholderTextColor="#382B14"
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 0.5,
    fontSize: 15,
    borderColor: '#241C0D',
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginVertical: 5,
  },
});

export default AuthInput;
