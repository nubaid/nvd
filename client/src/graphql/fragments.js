// import gql to define GraphQL Query
import gql from "graphql-tag";

export const userFragment = gql`
  fragment userInfo on User {
    id
    firstName
    lastName
    password
    createdAt
    updatedAt
  }
`;
