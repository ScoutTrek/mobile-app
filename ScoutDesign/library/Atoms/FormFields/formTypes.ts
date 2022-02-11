export interface InputFieldStates {
  disabled?: boolean;
  valid?: boolean;
  error?: any;
}

export interface SimpleFormStates {
  valid?: boolean;
}

export interface FormFieldProps extends InputFieldStates {
  onValueChange: (value: string | number) => void;
}
