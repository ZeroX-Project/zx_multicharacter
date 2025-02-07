export type Config = {
  nationalities: string[];
  maxCharacter: number;
  enableDeleteButton: boolean;
  dateFormat: 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy' | undefined;
  dateMin: string;
  dateMax: string;
  badWords: string[];
};

export type State = {
  config: Config;
};
