import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "133%"
  },
});

export default function MovieCard({id, image, title, release_date, deleteAction, onClick}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => onClick(id)}>
        <CardMedia
          className={classes.media}
          image={process.env.REACT_APP_MOVIEAPI_STATIC+"movies/"+image}
          title={`${title}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {`${title}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {`${release_date}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" component={Link} to={'movies/edit/'+id}>
          Edit
        </Button>
        <Button onClick={()=>deleteAction(id)} size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
