import { ScoutTrekApolloClient } from 'data';

export const executeQuery = async (query: any, variables?: any) => {
  try {
    const result = await ScoutTrekApolloClient.query({
      query,
      variables,
    });
    return result.data;
  } catch (error) {
    console.error('executeQuery error', error);
  }
};
