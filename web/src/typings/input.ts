import { IconType } from 'react-icons';
import { RegisterFormType } from '../utils/register';
import { FieldErrors } from 'react-hook-form';
import { ReactElement } from 'react';

type RegisterFieldName = 'firstName' | 'lastName' | 'nationality' | 'birthdate' | 'gender';

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
  dateFormat?: 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy';
}

export interface ReactSelectProps extends SelectProps {
  isMulti: boolean;
}
