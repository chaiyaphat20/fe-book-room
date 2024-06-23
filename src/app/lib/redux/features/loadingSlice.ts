import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface LoadingState {
  isLoading: boolean
}

const initialState: LoadingState = {
  isLoading: false
}
const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    }
  }
})
export const { setIsLoading } = loadingSlice.actions

export default loadingSlice.reducer
