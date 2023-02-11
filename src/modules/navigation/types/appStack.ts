export enum AppRoutes {
  authNav = 'AuthNav',
  home = 'Home',
}

export type AppStackParamList = {
  AuthNav: undefined;
  Home: { newUser: boolean };
};
