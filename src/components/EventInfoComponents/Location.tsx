import {StyleSheet, View} from 'react-native';

import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import InfoRowSmall from '../LayoutComponents/InfoRowSmall';
import {Text, Icon, Container} from 'ScoutDesign/library';
import {mapMarker} from 'ScoutDesign/icons';

const Location = ({heading, address}) => {
  return (
    <Container paddingVertical="s">
      <Text preset="sublabel-light">{heading}</Text>
      <Container
        paddingHorizontal="none"
        paddingVertical="s"
        flexDirection="row">
        <Icon
          size="m"
          icon={mapMarker}
          color="interactiveDark"
          paddingHorizontal="micro"
        />
        <Text size="s" weight="bold" paddingHorizontal="s">
          {address}
        </Text>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  titleSmall: {
    fontFamily: Fonts.headingBold,
  },
  addressText: {
    fontSize: 18,
    fontFamily: Fonts.headingBold,
    color: Colors.blue,
  },
  icon: {
    paddingTop: 3,
    paddingRight: 15,
  },
});

export default Location;
