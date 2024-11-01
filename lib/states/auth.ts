import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../user";

export type AuthState = {
  user?: Omit<User, "utcCreated" | "utcUpdated"> | null;
};

const initialState: AuthState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<Omit<User, "utcCreated" | "utcUpdated">>
    ) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const login = (user: User) => {
  const { utcCreated, utcUpdated, ...serializableUser } = user;
  return authSlice.actions.login(serializableUser);
};
export const logout = authSlice.actions.logout;
export const selectUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
