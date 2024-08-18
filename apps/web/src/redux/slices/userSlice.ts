import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number;
  name: string;
  email: string;
  provider: Provider | null;
  token: string;
  role: Role | null;
}

enum Provider {
  CREDENTIALS,
  GOOGLE,
  FACEBOOK,
}

enum Role {
  TYPE_A,
  TYPE_B,
  TYPE_C,
  TEACHER,
}

const initialState: UserState = {
  id: 0,
  name: '',
  email: '',
  provider: null,
  token: '',
  role: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.provider = action.payload.provider;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.name = '';
      state.email = '';
      state.provider = null;
      state.token = '';
      state.role = null;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
