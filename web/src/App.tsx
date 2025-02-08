import { FC } from 'react';
import { useNuiEvent } from './hooks/useNuiEvent';
import { ConfigProps } from './typings';
import { debugData } from './utils/debugData';
import { Locale } from './store/locale';
import { useAppDispatch } from './store';
import { setConfig } from './store/config';
import { fetchNui } from './utils/fetchNui';
import { OpenNUI } from './components';
import { setAssetsPath } from './store/assetsPath';

debugData([
  {
    action: 'registerNewCharacter',
    data: true,
  },
]);
// debugData([
//   {
//     action: 'openUI',
//     data: {
//       playerId: 1,
//       characters: [
//         {
//           citizenid: 'xyz123',
//           firstname: 'John',
//           lastname: 'Elish',
//           dob: 'dd/mm/yyyy',
//           national: 'Indonesia',
//           sex: 'Male',
//           job: 'Warga',
//           jobGrade: 'Pengangguran',
//           position: 'xyz',
//           index: '1',
//         },
//         {
//           citizenid: 'xyz321',
//           firstname: 'John2',
//           lastname: 'Elish2',
//           dob: 'dd/mm/yy',
//           national: 'Indonesia',
//           sex: 'Male',
//           job: 'Warga',
//           jobGrade: 'Pengangguran',
//           position: 'xyz',
//           index: '2',
//         },
//         {
//           citizenid: 'xyz312312',
//           firstname: 'John2',
//           lastname: 'Elish2',
//           dob: 'dd/mm/yy',
//           national: 'Indonesia',
//           sex: 'Male',
//           job: 'Warga',
//           jobGrade: 'Pengangguran',
//           position: 'xyz',
//           index: '2',
//         },
//       ],
//     },
//   },
// ]);

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useNuiEvent<{
    locale: { [key: string]: string };
    assetspath: string;
    config: ConfigProps;
  }>('init', ({ locale, config, assetspath }) => {
    for (const name in locale) Locale[name] = locale[name];

    setAssetsPath(assetspath);
    dispatch(setConfig(config));
  });

  fetchNui('uiLoaded', {});

  return <OpenNUI />;
};
