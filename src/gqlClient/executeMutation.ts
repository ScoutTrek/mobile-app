import { ScoutTrekApolloClient } from 'data';

export const executeMutation = async <ReturnType, InputType>(
  mutation: any,
  input?: InputType // should be an object with params
): Promise<ReturnType | undefined> => {
  try {
    const result = await ScoutTrekApolloClient.mutate({
      mutation,
      variables: input,
    });
    console.log('executeMutation result', result.data);
    return result.data as ReturnType;
  } catch (error) {
    console.error('executeMutation error', error);
  }
};
