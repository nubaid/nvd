import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USERS_QUERY } from "../graphql/queries";

const UserContainer = props => {
  // Graphql API call to fetch users
  const { loading, error, data } = useQuery(GET_USERS_QUERY, {});
  console.log("this is user", data);

  return <div></div>;
};

export default UserContainer;
