import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { RegisterFormSchema, RegisterFormType } from '../../utils/register';
import { useAppSelector } from '../../store';
import { selectConfig } from '../../store/config';
import { DateInput, Input, ReactSelectInput, SubmitInput } from '../input';
import { fetchNui } from '../../utils/fetchNui';
import { FaCalendar, FaGenderless, FaGlobe, FaUser, FaUserTag } from 'react-icons/fa6';
import { Locale } from '../../store/locale';
import '../input/input.scss';

export const RegisterForm: FC = () => {
  const config = useAppSelector(selectConfig);

  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
    const badWords = config.badWords;

    if (badWords.some((word) => data.firstName.toLowerCase().includes(word))) {
      methods.setError('firstName', { message: 'Invalid first name or last name. Please try again.' });
      return;
    }
    if (badWords.some((word) => data.lastName.toLowerCase().includes(word))) {
      methods.setError('lastName', { message: 'Invalid first name or last name. Please try again.' });
      return;
    }

    fetchNui('registerSubmit', data);
  };

  const genderOptions = [
    {
      value: Locale.male || 'Male',
      label: Locale.male || 'Male',
    },
    {
      value: Locale.female || 'Female',
      label: Locale.female || 'Female',
    },
  ];

  const nationalityOptions: any = [];
  config.nationalities.map((key, index) => nationalityOptions.push({ value: key, label: key }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex w-[400px] flex-col gap-5 rounded-md border border-sky-300 bg-sky-300 bg-opacity-25 p-4 backdrop-filter">
          <Input
            type="text"
            label={Locale.firstName || 'First Name'}
            placeholder={Locale.enter_firstName || 'Enter your First Name'}
            name="firstName"
            errors={errors}
            icon={<FaUser />}
          />
          <Input
            type="text"
            label={Locale.lastName || 'Last Name'}
            placeholder={Locale.enter_lastName || 'Enter your First Name'}
            name="lastName"
            errors={errors}
            icon={<FaUserTag />}
          />
          <ReactSelectInput
            isMulti={false}
            name="nationality"
            placeholder={Locale.select_nationality || 'Select Nationality'}
            label={Locale.nationality || 'Nationality'}
            errors={errors}
            options={nationalityOptions}
            icon={<FaGlobe />}
          />
          <DateInput
            label={Locale.birthdate || 'Birth Date'}
            name="birthdate"
            errors={errors}
            placeholder={Locale.enter_birthdate || 'Enter your Birth Date'}
            minDate={new Date(config.dateMin)}
            maxDate={new Date(config.dateMax)}
            dateFormat={config.dateFormat}
            icon={<FaCalendar />}
          />
          <ReactSelectInput
            isMulti={false}
            name="gender"
            label={Locale.select_gender || 'Select Gender'}
            placeholder={Locale.enter_gender || 'Enter your Gender'}
            errors={errors}
            options={genderOptions}
            icon={<FaGenderless />}
          />
        </div>
        <div className="flex justify-center">
          <SubmitInput />
        </div>
      </form>
    </FormProvider>
  );
};
