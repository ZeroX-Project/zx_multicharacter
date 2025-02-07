import { FC, useState } from 'react';
import { PlayerDataProp } from '../typings';
import useNuiEvent from '../hooks/useNuiEvent';
import { RegisterPlayer } from './RegisterPlayer';
import { CharacterSelect } from './CharacterSelect';
import Fade from './utils/Fade';

export const OpenNUI: FC = () => {
  const [isVisible, setVisible] = useState(false);
  const [registed, setRegisted] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerDataProp>();

  useNuiEvent<PlayerDataProp>('openUI', (data) => {
    if (!data) return;
    setRegisted(data.characters.length >= 1);
    setPlayerData(data);
    setVisible(true);
  });

  useNuiEvent('registerNewCharacter', () => {
    setVisible(true);
    setRegisted(false);
  });

  useNuiEvent('closeNui', () => {
    setVisible(false);
  });

  return <Fade in={isVisible}>{registed ? <CharacterSelect playerData={playerData} /> : <RegisterPlayer visible={registed} />}</Fade>;
};
