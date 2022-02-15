import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {Theme} from '../../../theme';
import Constants from 'expo-constants';
import {BackButton, DismissButton} from 'ScoutDesign/library';
import Container from './Container';
import {Color, Spacing} from '../types';

import {
  SpacingProps,
  LayoutProps,
  PositionProps,
  BorderProps,
  BackgroundColorProps,
  ShadowProps,
} from '@shopify/restyle';

type ScreenProps = {
  background?: Color;
  padding?: Spacing;
  icon?: 'back' | 'close';
  back?: () => void;
  children: any;
};

type Props = SpacingProps<Theme> &
  LayoutProps<Theme> &
  PositionProps<Theme> &
  ShadowProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  ScreenProps;

const ScreenContainer = ({
  background = 'white',
  padding = 's',
  back,
  icon,
  children,
  ...rest
}: Props) => (
  <KeyboardAvoidingView
    behavior="padding"
    enabled={Platform.OS === 'ios'}
    keyboardVerticalOffset={0}
    style={{
      flex: 1,
    }}>
    <Container
      flex={1}
      paddingVertical="none"
      paddingHorizontal={padding}
      backgroundColor={background}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{paddingTop: Constants.statusBarHeight}}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always">
        {icon === 'back' ? (
          <BackButton
            corner="top-left"
            distanceFromCorner="s"
            onDismiss={back}
          />
        ) : icon === 'close' ? (
          <DismissButton
            corner="top-right"
            distanceFromCorner="s"
            onDismiss={back}
          />
        ) : null}
        <Container padding="none" flex={1} marginTop="s" {...rest}>
          {children}
        </Container>
      </ScrollView>
    </Container>
  </KeyboardAvoidingView>
);

export default ScreenContainer;
