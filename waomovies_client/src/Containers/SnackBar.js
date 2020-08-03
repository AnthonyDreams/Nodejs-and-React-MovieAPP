import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {AlertMessageContext} from "../Context/AlertMessage"
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({message, type}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {reset} = React.useContext(AlertMessageContext)
 
  React.useEffect(()=>{
      if(message){
        setOpen(true);

      }
  }, [message])
 

  function getAlert(type){
      const Alerts = {
          success:  (<Alert onClose={handleClose} severity="success"> {message}</Alert>),
          warning : <Alert severity="warning">{message}</Alert>,
          info: <Alert severity="info">{message}!</Alert>,
          error: <Alert severity="error">{message}</Alert>
      }
      return Alerts[type]
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    reset()
    

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        {getAlert(type)}
      </Snackbar>
    </div>
  );
}
