import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  openSearch: false,
  playingSong: null,
  accessToken: null,
  reload: true,
};

export const appSlice = createSlice ({
  name: 'app',
  initialState,
  reducers: {
    loginuser: (state, action) => {
      state.user = action.payload;
    },
    setPlayingSong: (state, action) => {
      state.playingSong = action.payload;
    },
    setaccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setReload: state => {
      state.reload = false;
    },
    setSearch: state => {
      state.openSearch = true;
    },
    setHome: state => {
      state.openSearch = false;
    },
    removeuser: state => {
      state.value = null;
    },
  },
});

export const {
  loginuser,
  removeuser,
  setSearch,
  setaccessToken,
  setHome,
  setPlayingSong,
  setReload,
} = appSlice.actions;

export const selectUser = state => state.app.user;
export const selectopenSearch = state => state.app.openSearch;
export const selectplayingSong = state => state.app.playingSong;
export const selectaccessToken = state => state.app.accessToken;
export const selectreload = state => state.app.reload;


export default appSlice.reducer;
