import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog({onChange, onClose, show, onSave}) {





  return (
    <div>
  
      <Dialog open={show} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{/*Subscribe*/}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We will send updates
            occasionally. */}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Character Name"
            type="email"
            onChange={(e)=>onChange(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSave} color="primary">
            Add Character
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
