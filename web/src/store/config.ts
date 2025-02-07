import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { State } from '../typings';
import { Nationalities } from './nationalities';
import { BadWords } from './badWords';

const initialState: State = {
  config: {
    nationalities: Nationalities,
    maxCharacter: 4,
    enableDeleteButton: true,
    dateFormat: 'dd/MM/yyyy',
    dateMin: '1900-01-01',
    dateMax: '2010-12-31',
    badWords: BadWords,
  },
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<State['config']>) {
      state.config = action.payload;
    },
  },
});

export const { setConfig } = configSlice.actions;
export const selectConfig = (state: RootState) => state.config.config;

export default configSlice.reducer;
