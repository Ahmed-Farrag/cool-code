import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    get: (state, action) => {
      state.users = action.payload.map((user: any) => {
        return {
          id: user.id,
          name: user.name,
          desc: user.description,
          date: user.createdAt,
          active: user.active,
        };
      });
    },
    add: (state: any, action: any) => {
      state.users.push(action.payload);
    },
    Updat: (state: any, action: any) => {
      const payload = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      const index = payload.findIndex((x: any) => x.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = {
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          date: action.payload.createdAt,
          active: action.payload.active,
        };
      }
    },
    delet: (state, action) => {
      const id = action.payload.id;
      state.users = state.users.filter((u: any) => u.id !== id);
    },
  },
});

export const { get, add, Updat, delet } = userSlice.actions;
export default userSlice.reducer;
