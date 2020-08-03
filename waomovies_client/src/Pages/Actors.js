import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Grid as GridStyle } from "../layouts/globalStyle";
import Container from "@material-ui/core/Container";
import ActorCard from "../Containers/ActorCard";
import MovieApi from "../Services/movieapi";

import {FilterContext} from "../Context/Filter"
import {RequestContext} from "../Context/Request"

import FilterActor from "../Components/FilterActor"
import "../App.css";
import { Divider } from "@material-ui/core";
import AddButton from "../Containers/Buttons/AddButton"
import BackDrop from "../Containers/Backdrop"

export default function Actor() {
  const classes = GridStyle();
  const [data, setData] = React.useState([]);
  const {searchText, validFilter, filterObject} = React.useContext(FilterContext);
  const {loading, makeQuery} = React.useContext(RequestContext)
  function deleteActor(id){
      MovieApi.actors.remove(id).then(() => {
          setData(prev => prev.filter(actor=> actor.id !== id) )
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await makeQuery(MovieApi.actors.getAll);
      setData(result.data);
    };


    const fetchDataBySearch = async () => {
        const result = await makeQuery(() => MovieApi.actors.SearchBy({searchText, ...filterObject}));
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
      <FilterActor ></FilterActor>
      <Divider />
      <Container className={classes.container}>
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={2}>
            {data &&
              data.map((actor, index) => (
                <Grid item xs={3} key={index}>
                  <ActorCard {...actor} deleteAction={deleteActor}></ActorCard>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
      <AddButton to={"actors/add"}/>
    </div>
  );
}
