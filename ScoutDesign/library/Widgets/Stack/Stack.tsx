import React from 'react';
import {Container, Box, StandardRadius, Color} from '../../Atoms/utility';
import {
  FormFieldProps,
  InputFieldStates,
} from '../../Atoms/FormFields/formTypes';

import {IconPayload} from '../../../icons';

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
  backgroundColor?: Color;
  leftComponent?: React.ReactNode;
  placeholderColor?: Color;
  onPress?: () => void;
}

type StackProps = {
  accessibilityLabel: string;
  borderColor?: Color;
  backgroundColor?: Color;
  radius?: StandardRadius;
  RenderItem: React.ElementType;
  everyItemProps: EveryStackItemProps;
  items: StackItemSchema[];
  HeaderComponent?: React.FC<any>;
  FooterComponent?: React.FC<any>;
};

const Stack = ({
  accessibilityLabel,
  borderColor = 'mintGrey',
  backgroundColor = 'white',
  radius,
  RenderItem,
  items,
  everyItemProps,
  HeaderComponent,
  FooterComponent,
}: StackProps) => {
  return (
    <>
      <Container
        accessibilityLabel={accessibilityLabel}
        borderWidth={1}
        borderColor={borderColor}
        borderTopWidth={HeaderComponent ? 0 : undefined}
        borderBottomWidth={FooterComponent ? 0 : undefined}
        backgroundColor={backgroundColor}
        topLeftRadius={HeaderComponent ? undefined : radius}
        topRightRadius={HeaderComponent ? undefined : radius}
        bottomLeftRadius={FooterComponent ? undefined : radius}
        bottomRightRadius={FooterComponent ? undefined : radius}>
        {HeaderComponent ? (
          <HeaderComponent
            isStackTop
            stackRadius={radius}
            paddingVertical="m"
          />
        ) : null}
        {items.map((item: StackItemSchema, index: number) => {
          const firstItem = index === 0 && !HeaderComponent;
          const lastItem = index === items.length - 1 && !FooterComponent;
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
                stackRadius={radius}
                isStackTop={firstItem}
                isStackBottom={lastItem}
                item={item}
                {...everyItemProps}
              />
            </React.Fragment>
          );
        })}
      </Container>
      {FooterComponent ? (
        <FooterComponent isStackBottom stackRadius={radius} />
      ) : null}
    </>
  );
};

export default Stack;
