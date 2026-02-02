import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => {
  return ({
    dialogue: {
      fontFamily: theme.typography.fontFamily
    }
  })
}
class Modal extends React.Component {

  onModalClick = (event) => {
    event.stopPropagation();
  }
  render() {
    const { title, subTitle, handleClose, handleAgree, open, hideActions, classes, disabled } = this.props;
    return (
      <Dialog
        open={open}
        className={classes.dialogue}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        onClick={this.onModalClick}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {title}
        </DialogTitle>
        <DialogContent>
          {subTitle}
        </DialogContent>
        {
          !hideActions && (
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button disabled={disabled} onClick={handleAgree} color="primary">
                Agree
              </Button>
            </DialogActions>
          )
        }
      </Dialog>
    );
  }
}

export default withStyles(styles)(Modal);