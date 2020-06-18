import {gql} from '@apollo/client';
import {Notifications} from 'expo';

export const typeDefs = gql`
  extend type User {
    expoNotificationToken: String
  }
`;

export const resolvers = {
  User: {
    expoNotificationToken: async () => {
      let token;
      try {
        token = await Notifications.getExpoPushTokenAsync();
        console.log('Token ', token);
      } catch (e) {
        console.log(e);
      }
      return token;
    },
  },
};
