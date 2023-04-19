import { gql } from '@apollo/client';

export const LOG_IN = gql`
  mutation Login($userInfo: LoginInput!) {
    login(input: $userInfo) {
      token
      groupID
      noGroups
    }
  }
`;

export interface LoginInput {
  userInfo: {
    email: string;
    password: string;
    expoNotificationToken: string;
  };
}

export interface LoginMutation {
  login: {
    token: string;
    // user: User;
    noGroups: boolean;
    groupID: string | null;
  };
}
