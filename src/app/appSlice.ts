import { createSlice } from "@reduxjs/toolkit"





export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: 'light' as ThemeMode,
  },
  // reducers состоит из подредьюсеров, эквивалентных одному оператору case в switch
  reducers: create => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      // логика в подредьюсерах мутабельная, а иммутабельность достигается благодаря immer.js
      state.themeMode = action.payload.themeMode
    }),
  }),
  selectors: {
    selectThemeMode : (state) => state.themeMode
  }
})

// action creator достается из appSlice.actions
export const { changeThemeModeAC } = appSlice.actions
//Достаем селекторы
export const { selectThemeMode } = appSlice.selectors
// reducer достается из appSlice.reducer
export const appReducer = appSlice.reducer

// export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode")
//
// const initialState = {
//   themeMode: "light" as ThemeMode,
// }
//
// export const appReducer = createReducer(initialState, (builder) => {
//   builder.addCase(changeThemeModeAC, (state, action) => {
//     state.themeMode = action.payload.themeMode
//   })
// })
//
export type ThemeMode = "dark" | "light"
