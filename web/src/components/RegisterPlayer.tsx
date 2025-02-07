import React, { useState } from 'react';
import { Locale } from '../store/locale';
import { RegisterForm } from './form/RegisterForm';

export const RegisterPlayer: React.FC<{ visible: boolean }> = ({ visible }) => {
  return (
    <div className="flex h-screen items-center justify-center text-neutral-50">
      <div className="flex items-stretch gap-5">
        <div className="rounded-md border border-sky-300 bg-sky-300 bg-opacity-25 p-3 backdrop-filter">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-5 flex justify-center">
              <img src="../../assets/logo.png" className="max-w-[300px]" />
            </div>
            <h2>{Locale.welcome_title || 'Welcome to ZeroX Roleplay ID'}</h2>
            <h3>{Locale.welcome_message || 'Please create your character identity first'}</h3>
          </div>
        </div>
        <div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
