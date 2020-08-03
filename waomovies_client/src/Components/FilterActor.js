import React from "react";
import { FilterContext } from "../Context/Filter";
import TagSelect from "../Containers/Inputs/TagSelect";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
export default function FilterActor() {
  const { filter, filterObject } = React.useContext(FilterContext);

  return (
    <div style={{ background: "white" }}>
      <Container>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          alignItems="center"
        >
          <Grid item >
            <Typography variant="h5" component="h2">
              Filter
            </Typography>
          </Grid>
          <Grid item >
            <Grid item>
              <TagSelect onChange={(sex) => filter({...filterObject, sex})} label="Sex" data={["male", "female"]}></TagSelect>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
