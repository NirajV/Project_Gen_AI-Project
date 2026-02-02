import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CreateNoteContainer from '../../containers/CreateNoteContainer';
import Note from './Note';


class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addEditModal: false,
      mode: null
    }
  }

  handleClickOpen = () => {
    this.setState({ addEditModal: true, mode: 'addMode' });
  }

  handleClose = () => {
    this.setState({ addEditModal: false });
  }
  
  componentWillReceiveProps = () => {
	  this.setState({ addEditModal: false })
  }

  render() {
    const { classes, notes } = this.props;
    return (
      <Paper className={classes.noteContainer} elevation={1}>
        <div className={classes.noteHeading}>
          <Typography variant="display1">Notes</Typography>
          <Button 
            onClick={this.handleClickOpen}
            color="primary"
            size="small"
          >
            Add
          </Button>
          <Dialog
            fullWidth
            open={this.state.addEditModal}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <CreateNoteContainer mode={this.state.mode}/>
            </DialogContent>
          </Dialog>
        </div>
        <Divider light />
        {
          Array.isArray(notes) && notes.length ? notes.map((note, noteIndex) => {
            return (
              <Note
                key={noteIndex}
                title={note.title}
                description={note.description}
				noteId={note._id}
				userName={note.userId.firstName+' ' + note.userId.lastName}
				createdDate={note.createdAt}
              />
            )
          }) : <span className={classes.notAvailable}>No notes available</span>
        }
      </Paper>
    )
  }
}

const styles = theme => {
  return {
    noteContainer: {
      fontFamily: theme.typography.fontFamily,
      height: '760px',
	  overflow: 'scroll'
    },
    noteHeading: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: theme.spacing.unit * 2,
    },
    notAvailable: {
      display: 'inline-block',
      margin: theme.spacing.unit,
      color: theme.palette.error.light
    }
  }
}

export default withStyles(styles)(Notes);