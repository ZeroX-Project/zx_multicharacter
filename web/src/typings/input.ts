import { RegisterFormType } from '../utils/register';
import { FieldErrors } from 'react-hook-form';
import { ReactElement } from 'react';
import { InputActionMeta } from 'react-select';

type RegisterFieldName = 'firstname' | 'lastname' | 'nationality' | 'birthdate' | 'gender';

export interface InputErrorProps {
  name: RegisterFieldName;
  errors: FieldErrors<RegisterFormType>;
}

export interface InputProps extends InputErrorProps {
  label: string;
  type?: 'text' | 'email' | 'time';
  icon?: ReactElement;
  placeholder?: string;
}

export interface SelectProps extends InputProps {
  options: {
    value: string;
    label: string;
  }[];
}

export interface InputDateProps extends InputProps {
  minDate?: Date;
  maxDate?: Date;
  selected?: Date;
  dateFormat?: string;
}

export interface ReactSelectProps extends SelectProps {
  isMulti: boolean;
  onChangeValue?: (newValue: string, actionMeta: InputActionMeta) => void;
}
