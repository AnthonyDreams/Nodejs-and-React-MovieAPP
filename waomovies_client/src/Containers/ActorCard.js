import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardHeader from "@material-ui/core/CardHeader";
import {Link} from "react-router-dom"
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    paddingTop: "93%",
  },
});

export default function ActorCard({
  id,
  image,
  firstName,
  lastName,
  deleteAction,
  onClick,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to={'actors/edit/'+id} onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={() => deleteAction(id)}>Delete</MenuItem>
      </Menu>
      <CardHeader
        action={
          <IconButton onClick={handleClick} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${firstName} ${lastName}`}
      />
      <CardActionArea onClick={() => onClick(id)}>
        <CardMedia
          className={classes.media}
          image={process.env.REACT_APP_MOVIEAPI_STATIC + "actor/" + image}
          title={`${firstName}${lastName}`}
        />
      </CardActionArea>
      
    </Card>
  );
}
