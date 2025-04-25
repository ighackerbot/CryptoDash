import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState, ThemeMode } from '../types';

const initialState: UIState = {
  theme: 'dark',
  searchTerm: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.theme = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    }
  },
});

export const { setTheme, setSearchTerm } = uiSlice.actions;

export default uiSlice.reducer;