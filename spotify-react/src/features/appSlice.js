import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  openSearch:false
};

export const appSlice = createSlice ({
  name: 'app',
  initialState,
  reducers: {
    loginuser: (state,action) => {
      state.user = action.payload;
    },
    setSearch:state => {
      state.openSearch = true;
    },
    setHome:state => {
      state.openSearch = false;
    },
    removeuser: state => {
      state.value = null;
    },
  },
});

export const {loginuser, removeuser,setSearch,setHome} = appSlice.actions;

export const selectUser = state => state.app.user;
export const selectopenSearch = state => state.app.openSearch;



export default appSlice.reducer;
