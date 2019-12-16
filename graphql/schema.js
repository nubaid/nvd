const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `

  type User {
    id: ID    
    firstName: String
    lastName: String
    password: String
    createdAt: String
    updatedAt: String
  }
  
  input UserInput {
      firstName: String
      lastName: String
      password: String
  }

  type RootQuery {
    user(id: ID!): User
    users(page: Int = 0, size: Int = 10): [User!]!
  }

  type RootMutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): Int!
  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
`;

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
