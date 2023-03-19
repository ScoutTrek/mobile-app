import {
  DocumentNode,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client';
import { ScoutTrekApolloClient } from 'data';

export const executeQuery = async <ReturnType, InputType = any>(
  query: any,
  input?: InputType
): Promise<ReturnType | undefined> => {
  try {
    const result = await ScoutTrekApolloClient.query({
      query,
      variables: input,
    });
    console.log('executeQuery result', result.data);
    return result.data as ReturnType;
  } catch (error) {
    console.error('executeQuery error', error);
  }
};
