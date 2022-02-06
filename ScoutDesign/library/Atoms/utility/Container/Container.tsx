import {Theme} from '../../../theme';
import Box from '../Box/Box';
import {RadiusProps} from '../types';
import {mapRadius} from '../Asset/Asset';
import {
  SpacingProps,
  LayoutProps,
  PositionProps,
  BorderProps,
  BackgroundColorProps,
  ShadowProps,
} from '@shopify/restyle';

type Props = SpacingProps<Theme> &
  LayoutProps<Theme> &
  PositionProps<Theme> &
  ShadowProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  RadiusProps & {
    accessibilityLabel: string;
    key?: string;
    children: any;
  };

const Container = ({
  accessibilityLabel,
  key,
  topLeftRadius,
  topRightRadius,
  bottomRightRadius,
  bottomLeftRadius,
  radius,
  children,
  ...rest
}: Props) => {
  return (
    <Box
      {...rest}
      key={key}
      borderTopLeftRadius={mapRadius(topLeftRadius)}
      borderTopRightRadius={mapRadius(topRightRadius)}
      borderBottomLeftRadius={mapRadius(bottomLeftRadius)}
      borderBottomRightRadius={mapRadius(bottomRightRadius)}
      borderRadius={mapRadius(radius)}
      testID={accessibilityLabel}
      nativeID={accessibilityLabel}>
      {children}
    </Box>
  );
};

export default Container;
