import React from "react";

import ButtonBase, { ButtonProps } from "./ButtonBase";

type Props = ButtonProps & {
  text: string;
  fullWidth?: boolean;
};

const Button = ({ fullWidth, ...rest }: Props) => {
  return (
    <ButtonBase
      alignSelf={fullWidth ? undefined : "flex-start"}
      paddingVertical="s"
      paddingHorizontal="l"
      borderRadius="xl"
      iconPadding="m"
      iconSize="xs"
      {...rest}
    />
  );
};

export default Button;
