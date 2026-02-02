import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import { Redirect } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

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
  }
});

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    const { classes, user } = this.props;
    if(user && !user.data) {
      return <Redirect to='/login' />
    }

    if(user.data.role !== 'hospital_admin') {
      return <div style={{textAlign: 'center'}}>Not accessible</div>
    }

    return (
      <Grid container className={classes.root} justify="center">
        <Grid item xs={12} sm={12} md={10}>
          <Paper className={classes.paper} square elevation={12}>
            <Typography className={classes.typegraphy} headlineMapping={{headline: 'h1'}} variant="headline" color="inherit">
              Users
              <Button 
                href="/createUser"
                className={classes.createUserButton}
                variant="raised"
                color="primary"
                size="small"
              >
                <Icon className={classes.rightIcon}>add</Icon>
              </Button>
            </Typography>
            <Grid container spacing={24} justify="center">
              {
                user && user.all && user.all.map((oneUser, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={12} md={6}>
                      <Card justify="flex-start">
                        <CardContent>
                          <Typography className={classes.name} gutterBottom variant="headline" component="h2">
                            {`${oneUser.firstName} ${oneUser.lastName}`}
                          </Typography>
                          <Typography className={classes.subtitle} variant="headline" component="h4">
                            {oneUser.email}
                          </Typography>
                          <Typography className={classes.subtitle} variant="headline" component="h4">
                            {oneUser.phone}
                          </Typography>
                          <Chip label={oneUser.role === 'hospital_admin' ? 'Admin' : "Staff"} className={classes.chip} />
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Users);
