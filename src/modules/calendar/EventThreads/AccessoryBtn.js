import {MaterialIcons} from '@expo/vector-icons';
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {getLocationAsync, pickImageAsync, takePictureAsync} from './mediaUtils';
import {useMutation} from '@apollo/react-hooks';
import {gql} from '@apollo/client';

const SINGLE_UPLOAD_MUTATION = gql`
  mutation UploadImage($file: Upload!) {
    file: uploadImage(file: $file)
  }
`;

export default function AccessoryBar({onSend, isTyping}) {
  const [uploadFileMutation, {data}] = useMutation(SINGLE_UPLOAD_MUTATION, {
    onCompleted({file}) {
      onSend([{text: '', image: file}]);
    },
  });

  return (
    <View style={styles.container}>
      <Button onPress={() => pickImageAsync(uploadFileMutation)} name="photo" />
      <Button
        onPress={() => takePictureAsync(uploadFileMutation)}
        name="camera"
      />
    </View>
  );
}

const Button = ({onPress, size = 30, color = 'rgba(0,0,0,0.5)', ...props}) => (
  <TouchableOpacity onPress={onPress}>
    <MaterialIcons size={size} color={color} {...props} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
});
