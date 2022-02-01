import React from "react";
import { Pressable, Box, StandardRadius, Color } from "../../Atoms/utility";
import {
  FormFieldProps,
  InputFieldStates,
} from "../../Atoms/FormFields/formTypes";

import { IconPayload } from "../../../icons";

export interface StackableProps {
  key?: string;
  stackRadius?: StandardRadius;
  isStackTop?: boolean;
  isStackBottom?: boolean;
}

interface StackItemSchema extends InputFieldStates {
  id: string;
  text: string;
  icon?: IconPayload;
  onPress?: () => void;
  updateText?: () => void;
}

interface EveryStackItemProps extends FormFieldProps {
  textColor?: Color;
  leftComponent?: React.ReactNode;
  placeholderColor?: Color;
  onPress?: () => void;
}

type StackProps = {
  accessibilityLabel: string;
  borderColor?: Color;
  backgroundColor?: Color;
  radius: StandardRadius | "none";
  RenderItem: React.ElementType;
  type: "Pressable" | "FormField";
  everyItemProps: EveryStackItemProps;
  items: StackItemSchema[];
};

const Stack = ({
  accessibilityLabel,
  borderColor = "mintGrey",
  backgroundColor = "white",
  radius,
  RenderItem,
  items,
  everyItemProps,
}: StackProps) => {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      borderWidth={1}
      borderColor={borderColor}
      radius={radius === "none" ? undefined : radius}
    >
      {items.map((item: StackItemSchema, index: number) => {
        const firstItem = index === 0;
        const lastItem = index === items.length - 1;
        return (
          <React.Fragment key={item.id}>
            {!firstItem && !item.disabled && !item?.error && (
              <Box backgroundColor={backgroundColor} height={1}>
                <Box
                  flex={1}
                  marginHorizontal="l"
                  backgroundColor={borderColor}
                />
              </Box>
            )}
            <RenderItem
              backgroundColor={backgroundColor}
              stackRadius={radius === "none" ? undefined : radius}
              isStackTop={firstItem}
              isStackBottom={lastItem}
              item={item}
              {...everyItemProps}
            />
          </React.Fragment>
        );
      })}
    </Pressable>
  );
};

export default Stack;
