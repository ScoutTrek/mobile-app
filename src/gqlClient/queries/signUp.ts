import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation SignUp($userInfo: SignupInput!) {
    signup(input: $userInfo) {
      token
      noGroups
    }
  }
`;

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface SignUpQuery {
  token: string;
  noGroups: boolean;
}
