import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const SIGN_UP = "SignUp" as const;
export const SIGN_IN = "SignIn" as const;
export const FORGOT_PASSWORD = "ForgotPassword" as const;
export const RESET_PASSWORD = "ResetPassword" as const;

export enum AuthStackRoutes {
    signUp = "SignUp",
    signIn = "SignIn",
    forgotPassword = "ForgotPassword",
    resetPassword = "ResetPassword"
}

interface AuthNavigationParamsList extends ParamListBase {
    [AuthStackRoutes.signUp]: {};
    [AuthStackRoutes.signIn]: {};
    [AuthStackRoutes.forgotPassword]: {};
    [AuthStackRoutes.resetPassword]: {};
}

// Navigation Props 
export type SignUpNavigationPros = NativeStackNavigationProp<
    AuthNavigationParamsList,
	AuthStackRoutes.signUp
>;

export type SignInNavigationPros = NativeStackNavigationProp<
    AuthNavigationParamsList,
	AuthStackRoutes.signIn
>;

export type ForgotPasswordNavigationPros = NativeStackNavigationProp<
    AuthNavigationParamsList,
	AuthStackRoutes.forgotPassword
>;

export type ResetPasswordNavigationPros = NativeStackNavigationProp<
    AuthNavigationParamsList,
	AuthStackRoutes.resetPassword
>;

// Route Props
export type SignUpRouteProp = RouteProp<
    AuthNavigationParamsList, 
    AuthStackRoutes.signUp
>;

export type SignInRouteProp = RouteProp<
    AuthNavigationParamsList, 
    AuthStackRoutes.signIn
>;

export type ForgotPasswordRouteProp = RouteProp<
    AuthNavigationParamsList, 
    AuthStackRoutes.forgotPassword
>;

export type ResetPasswordRouteProp = RouteProp<
    AuthNavigationParamsList, 
    AuthStackRoutes.resetPassword
>;