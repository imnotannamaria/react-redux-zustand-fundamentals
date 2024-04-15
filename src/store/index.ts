import { configureStore, createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todo',
  initialState: ['Study redux, Study React'],
  reducers: {}
})

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer
  }
})