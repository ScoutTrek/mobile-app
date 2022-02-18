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
import {StackableProps} from '../../../Widgets/Stack/Stack';

type Props = SpacingProps<Theme> &
  LayoutProps<Theme> &
  PositionProps<Theme> &
  ShadowProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  RadiusProps &
  StackableProps & {
    accessibilityLabel?: string;
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
  isStackTop,
  isStackBottom,
  stackRadius,
  padding = 'm',
  ...rest
}: Props) => {
  return (
    <Box
      {...rest}
      key={key}
      padding={padding}
      borderRadius={mapRadius(radius)}
      borderTopLeftRadius={
        isStackTop ? mapRadius(stackRadius) : mapRadius(topLeftRadius)
      }
      borderTopRightRadius={
        isStackTop ? mapRadius(stackRadius) : mapRadius(topRightRadius)
      }
      borderBottomLeftRadius={
        isStackBottom ? mapRadius(stackRadius) : mapRadius(bottomLeftRadius)
      }
      borderBottomRightRadius={
        isStackBottom ? mapRadius(stackRadius) : mapRadius(bottomRightRadius)
      }
      testID={accessibilityLabel}
      nativeID={accessibilityLabel}>
      {children}
    </Box>
  );
};

export default Container;
