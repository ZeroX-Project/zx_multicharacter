import React from 'react';
import { CharacterInfoProp } from '../typings';
import { FaCalendar, FaDollarSign, FaGenderless, FaGlobe, FaHashtag, FaSackDollar, FaUserTag, FaUserTie } from 'react-icons/fa6';
import { Locale } from '../store/locale';

export const PlayerInfo: React.FC<{ characterData: CharacterInfoProp }> = ({ characterData }) => {
  return (
    <div className="custom-background mb-5 w-[500px] rounded-md border p-2 text-lg backdrop-filter">
      <div className="flex w-full flex-col [text-shadow:_0_2px_4px_rgb(75_85_99_/_0.5)]">
        {characterData && (
          <>
            <p className="text-center text-4xl font-bold tracking-tight">
              {characterData.firstname} <span className="text-2xl tracking-tight">{characterData.lastname}</span>
            </p>

            <div className="my-3 h-1 w-full rounded-xl bg-sky-200"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="mb-2 tracking-tight text-neutral-300">
                {Locale.citizenid || 'Citizen ID'}
                <p className="flex items-center gap-2 text-neutral-50">
                  <FaHashtag className="text-neutral-300" /> {characterData.citizenid}
                </p>
              </div>

              <div className="mb-2 tracking-tight text-neutral-300">
                {Locale.job || 'Job'}
                <p className="flex items-center gap-2 text-neutral-50">
                  <FaUserTie className="text-neutral-300" /> {characterData.job}
                </p>
              </div>

              <div className="mb-2 tracking-tight text-neutral-300">
                {Locale.jobGrade || 'Job Grade'}
                <p className="flex items-center gap-2 text-neutral-50">
                  <FaUserTag className="text-neutral-300" /> {characterData.jobGrade}
                </p>
              </div>

              <div className="mb-2 tracking-tight text-neutral-300">
                {Locale.birthdate || 'Birthdate'}
                <p className="flex items-center gap-2 text-neutral-50">
                  <FaCalendar className="text-neutral-300" /> {characterData.dob}
                </p>
              </div>

              <div className="mb-2 tracking-tight text-neutral-300">
                {Locale.nationality || 'Nationality'}
                <p className="flex items-center gap-2 text-neutral-50">
                  <FaGlobe className="text-neutral-300" /> {characterData.national}
                </p>
              </div>

              <div className="mb-2 tracking-tight text-neutral-300">
                {Locale.gender || 'Gender'}
                <p className="flex items-center gap-2 text-neutral-50">
                  <FaGenderless className="text-neutral-300" /> {characterData.sex}
                </p>
              </div>

              <div className="mb-2 tracking-tight text-neutral-300">
                {Locale.cash || 'Cash'}
                <p className="flex items-center gap-2 text-neutral-50">
                  <FaDollarSign className="text-neutral-300" /> {characterData.cash || '0'}
                </p>
              </div>

              <div className="mb-2 tracking-tight text-neutral-300">
                {Locale.bank || 'Bank'}
                <p className="flex items-center gap-2 text-neutral-50">
                  <FaSackDollar className="text-neutral-300" /> {characterData.bank || '0'}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
