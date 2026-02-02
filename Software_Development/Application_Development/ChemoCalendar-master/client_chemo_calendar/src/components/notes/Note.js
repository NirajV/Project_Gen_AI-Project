import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateNoteContainer from '../../containers/CreateNoteContainer';

const styles = theme => {
  return {
    noteContainer: {
      margin: theme.spacing.unit,
      padding: theme.spacing.unit
    },
	noteDesc : {
		marginBottom: '5px'
	},
	noteAudit: {
		marginBottom: '5px',
		fontSize: '12px'
	},
	buttonClass : {
		float: "right",
		marginTop: '-25px',
	}
	
  }
}


class Note extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
		  addEditModal: false,
		  mode: null,
		  noteData: null
		}
	  }
	
	handleClickOpen = (noteData, e) => {
		this.setState({ addEditModal: true, mode: 'editMode', 'noteData': noteData });
	  }

	  handleClose = () => {
		this.setState({ addEditModal: false });
	  }
	
	removeNote = (noteData, e) => {
		console.log(noteData)
		this.setState({ addEditModal: true, mode: 'removeMode', 'noteData': noteData });
	}
	componentWillReceiveProps = () => {
	  this.setState({ addEditModal: false })
	}
	
  render() {
    const { title, description, noteId, userName, createdDate, classes } = this.props;
    return (
      <Paper className={classes.noteContainer} elevation={1}>
        <div >
			<Typography variant="title" gutterBottom align="left">
			  {title}
			</Typography>
			<Typography variant="body1" align="left" className={classes.noteDesc}>
			  {description}
			</Typography>
			<Typography variant="body1" align="left" className={classes.noteAudit}>
			  <b>Created By</b> - {userName}
			</Typography>
			<Typography variant="body1" align="left" className={classes.noteAudit}>
			  <b>Created At</b> - {new Date(createdDate).getDate()}/{new Date(createdDate).getMonth()+1}/{new Date(createdDate).getFullYear()}
			</Typography>
			<Button 
				onClick={this.handleClickOpen.bind(this, {'noteId': noteId, 'title': title, 'desc': description})}
				color="primary"
				size="small"
				className = {classes.buttonClass}
			 >
            Edit
			</Button>
			<Button 
				onClick={
					this.removeNote.bind(this, {'noteId': noteId})
				}
				color="primary"
				size="small"
				className = {classes.buttonClass}
			 >
            Remove
			</Button>
			<Dialog
            fullWidth
            open={this.state.addEditModal}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <CreateNoteContainer noteData = {this.state.noteData} mode={this.state.mode}/>
            </DialogContent>
          </Dialog>
			
        </div>
		
      </Paper>
    )
  }
}

export default withStyles(styles)(Note);