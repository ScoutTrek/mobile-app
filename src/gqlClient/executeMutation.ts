import { ScoutTrekApolloClient } from 'data';

export const executeMutation = async <ReturnType>(
  mutation: any,
  variables?: any
): Promise<ReturnType | undefined> => {
  try {
    const result = await ScoutTrekApolloClient.mutate({
      mutation,
      variables,
    });
    console.log('executeMutation result', result.data);
    return result.data as ReturnType;
  } catch (error) {
    console.error('executeMutation error', error);
  }
};
