import React, { useEffect } from "react";
import MovieForm from "../Components/MovieForm";
import Grid from "@material-ui/core/Grid";
import { Grid as GridStyle } from "../layouts/globalStyle";
import Container from "@material-ui/core/Container";
import {RequestContext} from "../Context/Request"
import {AlertMessageContext} from "../Context/AlertMessage"

import BackDrop from "../Containers/Backdrop"
import SnackBar from "../Containers/SnackBar"
import MovieApi from "../Services/movieapi"
import {
  useParams
} from "react-router-dom";
export default function AddMovie() {
  const classes = GridStyle();
  const {loading} = React.useContext(RequestContext)
  const {message, type} = React.useContext(AlertMessageContext)
  const [data, setData] = React.useState(null)
  let { id } = useParams();
  React.useEffect(() => {
    if(id){
      MovieApi.movies.get(id).then((result)=> setData(result.data))
  } else {
    setData({})
  }

  }, [id])

  return (
    <Container className={classes.container}>
    <SnackBar message={message} type={type}/>
     <BackDrop show={loading}/>
      <Grid container justify="center" spacing={1}>
        <MovieForm data={data} />
      </Grid>
    </Container>
  );
}
