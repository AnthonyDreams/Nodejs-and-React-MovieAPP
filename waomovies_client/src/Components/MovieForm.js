import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ImageDropZone from "../Containers/DropZone/ImageDropZone";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MovieApi from "../Services/movieapi";
import SaveIcon from "@material-ui/icons/Save";
import DateFnsUtils from "@date-io/date-fns";
import ImageToBase64 from "../utils/Images/ToBase64";
import { RequestContext } from "../Context/Request";
import { AlertMessageContext } from "../Context/AlertMessage";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "30px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
    color: "white",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function MovieForn({ data }) {
  const classes = useStyles();
  const [movie, setMovie] = React.useState({});
  const { makeQuery } = React.useContext(RequestContext);
  const { success } = React.useContext(AlertMessageContext);
  const [preview, setPreview] = React.useState(null)
  const [genres, setGenres] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await MovieApi.utils.getGenres();

      setGenres(result.data);
    };

    fetchData();

    if (data) {
      const image = process.env.REACT_APP_MOVIEAPI_STATIC +"movies/" +data.image
      setMovie(data);
      setPreview(image)
      handleImage([image], "url")
    }
  }, [data]);

  function handleChange(e, key) {
    const value = e.target.value;
    setMovie((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImage(image, type="file") {
    await ImageToBase64(image[0], type, function (base) {
      setMovie((prev) => ({ ...prev, image: base }));
    });
  }

  async function Submit() {
    makeQuery(
      () => MovieApi.movies.create(movie),
      () => {
        setMovie(movie.id ? movie : {});
        success(movie.id ? "movie updated successfully" : "movie added successfully");
      }
    );
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <ImageDropZone preview={movie.id ? preview : null} OnChange={(image) => handleImage(image)} />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Title"
            id="standard-full-width"
            value={movie.title ? movie.title : ""}
            fullWidth
            onChange={(e) => handleChange(e, "title")}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="date-picker-inline"
              label="Release Date"
              clearable
              value={movie.release_date ? movie.release_date : null}
              onChange={(e) =>
                setMovie((prev) => ({
                  ...prev,
                  release_date: e.toISOString().slice(0, 10),
                }))
              }
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={movie.genre ? movie?.genre : ""}
              onChange={(e) =>
                setMovie((prev) => ({ ...prev, genre: e.target.value }))
              }
            >
              {genres &&
                genres.map((genre) => (
                  <MenuItem value={genre}>{genre}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justify="flex-end">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={Submit}
          className={classes.button}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </Grid>
    </div>
  );
}
