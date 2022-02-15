import moment from 'moment';
import {Text, Icon, Container} from 'ScoutDesign/library';
import {clock} from 'ScoutDesign/icons';

const Time = ({time, heading}) => {
  return (
    <Container paddingVertical="s">
      <Text preset="sublabel-light">{heading}</Text>

      <Container padding="none" flexDirection="row" alignItems="center">
        <Icon icon={clock} size="m" color="brandSecondaryDark" />
        <Text weight="bold" paddingHorizontal="s">
          {moment(time).format('hh:mm A')}
        </Text>
      </Container>
    </Container>
  );
};

export default Time;
