import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core';

const DEFAULT_PLACEHOLDER_IMAGE = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

export default function Movie({movie,...rest}) {

  const poster = movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;


  return (
    <Grid item  style={{marginBottom:"4rem"}} {...rest}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="200"
          alt={`Title: ${movie.Title}`}
          image={poster}
        />
        <CardContent>
          <Typography  variant="h6" component="div" fontSize={"1rem"}>
            {movie.Title.slice(0,20)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>window.open(`https://www.imdb.com/title/${movie.imdbID}`)} >More Info</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}


