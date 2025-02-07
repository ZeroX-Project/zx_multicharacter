import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { InputDateProps } from '../../typings/input';
import { InputErrorMessage } from './InputErrorMessage';
import 'react-datepicker/dist/react-datepicker.css';

export const DateInput: FC<InputDateProps> = ({ label, name, errors, placeholder, minDate, maxDate, dateFormat, icon }) => {
  const { control } = useFormContext();
  return (
    <div>
      <div>
        <label htmlFor={name} className="form__label">
          {label}
        </label>
        <div className="relative">
          <span className="form__icon">{icon}</span>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
              <ReactDatePicker
                minDate={minDate}
                maxDate={maxDate}
                dateFormat={dateFormat}
                placeholderText={placeholder}
                onChange={onChange}
                selected={value}
                className={`form__input h-[40px] ${Object.prototype.hasOwnProperty.call(errors, name) && 'border-red-500'} `}
              />
            )}
          />
        </div>
      </div>
      <InputErrorMessage name={name} errors={errors} />
    </div>
  );
};
