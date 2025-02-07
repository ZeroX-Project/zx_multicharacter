import { CharacterInfoProp } from './character';

export type PlayerDataProp = {
  playerId: string;
  maxCharacter: number;
  characterUsage: number;
  characters: CharacterInfoProp[];
};
