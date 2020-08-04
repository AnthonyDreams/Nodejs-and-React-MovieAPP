import React, { useEffect } from "react";
import ActorForm from "../Components/ActorForm";
import Grid from "@material-ui/core/Grid";
import { Grid as GridStyle } from "../layouts/globalStyle";
import Container from "@material-ui/core/Container";
import {RequestContext} from "../Context/Request"
import {AlertMessageContext} from "../Context/AlertMessage"
import MovieApi from "../Services/movieapi"
import {
  useParams
} from "react-router-dom";
import BackDrop from "../Containers/Backdrop"
import SnackBar from "../Containers/SnackBar"

export default function AddActor() {
  const classes = GridStyle();
  const {loading, makeQuery} = React.useContext(RequestContext)
  const [data, setData] = React.useState(null)
  let { id } = useParams();
  React.useEffect(() => {
    if(id){
      MovieApi.actors.get(id).then((result)=> setData(result.data))
  } else {
    setData({})
  }

  }, [id])
    
  
  
  return (
    <Container className={classes.container}>
    <SnackBar/>
     <BackDrop show={loading}/>
      <Grid container justify="center" spacing={1}>
        <ActorForm data={data} />
      </Grid>
    </Container>
  );
}
