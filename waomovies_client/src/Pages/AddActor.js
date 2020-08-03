import React, { useEffect } from "react";
import ActorForm from "../Components/ActorForm";
import Grid from "@material-ui/core/Grid";
import { Grid as GridStyle } from "../layouts/globalStyle";
import Container from "@material-ui/core/Container";
import {RequestContext} from "../Context/Request"
import {AlertMessageContext} from "../Context/AlertMessage"

import BackDrop from "../Containers/Backdrop"
import SnackBar from "../Containers/SnackBar"

export default function AddActor() {
  const classes = GridStyle();
  const {loading} = React.useContext(RequestContext)
  const {message, type} = React.useContext(AlertMessageContext)

  return (
    <Container className={classes.container}>
    <SnackBar message={message} type={type}/>
     <BackDrop show={loading}/>
      <Grid container justify="center" spacing={1}>
        <ActorForm />
      </Grid>
    </Container>
  );
}
