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
import { InputActionMeta } from 'react-select';
import '../input/input.scss';

export const RegisterForm: FC = () => {
  const config = useAppSelector(selectConfig);

  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<RegisterFormType> = (data) => {
    const badWords = config.badWords;

    if (badWords.some((word) => data.firstname.toLowerCase().includes(word))) {
      methods.setError('firstname', { message: 'Invalid first name or last name. Please try again.' });
      return;
    }
    if (badWords.some((word) => data.lastname.toLowerCase().includes(word))) {
      methods.setError('lastname', { message: 'Invalid first name or last name. Please try again.' });
      return;
    }

    const birthdate = new Date(data.birthdate).toLocaleDateString();

    function capitalizeFirstLetter(val: string) {
      return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const newPlayerData = {
      firstname: capitalizeFirstLetter(data.firstname),
      lastname: capitalizeFirstLetter(data.lastname),
      nationality: capitalizeFirstLetter(data.nationality.value),
      gender: data.gender.value,
      birthdate: birthdate,
    };

    fetchNui('registerSubmit', newPlayerData);
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

  const handleChangeValue = (actionMeta: InputActionMeta) => {
    if (actionMeta.action === 'set-value')
      setTimeout(() => {
        const gender = getValues('gender.value');
        fetchNui('changeGender', gender);
      }, 500);
  };

  const nationalityOptions: any = [];
  config.nationalities.map((key, index) => nationalityOptions.push({ value: key, label: key }));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="custom-background mb-5 flex w-[400px] flex-col gap-5 rounded-md border p-4 backdrop-filter">
          <Input
            type="text"
            label={Locale.firstname || 'First Name'}
            placeholder={Locale.enter_firstname || 'Enter your First Name'}
            name="firstname"
            errors={errors}
            icon={<FaUser />}
          />
          <Input
            type="text"
            label={Locale.lastname || 'Last Name'}
            placeholder={Locale.enter_lastname || 'Enter your First Name'}
            name="lastname"
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
            onChangeValue={(newValue, actionMeta) => handleChangeValue(actionMeta)}
          />
        </div>
        <div className="flex justify-center">
          <SubmitInput />
        </div>
      </form>
    </FormProvider>
  );
};
