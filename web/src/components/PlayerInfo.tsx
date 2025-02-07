import React from 'react';
import { CharacterInfoProp } from '../typings';
import { FaCalendar, FaGenderless, FaGlobe, FaHashtag, FaPaperPlane, FaUserTag, FaUserTie } from 'react-icons/fa6';
import { callbackNui } from '../utils/callbackNui';
import { Locale } from '../store/locale';

export const PlayerInfo: React.FC<{ characterData: CharacterInfoProp }> = ({ characterData }) => {
  return (
    <div className="w-[400px] rounded-md border border-sky-300 bg-sky-300 bg-opacity-25 p-2 backdrop-filter">
      <div className="flex w-full flex-col">
        {characterData && (
          <>
            <p className="text-end text-3xl font-bold tracking-tight">{characterData.firstName}</p>
            <p className="text-end text-2xl tracking-tight">{characterData.lastName}</p>
            <div className="my-3 h-1 w-full rounded-xl bg-sky-200"></div>
            <div className="mb-5 text-end tracking-tight text-muted-foreground">
              {Locale.citizenid || 'Citizen ID'}
              <p className="flex items-center justify-end gap-2 text-end text-neutral-50">
                {characterData.charId} <FaHashtag className="text-muted-foreground" />
              </p>
            </div>

            <div className="mb-5 text-end tracking-tight text-muted-foreground">
              {Locale.job || 'Job'}
              <p className="flex items-center justify-end gap-2 text-end text-neutral-50">
                {characterData.job} <FaUserTie className="text-muted-foreground" />
              </p>
            </div>

            <div className="mb-5 text-end tracking-tight text-muted-foreground">
              {Locale.jobGrade || 'Job Grade'}
              <p className="flex items-center justify-end gap-2 text-end text-neutral-50">
                {characterData.jobGrade} <FaUserTag className="text-muted-foreground" />
              </p>
            </div>

            <div className="mb-5 text-end tracking-tight text-muted-foreground">
              {Locale.birthdate || 'Birthdate'}
              <p className="flex items-center justify-end gap-2 text-end text-neutral-50">
                {characterData.dob} <FaCalendar className="text-muted-foreground" />
              </p>
            </div>

            <div className="mb-5 text-end tracking-tight text-muted-foreground">
              {Locale.nationality || 'Nationality'}
              <p className="flex items-center justify-end gap-2 text-end text-neutral-50">
                {characterData.national} <FaGlobe className="text-muted-foreground" />
              </p>
            </div>

            <div className="mb-5 text-end tracking-tight text-muted-foreground">
              {Locale.gender || 'Gender'}
              <p className="flex items-center justify-end gap-2 text-end text-neutral-50">
                {characterData.sex} <FaGenderless className="text-muted-foreground" />
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
