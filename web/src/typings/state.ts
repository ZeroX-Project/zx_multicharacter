export type dateFormat = ['dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy'];

export type ConfigProps = {
  nationalities: string[];
  maxCharacter: number;
  enableDeleteButton: boolean;
  dateFormat: string;
  dateMin: string;
  dateMax: string;
  badWords: string[];
};

export type State = {
  config: ConfigProps;
};
