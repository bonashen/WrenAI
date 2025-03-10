import * as Types from './__types__';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SqlPairFragment = { __typename?: 'SqlPair', id: number, projectId: number, sql: string, question: string };

export type SqlPairsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SqlPairsQuery = { __typename?: 'Query', sqlPairs: Array<{ __typename?: 'SqlPair', id: number, projectId: number, sql: string, question: string } | null> };

export type CreateSqlPairMutationVariables = Types.Exact<{
  data: Types.CreateSqlPairInput;
}>;


export type CreateSqlPairMutation = { __typename?: 'Mutation', createSqlPair: { __typename?: 'SqlPair', id: number, projectId: number, sql: string, question: string } };

export type EditSqlPairMutationVariables = Types.Exact<{
  where: Types.SqlPairWhereUniqueInput;
  data: Types.UpdateSqlPairInput;
}>;


export type EditSqlPairMutation = { __typename?: 'Mutation', editSqlPair: { __typename?: 'SqlPair', id: number, projectId: number, sql: string, question: string } };

export type DeleteSqlPairMutationVariables = Types.Exact<{
  where: Types.SqlPairWhereUniqueInput;
}>;


export type DeleteSqlPairMutation = { __typename?: 'Mutation', deleteSqlPair: boolean };

export const SqlPairFragmentDoc = gql`
    fragment SqlPair on SqlPair {
  id
  projectId
  sql
  question
}
    `;
export const SqlPairsDocument = gql`
    query SqlPairs {
  sqlPairs {
    ...SqlPair
  }
}
    ${SqlPairFragmentDoc}`;

/**
 * __useSqlPairsQuery__
 *
 * To run a query within a React component, call `useSqlPairsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSqlPairsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSqlPairsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSqlPairsQuery(baseOptions?: Apollo.QueryHookOptions<SqlPairsQuery, SqlPairsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SqlPairsQuery, SqlPairsQueryVariables>(SqlPairsDocument, options);
      }
export function useSqlPairsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SqlPairsQuery, SqlPairsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SqlPairsQuery, SqlPairsQueryVariables>(SqlPairsDocument, options);
        }
export type SqlPairsQueryHookResult = ReturnType<typeof useSqlPairsQuery>;
export type SqlPairsLazyQueryHookResult = ReturnType<typeof useSqlPairsLazyQuery>;
export type SqlPairsQueryResult = Apollo.QueryResult<SqlPairsQuery, SqlPairsQueryVariables>;
export const CreateSqlPairDocument = gql`
    mutation CreateSqlPair($data: CreateSqlPairInput!) {
  createSqlPair(data: $data) {
    ...SqlPair
  }
}
    ${SqlPairFragmentDoc}`;
export type CreateSqlPairMutationFn = Apollo.MutationFunction<CreateSqlPairMutation, CreateSqlPairMutationVariables>;

/**
 * __useCreateSqlPairMutation__
 *
 * To run a mutation, you first call `useCreateSqlPairMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSqlPairMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSqlPairMutation, { data, loading, error }] = useCreateSqlPairMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSqlPairMutation(baseOptions?: Apollo.MutationHookOptions<CreateSqlPairMutation, CreateSqlPairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSqlPairMutation, CreateSqlPairMutationVariables>(CreateSqlPairDocument, options);
      }
export type CreateSqlPairMutationHookResult = ReturnType<typeof useCreateSqlPairMutation>;
export type CreateSqlPairMutationResult = Apollo.MutationResult<CreateSqlPairMutation>;
export type CreateSqlPairMutationOptions = Apollo.BaseMutationOptions<CreateSqlPairMutation, CreateSqlPairMutationVariables>;
export const EditSqlPairDocument = gql`
    mutation EditSqlPair($where: SqlPairWhereUniqueInput!, $data: UpdateSqlPairInput!) {
  editSqlPair(where: $where, data: $data) {
    ...SqlPair
  }
}
    ${SqlPairFragmentDoc}`;
export type EditSqlPairMutationFn = Apollo.MutationFunction<EditSqlPairMutation, EditSqlPairMutationVariables>;

/**
 * __useEditSqlPairMutation__
 *
 * To run a mutation, you first call `useEditSqlPairMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditSqlPairMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editSqlPairMutation, { data, loading, error }] = useEditSqlPairMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditSqlPairMutation(baseOptions?: Apollo.MutationHookOptions<EditSqlPairMutation, EditSqlPairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditSqlPairMutation, EditSqlPairMutationVariables>(EditSqlPairDocument, options);
      }
export type EditSqlPairMutationHookResult = ReturnType<typeof useEditSqlPairMutation>;
export type EditSqlPairMutationResult = Apollo.MutationResult<EditSqlPairMutation>;
export type EditSqlPairMutationOptions = Apollo.BaseMutationOptions<EditSqlPairMutation, EditSqlPairMutationVariables>;
export const DeleteSqlPairDocument = gql`
    mutation DeleteSqlPair($where: SqlPairWhereUniqueInput!) {
  deleteSqlPair(where: $where)
}
    `;
export type DeleteSqlPairMutationFn = Apollo.MutationFunction<DeleteSqlPairMutation, DeleteSqlPairMutationVariables>;

/**
 * __useDeleteSqlPairMutation__
 *
 * To run a mutation, you first call `useDeleteSqlPairMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSqlPairMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSqlPairMutation, { data, loading, error }] = useDeleteSqlPairMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteSqlPairMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSqlPairMutation, DeleteSqlPairMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSqlPairMutation, DeleteSqlPairMutationVariables>(DeleteSqlPairDocument, options);
      }
export type DeleteSqlPairMutationHookResult = ReturnType<typeof useDeleteSqlPairMutation>;
export type DeleteSqlPairMutationResult = Apollo.MutationResult<DeleteSqlPairMutation>;
export type DeleteSqlPairMutationOptions = Apollo.BaseMutationOptions<DeleteSqlPairMutation, DeleteSqlPairMutationVariables>;