import { Grid } from "@material-ui/core";
import React, {useEffect,useState } from "react";
import styles from '../styles.module.css'
import { getMovies } from "../services/movies";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import { Pagination } from "@mui/material";
import { useQuery,gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query movieTitle($title: String!,$start:Int!,$end:Int!){
    movieTitle(title: $title,start:$start,end:$end) {
    Title,
    Poster,
    Date,
    Url,
    Title2,
    Id,
    Query
  }
}
`;



const resultsPerPage=9

const App = () => {
  const [page,setPage]=useState(1)
  const [query,setQuery]=useState("")
  const {error,loading,data}=useQuery(GET_MOVIES,{variables:{title:query,start:(page-1)*resultsPerPage,end:page*resultsPerPage}})
  const movies=(data&&data.movieTitle)||[]


  useEffect(() => {
    search("*");
  }, []);

  const search=(query)=>{
    setQuery(query)

  }

  const handlePage=(_,index)=>{
    setPage(index);
    search(query)

  }
  const moviesPage=movies
  

  return (
    <div className={styles.App}>
      <div className={styles.Nav}>
        <Header text="Simple Movie Search" />
        <Search search={search} />
      </div>
      <Grid container className={styles.container} style={{marginBottom:"3rem"}} >
        <Grid item xs={6} ><Pagination count={10} page={page} onChange={handlePage} /></Grid>
      </Grid>
      <Grid container className={styles.container} >
        {loading && !error ? (
          <Grid item xs={12} style={{textAlign:"center"}}>
             <span className={styles.loader}></span>
          </Grid>
        ) : error ? (
          <Grid item xs={12} style={{textAlign:"center"}}>
            <div className={styles.errorMessage}>{error}</div>
          </Grid>
        ) : (
          moviesPage.map((movie, index) => (
            <Movie xs={4} key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </Grid>
      

    </div>
  );
};

export default App;