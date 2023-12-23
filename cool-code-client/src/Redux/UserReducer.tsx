import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    getUser: (state, action) => {
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
    addUser: (state: any, action: any) => {
      state.users.push(action.payload);
    },
    UpdatUser: (state: any, action: any) => {
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
    deleteUser: (state, action) => {
      const id = action.payload.id;
      state.users = state.users.filter((u: any) => u.id !== id);
    },
  },
});

export const { getUser, addUser, UpdatUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
