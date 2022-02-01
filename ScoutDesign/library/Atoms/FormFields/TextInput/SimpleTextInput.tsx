import TextInputBase, { TextInputProps } from "./TextInputBase";

type Props = TextInputProps;

const SimpleTextInput = ({ disabled, error, noStyles, ...props }: Props) => {
  return (
    <TextInputBase
      borderWidth={disabled || error ? 2 : noStyles ? undefined : 0.5}
      borderColor={disabled ? "mediumGrey" : error ? "danger" : "mintGrey"}
      borderRadius={noStyles ? undefined : 7}
      noStyles={noStyles}
      {...props}
    />
  );
};

export default SimpleTextInput;
