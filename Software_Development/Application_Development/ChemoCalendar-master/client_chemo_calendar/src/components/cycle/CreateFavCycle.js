import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form/immutable';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => {
  return ({
    root: {
      display: 'block'
    },
    textField: {
      margin: theme.spacing.unit
    },
    typography: {
      margin: theme.spacing.unit
    },
    listItemHeader: {
      textAlign: 'left',
      marginLeft: theme.spacing.unit,
      fontWeight: '600'
    }
  })
}

class CreateFavCycle extends React.Component {

  renderField({ input, label, type, meta: { touched, error, warning }, fullWidth, fieldClassName, shrink }) {
    return (
      <FormControl fullWidth={fullWidth}>
        <TextField
          className={fieldClassName}
          label={label}
          type={type}
          error={touched && error}
          InputLabelProps={{
            shrink
          }}
          {...input}
        />
      </FormControl>
    )
  }

  render () {
    const { classes, field, handleSubmit, eventDetails, user } = this.props;
    const cycle = field;
    if(field) return (
      <form className={classes.root}>
        <Typography className={classes.typography}>Cycle: { cycle.cycleName }</Typography>
        {
          cycle && (
            <div>
              <Typography className={classes.typography}>Cycle Length: { cycle.cycleLength }</Typography>
              <Typography className={classes.typography}>Cycle Repetition: { cycle.repetition }</Typography>
              {
                cycle.medicines && cycle.medicines.map((med, index) => {
                  return (
                    <div key={index}>
                      <Divider light />
                      <Typography className={classes.typography}>Drug #{ index }</Typography>
                      <Typography className={classes.typography}>Drug Name: { med.name }</Typography>
                      <Typography className={classes.typography}>Days: { med.days }</Typography>
                    </div>
                  )
                })
              }
            </div>
          )
        }
        <DialogActions>
          <Button onClick={handleSubmit(values => {
            const favCycle = field && field;
            let payload = values;
            payload = payload.set('eventName', eventDetails.eventName);
            payload = payload.set('cycleLength', favCycle.cycleLength);
            payload = payload.set('repetition', favCycle.repetition);
            payload = payload.set('medicines', favCycle.medicines);
            payload = payload.set('cycleName', favCycle.cycleName);
            payload = payload.set('userId', user.data._id);
            this.props.onSubmit(payload);
            this.props.toggleSaveFavoriteModal();
          })} color="primary">
            Agree
          </Button>
        </DialogActions>
      </form>
    )
    if(eventDetails && eventDetails.cycles) return (
      <div>
        <Typography className={classes.typography}>Regime: { eventDetails.eventName }</Typography>
        {
          eventDetails && eventDetails.cycles && eventDetails.cycles.map((cycle, index) => {
            return (
              <div key={index}>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Typography className={classes.listItemHeader}>Cycle #{index + 1}</Typography>
                <Typography className={classes.listItemHeader}>Cycle: { cycle.cycleName }</Typography>
                {
                  cycle && (
                    <div>
                      <Typography className={classes.typography}>Cycle Length: { cycle.cycleLength }</Typography>
                      <Typography className={classes.typography}>Cycle Repetition: { cycle.repetition }</Typography>
                      {
                        cycle.medicines && cycle.medicines.map((med, index) => {
                          return (
                            <div key={index}>
                              <Divider light />
                              <Typography className={classes.typography}>Drug #{ index }</Typography>
                              <Typography className={classes.typography}>Drug Name: { med.name }</Typography>
                              <Typography className={classes.typography}>Days: { med.days }</Typography>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
              </div>
            )
          })
        }
        <DialogActions>
          <Button onClick={handleSubmit(values => {
            let payload = values;
            payload = eventDetails && payload.set('eventName', eventDetails.eventName);
            payload = eventDetails && payload.set('cycles', eventDetails.cycles);
            payload = payload.set('userId', user.data._id);
            this.props.onSubmit(payload);
            this.props.toggleSaveFavoriteModal();
          })} color="primary" disabled={!eventDetails.eventName || (eventDetails.cycles && !eventDetails.cycles.length)}>
            Agree
          </Button>
        </DialogActions>
      </div>
    )
    return <div></div>
  }
}

CreateFavCycle = reduxForm({
  form: 'create-fav-cycle-form'
})(CreateFavCycle);

export default withStyles(styles)(CreateFavCycle);