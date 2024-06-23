import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface LoadingState {
  isLoading: boolean
  isRefresh: boolean
}

const initialState: LoadingState = {
  isLoading: false,
  isRefresh: false
}
const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
    setIsRefresh: (state, { payload }: PayloadAction<boolean>) => {
      state.isRefresh = payload
    }
  }
})
export const { setIsLoading, setIsRefresh } = loadingSlice.actions

export default loadingSlice.reducer
