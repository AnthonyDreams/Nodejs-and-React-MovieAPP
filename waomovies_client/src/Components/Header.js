import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { headerStyles } from "../layouts/globalStyle";
import { makeStyles } from "@material-ui/core/styles";
import {FilterContext} from "../Context/Filter"
const headerStyle = makeStyles((theme) => headerStyles(theme));

export default function SearchAppBar({ showSideNav }) {
const {search, searchText} = React.useContext(FilterContext);
  const classes = headerStyle();
  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          onClick={showSideNav}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          Waomovies
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            onChange={(e) => search(e.target.value)}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}
