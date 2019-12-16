// import gql to define GraphQL Query
import gql from "graphql-tag";
import { userFragment } from "./fragments";

export const GET_USERS_QUERY = gql`
  query allUsers {
    users {
      ...userInfo
    }
  }
  ${userFragment}
`;
