import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { addMocksToSchema } from '@graphql-tools/mock'
import { makeExecutableSchema } from '@graphql-tools/schema'

import typeDefs from './schema.js'
//server loaded with mocked data,
const mocks = {
    Query: () => ({
        tracksForHome: () => [...new Array(6)],
    }),
    Track: () => ({
      id: () => "track_01",
      title: () => "Astro Kitty, Space Explorer",
      author: () => {
        return {
          name: "Grumpy Cat",
          photo:
            "https://res.cloudinary.com/dety84pbu/image/upload/v1606816219/kitty-veyron-sm_mctf3c.jpg",
        };
      },
      thumbnail: () =>
        "https://res.cloudinary.com/dety84pbu/image/upload/v1598465568/nebula_cat_djkt9r.jpg",
      length: () => 1210,
      modulesCount: () => 6,
    }),
  };

async function startApolloServer() {
    const server = new ApolloServer({
        // To enable mocked data,
        // With this code, we're generating an executable schema from our typeDefs, and instructing Apollo Server to populate every queried schema field with a placeholder value (such as Hello World for String fields).
        schema: addMocksToSchema({
            schema: makeExecutableSchema({typeDefs }),
            mocks
        }),
    });
    const { url } = await startStandaloneServer(server);
    console.log(`
      🚀  Server is running!
      📭  Query at ${url}
    `);
}

startApolloServer()