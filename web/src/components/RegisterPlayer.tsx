import React from 'react';
import { Locale } from '../store/locale';
import { RegisterForm } from './form/RegisterForm';
import { getItemUrl } from '../utils/misc';

export const RegisterPlayer: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <div className="flex h-screen items-center justify-center text-neutral-50">
      <div className="flex items-stretch gap-5">
        <div className="custom-background rounded-md border p-3 backdrop-filter">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-5 flex justify-center">
              <img src={getItemUrl('logo')} className="max-w-[300px]" />
            </div>
            <h2 className="[text-shadow:_0_2px_4px_rgb(75_85_99_/_0.5)]">{Locale.welcome_title || 'Welcome to ZeroX Roleplay ID'}</h2>
            <h3 className="[text-shadow:_0_2px_4px_rgb(75_85_99_/_0.5)]">
              {Locale.welcome_message || 'Please create your character identity first'}
            </h3>
          </div>
        </div>
        <div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
