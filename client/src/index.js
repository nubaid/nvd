import React from "react";
import ReactDOM from "react-dom";
// import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { createUploadLink } from "apollo-upload-client";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import App from "./App";

// Apollo Link for remote data fetching
// Creating HttpLink that will connect our ApolloClient instance with the graphql Api's
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
//     headers: {
//       ...headers,
//       "X-Token": token ? token : "",
//       "X-Refresh-Token": refreshToken ? refreshToken : ""
//     }
//   };

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("access_token");
//   const refreshToken = localStorage.getItem("refresh_token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       "X-Token": token ? token : "",
//       "X-Refresh-Token": refreshToken ? refreshToken : ""
//     }
//   };
// });

// // An Apollo Link for error handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log("graphql err: ", graphQLErrors);
  console.log("network err: ", networkError);

  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = errorLink.concat(httpLink);

// fetchPolicy as network-only avoids using the cache.
const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all"
  }
};
// creating an instance of Apollo Client
const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
