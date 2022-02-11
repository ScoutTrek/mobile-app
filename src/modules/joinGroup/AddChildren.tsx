import {useState} from 'react';
import {Button, Container, Text} from 'ScoutDesign/library';
import AddItemForm from './components/AddItemForm';
import RichInputContainer from '../../components/containers/RichInputContainer';

const AddChildren = ({route, navigation}) => {
  const [childName, setChildName] = useState('');
  const [children, setChildren] = useState([]);
  const [childNameIsValid, setChildNameIsValid] = useState(false);

  const nextForm = () => {
    let signUpData;
    signUpData = {
      ...route.params,
      children,
    };
    delete signUpData.nextView;
    navigation.navigate(route.params.nextView, signUpData);
  };

  return (
    <RichInputContainer icon="back" back={navigation.goBack}>
      <AddItemForm
        value={childName}
        setValue={setChildName}
        isValid={childNameIsValid}
        setIsValid={setChildNameIsValid}
        onPress={() => {
          setChildName('');
          setChildren([...children, childName]);
        }}
        heading="Please add the names of the Scouts who belong to you."
        placeholder="First & Last Name"
      />
      {!!children.length && (
        <Container>
          <Text preset="h2" paddingBottom="s">
            Your Scouts
          </Text>
          {children.map((child) => (
            <Text key={child} padding="xs" weight="bold">
              {child}
            </Text>
          ))}
        </Container>
      )}
      <Container>
        <Button
          accessibilityLabel="next-join-patrol"
          onPress={nextForm}
          text="Done"
          fullWidth
        />
      </Container>
    </RichInputContainer>
  );
};

export default AddChildren;
