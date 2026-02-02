import React from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { Field, reduxForm } from 'redux-form/immutable';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ForgotPasswordContainer from '../../containers/ForgotPasswordContainer';

const validate = values => {
  const errors = {}
  const formValues = values.toJS();
  if (!formValues.password) {
    errors.password = true
  } else 
  if (!formValues.email) {
    errors.email = true
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
    errors.email = true
  }
  return errors
}

const styles = theme => ({
  root: {
    padding: theme.spacing.unit*2,
    flexGrow: 1,
    minHeight: '100vh',
    background: `url(${process.env.PUBLIC_URL}/images/login-background.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    boxShadow: 'inset 10px 10px 50px #fff'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  typegraphy: {
    paddingBottom: '24px'
  },
  textField: {
    margin: theme.spacing.unit
  },
  button: {
    paddingRight: theme.spacing.unit*2,
    paddingLeft: theme.spacing.unit*2
  },
  buttonWrapper: {
    textAlign: 'right'
  },
  rightIcon: {
    paddingLeft: theme.spacing.unit
  },
  forgotPassword: {
	  textAlign: 'right',
	  color: '#1976d2',
	  fontSize: '14px',
	  paddingBottom: '10px',
	  cursor: 'pointer'
  }
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
	this.state = { passwordModal: false, mode: null};
  }
  
  handleClickOpen = () => {
    this.setState({ passwordModal: true, mode: 'forgotPassword'});
  }
  handleResetClickOpen = () => {
    this.setState({ passwordModal: true, mode: 'resetPassword'});
  }

  handleClose = () => {
    this.setState({ passwordModal: false });
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
    const { user, classes } = this.props;
    if (user.data && !user.data.hasError) {
      return <Redirect to='/home' />
    }

    return (
      <Grid container className={classes.root} justify="flex-end" spacing={24}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography className={classes.typegraphy} headlineMapping={{headline: 'h1'}} variant="headline" color="inherit">
            Login
          </Typography>
          <Paper className={classes.paper} square elevation={12}>
            <form>
              <Field
                  name="email"
                  component={this.renderField}
                  type="email"
                  label='Enter email'
                  fullWidth
                  fieldClassName={classes.textField}
              />
              <Field
                  name="password"
                  component={this.renderField}
                  type="password"
                  label='Enter password'
                  fullWidth
                  fieldClassName={classes.textField}
              />
				<Typography className={classes.forgotPassword} variant="body1" color="inherit" onClick={this.handleClickOpen}>
					Forgot Password ?
				</Typography>
				<Typography className={classes.forgotPassword} variant="body1" color="inherit" onClick={this.handleResetClickOpen}>
					Reset Password
				</Typography>
              {
                (user.data && user.data.hasError) ? (
                  <Typography className={classes.typegraphy} variant="subheading" color="error">
                    Not able to login. Please check your credentials!
                  </Typography>
                ) : null
              }
              <div justify="right" className={classes.buttonWrapper}>
                <Button 
                  onClick={() => {
                    this.props.handleSubmit()
                  }}
                  className={classes.button}
                  variant="raised"
                  color="primary"
                  size="small"
                >
                  Login
                  <Icon className={classes.rightIcon}>arrow_right</Icon>
                </Button>
              </div>
              <div>
              </div>
            </form>
          </Paper>
		  <Dialog
            fullWidth
            open={this.state.passwordModal}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <ForgotPasswordContainer mode= {this.state.mode}/>
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    );
  }
}

LoginPage = reduxForm({
  form: 'user-login-form',
  validate
})(LoginPage);

export default withStyles(styles)(LoginPage);
