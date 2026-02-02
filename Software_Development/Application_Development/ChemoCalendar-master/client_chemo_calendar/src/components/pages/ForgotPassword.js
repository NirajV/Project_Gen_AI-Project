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

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
	this.state = { passwordModal: false };
  }
  handleClose = () => {
    this.setState({ passwordModal: false });
  }
  componentWillReceiveProps = () => {
	  this.setState({ passwordModal: false })
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
			{this.props.mode === 'forgotPassword' ? <Typography className={classes.typegraphy} headlineMapping={{headline: 'h1'}} variant="headline" color="inherit">
				Forgot Password
			</Typography> : <Typography className={classes.typegraphy} headlineMapping={{headline: 'h1'}} variant="headline" color="inherit">
				Reset Password
			</Typography>}
			{this.props.mode === 'forgotPassword' ?
			<form>
			  <Typography className={classes.typegraphy} variant="body1" color="inherit">
				An OTP will be send to your registered Email ID
			  </Typography>
			  <Field
				  name="emailId"
				  component={this.renderField}
				  type="text"
				  label='Enter Email Id'
				  fullWidth
				  fieldClassName={classes.textField}
			  />
			  
			  <div className={classes.buttonWrapper}>
				<Button 
				  onClick={
					this.props.handleSubmit(values => {
					  this.props.sendOtp(values);
					})
				  }
				  className={classes.button}
				  variant="raised"
				  color="primary"
				  size="small"
				>
				  Send Otp
				</Button>
			  </div>
			  <div>
			  </div>
			</form> : <form>
			  <Field
				  name="otp"
				  component={this.renderField}
				  type="text"
				  label='Enter OTP'
				  fullWidth
				  fieldClassName={classes.textField}
			  />
			  <Field
				  name="password"
				  component={this.renderField}
				  type="password"
				  label='Enter New Password'
				  fullWidth
				  fieldClassName={classes.textField}
			  />
			  
			  <div className={classes.buttonWrapper}>
				<Button 
				  onClick={
					this.props.handleSubmit(values => {
					  this.props.savePassword(values);
					})
				  }
				  className={classes.button}
				  variant="raised"
				  color="primary"
				  size="small"
				>
				 Save
				</Button>
			  </div>
			  <div>
			  </div>
			</form> }
		</div>
    );
  }
}

ForgotPassword = reduxForm({
  form: 'forgot-reset-password-form',
  enableReinitialize : true 
})(ForgotPassword);

export default withStyles(styles)(ForgotPassword);