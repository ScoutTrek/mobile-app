import {useState} from 'react';
import {Button, Stack, Text, Container} from 'ScoutDesign/library';
import RichInputContainer from '../../components/containers/RichInputContainer';
import {convertRoleToText} from '../../data/utils/convertIDsToStrings';

const ROLES = [
  'SCOUTMASTER',
  'ASST_SCOUTMASTER',
  'SENIOR_PATROL_LEADER',
  'PATROL_LEADER',
  'SCOUT',
  'PARENT',
  'ADULT_VOLUNTEER',
];

const ChooseRole = ({navigation, route}) => {
  const nextForm = (role: string) => {
    let signUpData;
    if (role === 'PARENT') {
      signUpData = {
        ...route.params,
        role,
      };
    } else {
      signUpData = {
        ...route.params,
        role,
      };
    }
    delete signUpData.nextView;
    navigation.navigate(route.params.nextView, signUpData);
  };

  return (
    <RichInputContainer icon="back" back={navigation.goBack}>
      <Container>
        <Text preset="h2" textAlign="center" padding="m">
          What is your role within the Troop?
        </Text>
        <Stack
          accessibilityLabel="test-stack"
          radius="l"
          items={ROLES.map((role) => ({
            id: role,
            text: convertRoleToText(role),
          }))}
          everyItemProps={{
            fullWidth: true,
            paddingVertical: 'm',
          }}
          RenderItem={({item, ...rest}) => {
            return (
              <Button
                accessibilityLabel={item.id}
                onPress={() => nextForm(item.id)}
                text={item.text}
                {...rest}
              />
            );
          }}
        />
      </Container>
    </RichInputContainer>
  );
};

export default ChooseRole;
