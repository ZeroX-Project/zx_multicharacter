import { FC } from 'react';
import { InputProps } from '../../typings/input';
import { InputErrorMessage } from './InputErrorMessage';
import { useFormContext } from 'react-hook-form';

export const Input: FC<InputProps> = ({ label, type, name, placeholder, errors, icon }) => {
  const { register } = useFormContext();

  return (
    <div>
      <div>
        <label htmlFor={name} className="form__label">
          {label}
        </label>
        <div className="relative">
          <span className="form__icon">{icon}</span>
          <input
            type={type}
            {...register(name)}
            placeholder={placeholder}
            className={`form__input ${Object.prototype.hasOwnProperty.call(errors, name) && 'border-red-500'} `}
            autoComplete={'off'}
          />
        </div>
      </div>
      <InputErrorMessage name={name} errors={errors} />
    </div>
  );
};
