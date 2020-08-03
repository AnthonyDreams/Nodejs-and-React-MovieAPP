import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import {sideNavStyles} from "../layouts/globalStyle";
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import { Divider } from "@material-ui/core";
export default function SideNavDrawer({ show, onClose }) {
    const classes = sideNavStyles();
  const list = (anchor) => (
    <div role="presentation" >
      <List>
      <ListItem component={Link} to={"/"} button>
        <ListItemIcon>
        <HomeIcon style={{color: "white"}}  />

        </ListItemIcon>
          <ListItemText classes={{root: classes.primaryText}} primary={"Home"} />
        </ListItem>

        <ListItem component={Link} to={"/actors"} button>
        <ListItemIcon>
        <RecentActorsIcon  style={{color: "white"}} />

        </ListItemIcon>
          <ListItemText  classes={{root: classes.primaryText}} primary={"Actors"} />
        </ListItem>


        <ListItem component={Link} to={"/movies"} button>
        <ListItemIcon >
        <LocalMoviesIcon style={{color: "white"}} />

        </ListItemIcon>
          <ListItemText  classes={{root: classes.primaryText}} primary={"Movies"} />
        </ListItem>

        <br/>
        <Divider />

        <ListItem component={Link} to={"/actors/add"} button>
       
          <ListItemText  classes={{root: classes.primaryText}} primary={"Add Actor"} />
        </ListItem>

        <ListItem component={Link} to={"/movies/add"} button>
       
          <ListItemText  classes={{root: classes.primaryText}} primary={"Add Movie"} />
        </ListItem>

       
      </List>
    </div>
  );

  return (
        <Drawer
          className={classes.drawer}
          variant={"permanent"}
          anchor={"left"}
          open={show}
          classes={{
          paper: classes.drawerPaper
        }}
          onClose={onClose}
        >
          {list("left")}
        </Drawer>
  );
}
