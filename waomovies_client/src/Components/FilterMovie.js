import React, {useEffect} from "react";
import { FilterContext } from "../Context/Filter";
import TagSelect from "../Containers/Inputs/TagSelect";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MovieApi from "../Services/movieapi";

export default function FilterActor() {
  const { filter, filterObject } = React.useContext(FilterContext);
  const [genres, setGenres] = React.useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await MovieApi.utils.getGenres();

      setGenres(result.data);
    };

    fetchData();
  }, []);
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
              <TagSelect onChange={(genre) => filter({...filterObject, genre})} label="Genres" data={genres}></TagSelect>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
