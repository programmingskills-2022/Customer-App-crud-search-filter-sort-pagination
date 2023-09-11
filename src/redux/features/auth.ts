import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Auth = {
  isAuth: Boolean;
  username: string;
};

type AuthState = {
  value: Auth;
};

const initialState: AuthState = {
  value: {
    isAuth: false,
    username: "",
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
        },
      };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
