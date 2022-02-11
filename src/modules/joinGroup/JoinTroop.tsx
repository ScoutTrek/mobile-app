import {StyleSheet} from 'react-native';
import {gql, useQuery} from '@apollo/client';
import {Container, Text, Button, Stack} from 'ScoutDesign/library';
import {plusBold} from 'ScoutDesign/icons';
import RichInputContainer from '../../components/containers/RichInputContainer';

const GET_TROOPS = gql`
  query GetTroops {
    troops {
      id
      unitNumber
      council
      state
    }
  }
`;

const JoinTroop = ({navigation, route}) => {
  const {data, error, loading} = useQuery(GET_TROOPS, {
    fetchPolicy: 'network-only',
  });

  const nextForm = (troopID: string, troopNum: string) => {
    const signUpData = {
      ...route.params,
      troopID,
      troopNum,
    };
    delete signUpData.nextView;
    navigation.navigate(route.params.nextView, {...signUpData});
  };

  if (loading) return null;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  return (
    <RichInputContainer icon="back" back={navigation.goBack}>
      <Container>
        <Text preset="h2" textAlign="center" padding="m">
          What Group are you in?
        </Text>
        <Stack
          accessibilityLabel="test-stack"
          radius="l"
          items={data.troops}
          everyItemProps={{
            fullWidth: true,
            justifyContent: 'flex-start',
            paddingVertical: 'm',
          }}
          RenderItem={({item, ...rest}) => {
            return (
              <Button
                accessibilityLabel={item.id}
                onPress={() => nextForm(item.id, item.unitNumber)}
                text={`Troop ${item.unitNumber} of ${item.council} council`}
                {...rest}
              />
            );
          }}
        />

        <Text paddingTop="xl" paddingBottom="s" paddingHorizontal="xs">
          Please select a Troop or add one below
        </Text>
        <Button
          accessibilityLabel="create-new-troop"
          text="Create Troop"
          backgroundColor="brandSecondary"
          icon={plusBold}
          onPress={() => {
            const signUpData = {...route.params};
            delete signUpData.nextView;
            navigation.navigate('CreateTroop', signUpData);
          }}
        />
      </Container>
    </RichInputContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  btnContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    width: '100%',
    marginVertical: 20,
  },
  check: {
    position: 'absolute',
    top: 5,
    left: 15,
    color: '#fff',
  },
});

export default JoinTroop;
