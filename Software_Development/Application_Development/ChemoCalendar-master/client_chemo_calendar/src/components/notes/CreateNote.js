import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Select, { Creatable } from 'react-select';

const styles = theme => ({
  typegraphy: {
    paddingBottom: theme.spacing.unit
  },
  textField: {
    margin: theme.spacing.unit
  },
  hiddenField: {
	  opacity: "0"
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 2
  },
  button : {
	  margin: theme.spacing.unit
  }
});

class CreateNote extends React.Component {
  constructor(props) {
    super(props);
	this.state = { addEditModal: false };
  }
  handleClose = () => {
    this.setState({ addEditModal: false });
  }
  renderField({ input, label, type, meta: { touched, error, warning }, fullWidth, fieldClassName }) {
    return (
      <FormControl fullWidth={fullWidth}>
        <TextField
          className={fieldClassName}
          label={label}
          type={type}
          error={touched && error}
          {...input}
        />
      </FormControl>
    )
  }

  render() {
    const { classes, noteData} = this.props;
    return (
      <div className={classes.container}>
		{this.props.mode === 'addMode' ? <Typography className={classes.typegraphy} headlineMapping={{headline: 'h1'}} variant="headline" color="inherit">
			Add Note
        </Typography> : this.props.mode === 'editMode' ? <Typography className={classes.typegraphy} headlineMapping={{headline: 'h1'}} variant="headline" color="inherit">
			Edit Note
        </Typography> : <Typography className={classes.typegraphy} headlineMapping={{headline: 'h1'}} variant="headline" color="inherit">
			Remove Note
        </Typography>}
        {this.props.mode === 'addMode' ?
        <form>
          <Field
              name="title"
              component={this.renderField}
              type="text"
              label='Enter note title'
              fullWidth
              fieldClassName={classes.textField}
          />
          <Field
              name="description"
              component={this.renderField}
              type="textarea"
              label='Enter description'
              fullWidth
              fieldClassName={classes.textField}
          />
          <div className={classes.buttonWrapper}>
            <Button 
              onClick={
                this.props.handleSubmit(values => {
                  this.props.createEventNote(values);
                })
              }
              className={classes.button}
              variant="raised"
              color="primary"
              size="small"
            >
              Add
            </Button>
          </div>
          <div>
          </div>
        </form> : this.props.mode === 'editMode' ? <form>
          <Field
              name="title"
              component={this.renderField}
              type="text"
              label='Enter note title'
              fullWidth
              fieldClassName={classes.textField}
          />
          <Field
              name="description"
              component={this.renderField}
              type="textarea"
              label='Enter description'
              fullWidth
              fieldClassName={classes.textField}
          />
		  <Field
              name="noteId"
              component={this.renderField}
              type="hidden"
              fullWidth
			  fieldClassName={classes.hiddenField}
          />
		  <div className={classes.buttonWrapper}>
          <Button 
              onClick={
                this.props.handleSubmit(values => {
                  this.props.updateEventNote(values);
                })
              }
              className={classes.button}
              variant="raised"
              color="primary"
              size="small"
            >
              Update
            </Button>
          </div>
          <div>
          </div>
        </form> : <form>
		  <Typography className={classes.typegraphy} variant="body1" color="inherit">
			Are you sure you want to remove this note
          </Typography>
		  <Field
              name="noteId"
              component={this.renderField}
              type="hidden"
              fullWidth
			  fieldClassName={classes.hiddenField}
          />
		  <div className={classes.buttonWrapper}>
          <Button 
              onClick={
                this.props.handleSubmit(values => {
                  this.props.removeEventNote(values);
                })
              }
              className={classes.button}
              variant="raised"
              color="primary"
              size="small"
            >
              Remove
            </Button>
			<Button 
              onClick={ this.handleClose }
              className={classes.button}
              variant="raised"
              color="primary"
              size="small"
            >
              Cancel
            </Button>
          </div>
          <div>
          </div>
        </form>}
      </div>
    );
  }
}

CreateNote = reduxForm({
  form: 'create-update-note-form',
  enableReinitialize : true 
})(CreateNote);

export default withStyles(styles)(CreateNote);