import { ApolloClient, InMemoryCache } from '@apollo/client';


const mergePolicy=(existing,incoming)=>{
  const existingP=Object.fromEntries(existing.map(ex=>[ex.Id,ex]))
  const incomingP=Object.fromEntries(incoming.map(ex=>[ex.Id,ex]))
  const merged=Object.values({...existingP, ...incomingP})
  return merged

}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        movieTitle: {
          read(existing, { args: { start, end,title }}) {
            return existing && existing.filter(ex=>ex.Query==title).slice(start, end)
          },


          keyArgs: [],
          merge(existing = [], incoming) {
            return mergePolicy(existing,incoming);
          },
        }
      }
    }
  }
}
);


const API_KEY = "65525897";


export const getMovies= (query,callback,page=1) => {

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&&page=${page}`)
    .then(response => response.json())
    .then(json => {
      if (json.Response === "True") {
        callback({error:false,data:json.Search})
      } else {
        callback({error:true,data:json.Error})
      }
    });
  };


export class ApolloConnector{
    client=null;
    constructor(url='http://localhost:5000/graphql'){
      this.client = new ApolloClient({
        cache: cache,
        uri: url,
        name: 'smsearch',
        version: '1.2',
        queryDeduplication: false,
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'cache-and-network',
          },
        },
      });
    }


}