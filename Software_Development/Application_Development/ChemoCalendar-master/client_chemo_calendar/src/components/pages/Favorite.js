import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

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
  card: {
    maxWidth: 345,
  },
  name: {
    fontSize: '24px',
    color: theme.palette.primary.dark,
  },
  subtitle: {
    fontSize: '16px',
    color: theme.palette.text.secondary,
  },
  createUserButton: {
    float: 'right'
  },
  chip: {
    margin: theme.spacing.unit,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  details: {
    display: 'block',
    textAlign: 'center'
  },
  typography: {
    margin: theme.spacing.unit
  },
  listItemHeader: {
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    fontWeight: '600'
  },
  cycleContainer: {
    marginBottom: theme.spacing.unit * 4
  },
  cycleActionButtons: {
    position: 'absolute',
    right: theme.spacing.unit * 4
  }
});

class Favorite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null
    }
  }

  componentDidMount() {
    this.props.fetchAllFavoriteEvents(this.props.user.data.hospitalId);
  }

  handleChange = panel => (event, expanded) => {
    const payload = {
      eventName: panel,
      hospitalId: this.props.user.data.hospitalId
    }
    if(expanded) {
      this.props.fetchAllCycles(payload);
    }
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleCreateEvent = (e, eventName) => {
    e && e.stopPropagation();
    const { router: { history } } = this.context;
    if(eventName) {
      history.push(`/createEvent?eventName=${eventName}`);
    }
  }

  render() {
    const { classes, allEvents, currentEventCycles } = this.props;
    const { expanded } = this.state;
    return (
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12} sm={12} md={10}>
          <Paper className={classes.paper} square elevation={12}>
            <Typography className={classes.typegraphy} headlineMapping={{headline: 'h1'}} variant="headline" color="inherit">
              Favorite Regime's
            </Typography>
            {
              allEvents && allEvents.map((event, index) => {
                return (
                  <ExpansionPanel key={index} expanded={expanded === event} onChange={this.handleChange(event)}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>{event}</Typography>
                      <div className={classes.cycleActionButtons}>
                        <AddToQueueIcon titleAccess="Create Regime" color="secondary" className={classes.favoriteIcon} onClick={(e) => {this.handleCreateEvent(e, event)}} />
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                      {
                        currentEventCycles ? <EventDetails classes={classes} cycles={currentEventCycles}/> : <CircularProgress className={classes.progress} />
                      }
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              })
            }
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const EventDetails = (props) => {
  const { classes, cycles } = props;
  return cycles.map((cycle, index) => {
    return (
      <div key={index} className={classes.cycleContainer}>
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
                      <Typography className={classes.listItemHeader}>Drug #{ index }</Typography>
                      <Typography className={classes.listItemHeader}>Drug Name: { med.name }</Typography>
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

Favorite.contextTypes = {
  router: PropTypes.object
}

export default withStyles(styles)(Favorite);
