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

class SendEmail extends React.Component {
  constructor(props) {
    super(props);
	this.state = { emailModal: false, emailValue: null };
  }
  handleClose = () => {
    this.setState({ emailModal: false });
  }
  
	handleChange = (e) => {
		this.setState({emailValue: e.target.value});
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
    const { classes} = this.props;
    return (
		<div className={classes.container}>
			<Typography className={classes.typegraphy} headlineMapping={{headline: 'h1'}} variant="headline" color="inherit">
				Send Email
			</Typography>
			<form>
			  <Field
				  name="emailId"
				  component={this.renderField}
				  type="text"
				  label='Enter Email Id'
				  fullWidth
				  fieldClassName={classes.textField}
				  onChange= {this.handleChange}
			  />
			  
			  <div className={classes.buttonWrapper}>
				<Button 
				  onClick={
					this.props.handleSubmit(values => {
					  this.props.sendEmail(this.state.emailValue, this.props.emailFile, this.props.eventName, this.props.patientName, 
					  this.props.beginDate, this.props.viewType);
					})
				  }
				  className={classes.button}
				  variant="raised"
				  color="primary"
				  size="small"
				>
				  Send
				</Button>
			  </div>
			  <div>
			  </div>
			</form> 
		</div>
    );
  }
}

SendEmail = reduxForm({
  form: 'send-email-form',
  enableReinitialize : true 
})(SendEmail);

export default withStyles(styles)(SendEmail);