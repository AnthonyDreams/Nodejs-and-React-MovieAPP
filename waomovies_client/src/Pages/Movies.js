import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Grid as GridStyle } from "../layouts/globalStyle";
import MovieCard from "../Containers/MovieCard";
import MovieApi from "../Services/movieapi";
import Container from "@material-ui/core/Container";
import FilterMovie from "../Components/FilterMovie"
import { Divider } from "@material-ui/core";
import {FilterContext} from "../Context/Filter"
import {RequestContext} from "../Context/Request"
import AddButton from "../Containers/Buttons/AddButton"
import BackDrop from "../Containers/Backdrop"
import "../App.css";
export default function Actor() {
  const classes = GridStyle();
  const [data, setData] = React.useState([]);
  const {searchText, validFilter, filterObject} = React.useContext(FilterContext);
  const {loading, makeQuery} = React.useContext(RequestContext)

  function deleteMovie(id){
    MovieApi.movies.remove(id).then(() => {
        setData(prev => prev.filter(movie=> movie.id !== id) )
    })
}

  useEffect(() => {
    const fetchData = async () => {
      const result = await makeQuery(MovieApi.movies.getAll);

      setData(result.data);
    };


    const fetchDataBySearch = async () => {
        const result = await makeQuery(() => MovieApi.movies.SearchBy({searchText, ...filterObject}));
        setData(result.data);
    }

    if(validFilter){
        fetchDataBySearch()
    } else {
        fetchData();

    }

  }, [searchText, filterObject]);
  return (
    <div className={classes.root}>
    <BackDrop show={loading}/>
    <FilterMovie ></FilterMovie>
      <Divider />
      <Container className={classes.container}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={2}>
            {data &&
              data.map((movie, index) => (
                <Grid item xs={3} key={index}>
                  <MovieCard {...movie} deleteAction={deleteMovie}></MovieCard>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
      <AddButton to={"movies/add"}/>
    </div>
  );
}
