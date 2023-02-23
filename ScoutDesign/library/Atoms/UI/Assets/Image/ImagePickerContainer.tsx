import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import Text from '../../Text/Text';
import { Container, Pressable, Floatable } from '../../../utility';

import uuidv4 from 'uuid/v1';

import { pencil } from 'ScoutDesign/icons';
import Badge from '../../Badge/Badge';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScoutTrekApolloClient, { apiBaseUri } from 'data/ScoutTrekClient';
import { GET_CURR_USER } from 'data';

import {
  LOCAL_IP_ADDRESS,
  ENV,
  DEV_URL,
  PROD_URL,
} from '@env';


function buildUploadBody(fileName: string, uri: string) {
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  const data = new FormData();

  const file = {
    uri,
    name: `${uuidv4()}.${fileType}`,
    type: 'image/png', // Customize later
  };

  data.append(fileName, file as unknown as Blob);

  return data;
}

type Props = {
  children: any;
  loading?: boolean;
  error?: any;
  uploadImage: (apolloVariables: any) => Promise<any>;
};

const ImagePickerContainer = ({
  children,
  loading,
  error,
  uploadImage,
}: Props) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const resizedPhoto = await manipulateAsync(
        result.uri,
        [{ resize: { width: 300 } }],
        { compress: 0.7, format: SaveFormat.PNG }
      );
      const data = buildUploadBody('photo', resizedPhoto.uri);
      // await uploadImage({ variables: { file } });
      console.log(apiBaseUri + "/upload");
      fetch(apiBaseUri + "/upload", {
        method: 'POST',
        body: data,
        headers: {
          "Authorization": "Bearer " + await AsyncStorage.getItem("userToken")
        }
      }).then(async (resp) => {
        const json = await resp.json();
        const cache = ScoutTrekApolloClient.cache;
        const { currUser } = cache.readQuery({ query: GET_CURR_USER });
        cache.modify({
          fields: {
            currUser() {
              return { ...currUser, userPhoto: json.url };
            },
          },
        });
      }).catch((e) => {
        console.error(e);
      });
      return;
    }
  };

  if (error) {
    console.error('Error uploading image', error);
    return null;
  }

  if (loading) {
    return (
      <Container
        size="xl"
        radius="circle"
        justifyContent="center"
        alignItems="center"
        backgroundColor="brandSecondaryLight">
        <Text weight="light" color="darkGrey">
          Loading...
        </Text>
      </Container>
    );
  }

  return (
    <Pressable
      accessibilityLabel="image-picker"
      justifyContent="center"
      alignItems="center"
      onPress={pickImage}>
      {children}
      <Floatable corner="bottom-right" distanceFromCorner="edge">
        <Badge
          accessibilityLabel="change-image"
          icon={pencil}
          color="white"
          text="Change"
        />
      </Floatable>
    </Pressable>
  );
};

export default ImagePickerContainer;
