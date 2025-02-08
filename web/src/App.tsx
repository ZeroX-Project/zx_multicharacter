import { FC } from 'react';
import { useNuiEvent } from './hooks/useNuiEvent';
import { Config } from './typings';
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
//           charId: 'xyz123',
//           firstName: 'John',
//           lastName: 'Elish',
//           dob: 'dd/mm/yyyy',
//           national: 'Indonesia',
//           sex: 'Male',
//           job: 'Warga',
//           jobGrade: 'Pengangguran',
//           position: 'xyz',
//           index: '1',
//         },
//         {
//           charId: 'xyz321',
//           firstName: 'John2',
//           lastName: 'Elish2',
//           dob: 'dd/mm/yy',
//           national: 'Indonesia',
//           sex: 'Male',
//           job: 'Warga',
//           jobGrade: 'Pengangguran',
//           position: 'xyz',
//           index: '2',
//         },
//         {
//           charId: 'xyz312312',
//           firstName: 'John2',
//           lastName: 'Elish2',
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
    assets: string;
    config: Config;
  }>('init', ({ locale, config, assets }) => {
    for (const name in locale) Locale[name] = locale[name];

    dispatch(setConfig(config));
    setAssetsPath(assets);
  });

  fetchNui('uiLoaded', {});

  return <OpenNUI />;
};
