import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoAsset, CryptoState } from '../types/crypto';

const initialState: CryptoState = {
  assets: [],
  loading: true,
  error: null
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setAssets: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload;
      state.loading = false;
    },
    updateAsset: (state, action: PayloadAction<Partial<CryptoAsset> & { id: string }>) => {
      const index = state.assets.findIndex(asset => asset.id === action.payload.id);
      if (index !== -1) {
        state.assets[index] = { ...state.assets[index], ...action.payload };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

// Action creators
export const { setAssets, updateAsset, setLoading, setError } = cryptoSlice.actions;

// Selectors
export const selectAllAssets = (state: { crypto: CryptoState }) => state.crypto.assets;
export const selectAssetById = (state: { crypto: CryptoState }, id: string) => 
  state.crypto.assets.find(asset => asset.id === id);
export const selectLoading = (state: { crypto: CryptoState }) => state.crypto.loading;
export const selectError = (state: { crypto: CryptoState }) => state.crypto.error;

export default cryptoSlice.reducer;