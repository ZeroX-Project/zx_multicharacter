import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '.';
import { State } from '../typings';

const initialState: State = {
  config: {
    nationalities: [],
    maxCharacter: 0,
    enableDeleteButton: true,
    dateFormat: '',
    dateMin: '',
    dateMax: '',
    badWords: [],
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
