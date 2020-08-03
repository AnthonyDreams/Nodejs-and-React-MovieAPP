import React from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from '@material-ui/core/Tooltip';
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: "relative",
    minHeight: 200,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}));

export default function FloatingActionButton({to}) {
  const classes = useStyles();

  return (
    <Tooltip title="Add" aria-label="add">
    <Fab  aria-label={"Add"} component={Link} to={to} className={classes.fab} color={"primary"}>
        <AddIcon></AddIcon>
      </Fab>
  </Tooltip>
     
  );
}
