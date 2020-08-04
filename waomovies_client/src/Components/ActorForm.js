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
import ImageToBase64 from "../utils/Images/ToBase64"
import {RequestContext} from "../Context/Request"
import {AlertMessageContext} from "../Context/AlertMessage"

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

export default function ActorForm({ data }) {
  const classes = useStyles();
  const [actor, setActor] = React.useState({});
  const {makeQuery} = React.useContext(RequestContext)
  const {success} = React.useContext(AlertMessageContext)
  const [preview, setPreview] = React.useState(null)

  useEffect(() => {
      if(data){
        const image = process.env.REACT_APP_MOVIEAPI_STATIC +"actor/" +data.image
        
        
        setActor( data );
        setPreview(image)
        handleImage([image], "url")

      }
  }, [data]);

  function handleChange(e, key) {
    const value = e.target.value;
    setActor((prev) => ({ ...prev, [key]: value }));
  }

 async function handleImage(image, type="file"){
      await ImageToBase64(image[0], type, function(base){
        setActor((prev) => ({ ...prev, image:base }))
      })
      
  }


  async function Submit() {
     makeQuery(() => MovieApi.actors.create(actor), () => {
        setActor(actor.id ? actor : {})
        success(actor.id ? "Actor updated successfully" : "Actor added successfully")
     });
    
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <ImageDropZone
          preview={actor.id ? preview : null}
            OnChange={(image) => handleImage(image)}
          />
        </Grid>
        <Grid container spacing={1} >
        <Grid item xs={3}>
          <TextField
            label="First name"
            id="filled-size-small"
            value={actor.firstName ? actor.firstName : ""}
            onChange={(e) => handleChange(e, "firstName")}
            variant="filled"
          />
          </Grid>
          <Grid item xs={3}>
          <TextField
            label="Last name"
            id="filled-size-small"
            value={actor.lastName ? actor.lastName : "" }
            onChange={(e) => handleChange(e, "lastName")}
            variant="filled"
          />
          </Grid>
       </Grid>
       <Grid item xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="inline"
              format="yyyy-MM-dd"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              clearable
              value={actor.birthDate ? actor.birthDate : null}
              onChange={(e) =>
                setActor((prev) => ({
                  ...prev,
                  birthDate: e.toISOString().slice(0, 10),
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
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={actor.sex ? actor?.sex: ""}
              onChange={(e) =>
                setActor((prev) => ({ ...prev, sex: e.target.value }))
              }
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
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
