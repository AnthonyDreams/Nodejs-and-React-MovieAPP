import { fade, makeStyles } from '@material-ui/core/styles';


export const headerStyles = (theme) => ({
   

    appBar: {
        zIndex: theme.zIndex.drawer + 200,
        backgroundColor: "#f1f1"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '18ch',
        '&:focus': {
          width: '40ch',
        },
      },
    },
  });


const drawerWidth = 240;

export const sideNavStyles = makeStyles(theme => ({
 
  drawer: {
    width: drawerWidth,
    flexShrink: "0",
  },
  drawerPaper: {
    boxShadow: "0 0 20px 0 rgba(0,0,0,0.3) !important",
    width: drawerWidth,
    top: "auto !important",
    backgroundColor: "#1A191F !important"


  },

  primaryText: {
    color: "#868C88 !important"
},
  drawerContainer: {
    overflow: "auto"
  }

}));



export const Grid = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: "#1A191F !important",
    },
    container: {
        marginTop: "20px"
        
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));