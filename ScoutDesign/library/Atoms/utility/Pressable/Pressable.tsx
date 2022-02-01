import {
  Pressable as RNPressable,
  View,
  GestureResponderEvent,
} from "react-native";
import { Theme } from "../../../theme";
import Box from "../Box/Box";
import { RadiusProps } from "../types";
import { mapRadius } from "../Asset/Asset";
import {
  useRestyle,
  spacing,
  border,
  layout,
  position,
  backgroundColor,
  SpacingProps,
  LayoutProps,
  PositionProps,
  BorderProps,
  BackgroundColorProps,
  ShadowProps,
} from "@shopify/restyle";

export interface PressableProps extends RadiusProps {
  disabled?: boolean;
  disabledStyle?: any;
  onPress?: (nativeEvent: GestureResponderEvent) => void;
  onLongPress?: (nativeEvent: GestureResponderEvent) => void;
  sideEffect?: () => void;
}

const restyleFunctions = [spacing, layout, position, border, backgroundColor];

type Props = SpacingProps<Theme> &
  LayoutProps<Theme> &
  PositionProps<Theme> &
  ShadowProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  PressableProps & {
    accessibilityLabel: string;
    key?: string;
    children: any;
  };

const PressableBase = ({
  accessibilityLabel,
  key,
  disabled = false,
  onPress,
  onLongPress,
  sideEffect,
  topLeftRadius,
  topRightRadius,
  bottomRightRadius,
  bottomLeftRadius,
  radius,
  children,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  if (!onPress && !onLongPress && !sideEffect) {
    return (
      <Box
        {...rest}
        key={key}
        testID={accessibilityLabel}
        nativeID={accessibilityLabel}
      >
        {children}
      </Box>
    );
  }

  return (
    <RNPressable
      key={key}
      onPress={sideEffect || onPress}
      onLongPress={onLongPress}
      hitSlop={8}
      disabled={disabled}
      testID={accessibilityLabel}
      nativeID={accessibilityLabel}
      style={({ pressed }: { pressed: boolean }) => [
        disabled ? { backgroundColor: "#ccc" } : undefined,
        { opacity: pressed && !sideEffect ? 0.4 : 1 },
      ]}
    >
      {({ pressed }) => <View {...props}>{children}</View>}
    </RNPressable>
  );
};

const Pressable = (props: Props) => {
  return (
    <PressableBase
      borderTopLeftRadius={mapRadius(props?.topLeftRadius)}
      borderTopRightRadius={mapRadius(props?.topRightRadius)}
      borderBottomLeftRadius={mapRadius(props?.bottomLeftRadius)}
      borderBottomRightRadius={mapRadius(props?.bottomRightRadius)}
      borderRadius={mapRadius(props?.radius)}
      {...props}
    >
      {props.children}
    </PressableBase>
  );
};

export default Pressable;
