import ButtonBase, {ButtonProps} from './ButtonBase';

import {StackableProps} from '../../../Widgets/Stack/Stack';

type Props = ButtonProps &
  StackableProps & {
    text: string;
    fullWidth?: boolean;
  };

const Button = ({
  fullWidth,
  isStackBottom,
  isStackTop,
  stackRadius,
  ...rest
}: Props) => {
  return (
    <ButtonBase
      alignSelf={fullWidth ? undefined : 'flex-start'}
      paddingVertical="s"
      paddingHorizontal="l"
      borderRadius={stackRadius ? undefined : 'xl'}
      topRightRadius={isStackTop ? stackRadius : undefined}
      topLeftRadius={isStackTop ? stackRadius : undefined}
      bottomRightRadius={isStackBottom ? stackRadius : undefined}
      bottomLeftRadius={isStackBottom ? stackRadius : undefined}
      iconPadding="s"
      iconSize="xs"
      {...rest}
    />
  );
};

export default Button;
