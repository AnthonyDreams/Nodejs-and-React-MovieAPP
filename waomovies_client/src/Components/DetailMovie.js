import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";


import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RequestContext } from "../Context/Request";
import MovieApi from "../Services/movieapi";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AutoComplete from "../Containers/Inputs/AutoCompleteInput";
import AddIcon from "@material-ui/icons/Add";
import CharacterModal from "../Containers/CharacterModal";
import ActorGrid from "../Containers/ActorGrid";
import CharacterList from "../Containers/CharactersList"
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f1f1f1"
  },
  appBar: {
    position: "relative",
    backgroundColor: "#1A191F"
  },
  Container:{
    marginTop: "50px"
  },
  title: {
    marginBottom: theme.spacing(2),
    flex: 1,
  },

  image: {
    width: "100%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailMovie({ movie, onClose }) {
  const classes = useStyles();
  const { loading, makeQuery } = React.useContext(RequestContext);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [interpretation, setInterpretation] = React.useState({});
  const [showCharacterModal, setShow] = React.useState(false);
  const [excludeIds, setExcludeIds] = React.useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const fetchData = async () => {
    const result = await makeQuery(() => MovieApi.movies.get(movie));
    setData(result.data);
    setShow(false)
    setExcludeIds(result.data.characters.map(characters=> (characters.actor.id)))
    setInterpretation({ movie: { id: result.data.id } });
  };

  React.useEffect(() => {
   

    if (movie) {
      handleOpen();
      fetchData();
    }
  }, [movie]);

  const handleClose = () => {
    setOpen(false);
    onClose()
  };

  const handleSave = async () => {
    const result = await makeQuery(() =>
      MovieApi.actors.addInterpretation(interpretation), fetchData
    );
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        classes={
          {paper:classes.root}
        }
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Movie
            </Typography>
            
          </Toolbar>
        </AppBar>
        {/* Content  */}

        { (!data) || (loading && data.id != movie) ? (
          <CircularProgress disableShrink />
        ) : (
          <Container className={classes.Container}>
            <Grid container direction="row" justify={"space-between"} spacing={7}>
              <Grid container item justify={"flex-start"} spacing={3} xs={4}>
                <img
                  src={
                    process.env.REACT_APP_MOVIEAPI_STATIC +
                    "movies/" +
                    data.image
                  }
                  className={classes.image}
                  alt={data.firstName}
                />
                <Grid item xs={12}>
                  <Typography variant="h5" className={classes.title}>
                    Overview
                  </Typography>

                  <div>
                    <div>
                      <h5>Genre: </h5>
                      <p>{data.genre}</p>
                    </div>
                    <div>
                      <h5>Release Date: </h5>
                      <p>{data.release_date}</p>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid container item xs={8} spacing={6}>
                <Typography variant="h3" className={classes.title}>
                  {data.firstName} {data.lastName}
                </Typography>

                <Grid item xs={12}>
                  <Typography variant="h6">Cast</Typography>
                  <br></br>
                  <ActorGrid
                    data={data.characters.map(
                      (character) => character.actor
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  
                  <Typography variant="h5" className={classes.title}>
                    Characters
                  </Typography>
                  <Grid item xs={12}>
                    <Grid container spacing={3} direction={"row"}>
                      <AutoComplete
                        fetchFunction={MovieApi.actors.getAll}
                        entity={"Actor"}
                        disableOption={excludeIds}
                        onChange={(arg) =>
                          setInterpretation((prev) => ({
                            ...prev,
                            actor: { id: arg },
                          }))
                        }
                      />
                      
                      <CharacterModal
                        onSave={handleSave}
                        show={showCharacterModal}
                        fetchData={fetchData}
                        onClose={() => setShow(false)}
                        onChange={(arg) =>
                          setInterpretation((prev) => ({
                            ...prev,
                            character_name: arg,
                          }))
                        }
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!interpretation.actor || !interpretation.actor.id}
                        className={classes.button}
                        onClick={() => setShow(true)}
                        endIcon={<AddIcon />}
                      >
                        Add
                      </Button>
                    </Grid>
                    <Grid item>
                      <CharacterList fetchData={fetchData} data={data.characters}/>

                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        )}
      </Dialog>
    </div>
  );
}
