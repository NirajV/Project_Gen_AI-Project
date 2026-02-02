import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';

const styles = theme => {
  return ({
    root: {
      flexFlow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      minHeight: '80vh'
    },
    navLink: {
      textDecoration: 'none'
    },
    filterContainer: {
      flexFlow: 1,
      fontFamily: theme.typography.fontFamily,
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4
    },
    filterButton: {
      marginTop: theme.spacing.unit * 2
    }
  })
};

class Schedule extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filter: {
        eventName: '',
        patientName: '',
        cancerName: '',
        mrn: ''
      }
    }
  }

  handleChange = name => event => {
    let { filter } = this.state;
    filter[name] = event.target.value;
    this.setState({
      filter
    });
  };
  render() {
    const { classes, events, user } = this.props;
    const  { userMap } = user;
    return (
      <Grid className={classes.root} justify="center" container>
        <Grid item xs={12} lg={11} >
          <Paper className={classes.paper}  elevation={6}>
            <Grid justify="center" className={classes.filterContainer} container spacing={8}>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Filter by Regime name"
                  type='search'
                  fullWidth
                  onChange={this.handleChange('eventName')}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Filter by Cancer type"
                  type='search'
                  onChange={this.handleChange('cancerName')}
                  fullWidth
                  />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Filter by Patient name"
                  type='search'
                  onChange={this.handleChange('patientName')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Filter by MRN"
                  type='search'
                  onChange={this.handleChange('mrn')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <Button 
                  variant="raised"
                  color="secondary"
                  size="small"
                  fullWidth
                  className={classes.filterButton}
                  onClick={() => {
                    const { eventName, patientName, cancerName, mrn  } = this.state.filter;
                    const payload = {eventName, patientName, cancerName, mrn, userId: this.props.user.data._id};
                    console.log(payload);
                    this.props.fetchFilteredEvents(payload);
                  }}
                >
                  <SearchIcon />
                  Apply filter
                </Button>
              </Grid>
            </Grid>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Patient Name
                  </TableCell>
                  <TableCell>
                    Cancer Name
                  </TableCell>
                  <TableCell>
                    MRN
                  </TableCell>
                  <TableCell>
                    Regime Name
                  </TableCell>
                  <TableCell>
                    Created By
                  </TableCell>
                  <TableCell>
                    Start Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  events ? events.map((event, index) => {
                    let beginDate = moment(event.beginDate).format('YYYY MM DD');
                    const user = userMap && `${userMap[event.userId].firstName} ${userMap[event.userId].lastName}`
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <NavLink className={classes.navLink} to={`/viewEvent/${event._id}`}>
                            <Button color="primary">
                              { event.patientName }
                            </Button>
                          </NavLink>
                        </TableCell>
                        <TableCell>
                          { event.cancerName }
                        </TableCell>
                        <TableCell>
                          { event.mrn }
                        </TableCell>
                        <TableCell>
                          { event.eventName }
                        </TableCell>
                        <TableCell>
                          { user }
                        </TableCell>
                        <TableCell>
                          { beginDate }
                        </TableCell>
                      </TableRow>
                    )
                  }) : <TableRow></TableRow>
                }
              </TableBody>
            </Table>
          </Paper>
        </Grid>  
      </Grid>
    )
  }
}

export default withStyles(styles)(Schedule);