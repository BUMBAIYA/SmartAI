import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const openAIApiSlice = createSlice({
  name: 'openAIApiSlice',
  initialState: {
    key: '',
    verified: false,
  },
  reducers: {
    setStoreAPIKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },
    setKeyVerified: (state, action: PayloadAction<boolean>) => {
      state.verified = action.payload;
    },
  },
});

export const { setStoreAPIKey, setKeyVerified } = openAIApiSlice.actions;

export default openAIApiSlice.reducer;
