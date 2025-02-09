import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ReactSelectProps } from '../../typings/input';
import ReactSelect from 'react-select';
import { InputErrorMessage } from './InputErrorMessage';

export const ReactSelectInput: FC<ReactSelectProps> = ({ name, label, errors, options, isMulti, placeholder, icon, onChangeValue }) => {
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
            render={({ field: { onChange } }) => (
              <ReactSelect
                isMulti={isMulti}
                onChange={onChange}
                onInputChange={onChangeValue}
                options={options}
                placeholder={placeholder}
                classNames={{
                  control: (state) =>
                    `form__select ${Object.prototype.hasOwnProperty.call(errors, name) && !state.isFocused && '!border-2 !border-red-500'} `,
                }}
                className="cursor-pointer appearance-none"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    outline: state.isFocused ? 'transparent' : 'transparent',
                    outlineWidth: state.menuIsOpen ? '0' : '0',
                    background: state.theme ? 'transparent' : 'transparent',
                    border: state.theme ? 'transparent' : 'transparent',
                    borderRadius: '0',
                    boxShadow: state.theme ? 'none' : 'none',
                    paddingInlineStart: '22px',
                  }),
                  placeholder: (styles) => ({
                    ...styles,
                    color: 'rgb(212 212 212 / 0.6)',
                  }),
                  option: (styles, { isDisabled, isFocused, isSelected }) => ({
                    ...styles,
                    backgroundColor: isFocused ? '#CCEEF2' : isSelected ? '#6CB9D8' : 'transparent',
                    color: isFocused ? '#374151' : isSelected ? '#6b7280' : '#6b7280d0',
                  }),
                  menu: (styles) => ({
                    ...styles,
                    zIndex: 20,
                  }),
                  singleValue: (styles) => ({
                    ...styles,
                    color: 'rgb(245 245 245 / var(--tw-text-opacity, 1))',
                  }),
                  input: (styles) => ({
                    ...styles,
                    color: 'rgb(245 245 245 / var(--tw-text-opacity, 1))',
                  }),
                }}
              />
            )}
          />
        </div>
      </div>
      <InputErrorMessage name={name} errors={errors} />
    </div>
  );
};
