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
  root: {
    padding: theme.spacing.unit*2,
    flexGrow: 1,
    boxShadow: 'inset 10px 10px 50px #fff'
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  typegraphy: {
    paddingBottom: '24px'
  },
  textField: {
    margin: theme.spacing.unit
  },
  selectControl: {
    width: '100%',
    padding: theme.spacing.unit
  },
  selectControlLabel: {
    color: theme.palette.action.active,
    padding: '0',
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily,
    textAlign: 'left',
  },
  select: {
    textAlign: 'left',
    margin: '4px 0',
    '& .Select-value' : {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    '& .Select-control' : {
      height: '31px',
      fontFamily: theme.typography.fontFamily
    },
    '& .Select-menu-outer': {
      fontFamily: theme.typography.fontFamily
    }
  }
});

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
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

  renderSelect = ({ input, options, valueKey, labelKey, placeholder, simpleValue, classes, optionRenderer, label, allowCreate }) => {
    const SelectType = allowCreate ? Creatable : Select;
    return (
      <FormControl className={classes.selectControl}>
        {
          label && <label className={classes.selectControlLabel}>{label}</label>
        }
        <SelectType
           value={input.value || ''}
           onChange={input.onChange}
           options={options}
           valueKey={valueKey}
           labelKey={labelKey}
           placeholder={placeholder.show ? placeholder.text : 'Please select...'}
           simpleValue={simpleValue ? true : false}
           className={classes.select}
           optionRenderer={optionRenderer}
           valueRenderer={optionRenderer}
           allowCreate={allowCreate ? true : false}
        />
      </FormControl>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Paper className={classes.paper} square elevation={12}>
            <Typography className={classes.typegraphy} headlineMapping={{headline: 'h1'}} variant="headline" color="inherit">
              Create User
            </Typography>
            <form>
              <Field
                  name="firstName"
                  component={this.renderField}
                  type="text"
                  label='Enter first name'
                  fullWidth
                  fieldClassName={classes.textField}
              />
              <Field
                  name="lastName"
                  component={this.renderField}
                  type="text"
                  label='Enter last name'
                  fullWidth
                  fieldClassName={classes.textField}
              />
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
              <Field
                  name="phone"
                  component={this.renderField}
                  type="text"
                  label='Enter phone number'
                  fullWidth
                  fieldClassName={classes.textField}
              />
              <Field
                name="role"
                component={this.renderSelect}
                type="select"
                valueKey='value'
                labelKey='label'
                options={[{
                  label: 'Hospital Admin',
                  value: 'hospital_admin'
                }, {
                  label: 'Hospital User',
                  value: 'hospital_user'
                }]}
                placeholder={{
                  show: true,
                  text: "Enter user role"
                }}
                label="User role"
                simpleValue={true}
                allowCreate
                classes={classes}
              />
              <div justify="right" className={classes.buttonWrapper}>
                <Button 
                  onClick={
                    this.props.handleSubmit(values => {
                      let payload = values.set('hospitalId', this.props.user.data.hospitalId);
                      this.props.createUserSubmit(payload);
                    })
                  }
                  className={classes.button}
                  variant="raised"
                  color="primary"
                  size="small"
                >
                  Create
                  <Icon className={classes.rightIcon}>arrow_right</Icon>
                </Button>
              </div>
              <div>
              </div>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

CreateUser = reduxForm({
  form: 'create-user-form'
})(CreateUser);

export default withStyles(styles)(CreateUser);
