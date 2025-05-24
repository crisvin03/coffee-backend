// types.ts
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  Home: undefined;
  Favorites: { favorites: { id: number; title: string; desc: string }[] };
};
