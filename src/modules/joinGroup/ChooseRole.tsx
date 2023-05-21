import { StackScreenProps } from '@react-navigation/stack';
import {
  Button,
  Stack,
  Text,
  Container,
  ScreenContainer,
} from 'ScoutDesign/library';
import { convertRoleToText } from '../../data/utils/convertIDsToStrings';
import JoinGroupParamList from '../navigation/param_list/joinGroup';
import {
  chooseRole,
  useJoinGroupForm,
} from './JoinGroupForm/JoinGroupFormStore';
import RouteNames from '../navigation/route_names/joinGroup';

const ROLES = [
  'SCOUTMASTER',
  'ASST_SCOUTMASTER',
  'SENIOR_PATROL_LEADER',
  'PATROL_LEADER',
  'SCOUT',
  'PARENT',
  'ADULT_VOLUNTEER',
];

const ChooseRole = ({
  navigation,
}: StackScreenProps<JoinGroupParamList>) => {
  const [_, dispatch] = useJoinGroupForm() || [null, null];
  const nextForm = (role: string) => {
    dispatch && dispatch(chooseRole(role));
    if (role === 'PARENT') {
      navigation.navigate(RouteNames.addChildren.toString());
    } else {
      navigation.navigate(RouteNames.joinPatrol.toString());
    }
  };

  return (
    <ScreenContainer>
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
          RenderItem={({ item, ...rest }) => {
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
    </ScreenContainer>
  );
};

export default ChooseRole;
