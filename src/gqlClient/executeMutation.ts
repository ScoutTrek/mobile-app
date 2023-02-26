import { ScoutTrekApolloClient } from 'data';

export const executeMutation = async (mutation: any, variables?: any) => {
  try {
    const result = await ScoutTrekApolloClient.mutate({
      mutation,
      variables,
    });
    return result.data;
  } catch (error) {
    console.error('executeMutation error', error);
  }
};
