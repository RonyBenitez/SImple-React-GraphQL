


const { ApolloServer } = require('apollo-server');
const fs = require('fs')
const movies=JSON.parse(fs.readFileSync("./data/final.json"))
// const { makeExecutableSchema } = require("graphql-tools");
// const express = require("express");
// const express_graphql = require("express-graphql").graphqlHTTP


const typeDefs = fs.readFileSync("schema.gql", {
  encoding: "utf8",
  flag: "r",
});

const resolvers = {
    Query: {
      movieID: function (_, { id }) {
        return movies[id];
      },
      movieTitle: function (_, { title="" ,start=0,end=-1}) {
        return Object.values(movies)
                .filter(movie=>movie.Title.toLowerCase().includes(title.toLowerCase()))
                .slice(start,end)
                .map(item=>({...item,Query:title}))
      },

    },
}



const server = new ApolloServer({
  introspection: true,
  playground: true,
typeDefs,
resolvers,
cors: {
  origin: "http://localhost:3000",
  credentials: true
}
});

server.listen(process.env.PORT || 500).then(({ url }) => {
console.log(`🚀 Server ready at ${url}`);
});

// const schema = makeExecutableSchema({ typeDefs, resolvers });


// const app = express();
// app.use(
//   "/graphql",
//   express_graphql({
//     schema: schema,
//     graphiql: true,
  
//   })
// );
// app.listen(5000, () => console.log("Running on localhost:5000"));

