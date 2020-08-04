import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import MovieFilterOutlinedIcon from '@material-ui/icons/MovieFilterOutlined';
import MovieApi from "../Services/movieapi"
import { RequestContext } from "../Context/Request";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));



export default function InteractiveList({data, fetchData}) {
  const classes = useStyles();
  const type = data && data.length > 0 ? checkType() : null
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const { loading, makeQuery } = React.useContext(RequestContext);

  function checkType(){
      if(data[0].movie){
          return "actor"
      } else {
          return "movie"
      }
  }
  async function onDelete(id){
    const result = await makeQuery(() =>  MovieApi.characters.remove(id), fetchData)
  }

  return (
    <div className={classes.root}>
     
      <Grid container spacing={2}>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Characters
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {data && data.map(character =>
                <ListItem key={character.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <MovieFilterOutlinedIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={character.character_name}
                    secondary={type == "actor" ? character.movie.title : `${character.actor.firstName} ${character.actor.lastName}` }
                  />
                  <ListItemSecondaryAction onClick={() => onDelete(character.id)}>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
