import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = theme => {
  return ({
    root: {
      fontFamily: theme.typography.fontFamily,
      flexFlow: 1
    },
    divider: {
      margin: theme.spacing.unit*2
    },
    textBold: {
      fontWeight: '800'
    },
    subTitle: {
      fontWeight: '800',
      marginBottom: theme.spacing.unit*2
    },
    tableCell: {
      border: 'none',
    }
  })
}

class RegimeView extends React.Component {
  render() {
    const { classes, event } = this.props;
    if(!event) return '';
    return (
      <Grid justify="center" className={classes.root} container spacing={24}>
        <Grid item xs={12}>
          <Typography variant='display1' className={classes.title} color="textSecondary">
            {event.eventName}
          </Typography>
          <Divider className={classes.divider} />
          <Grid justify="center" className={classes.root} container spacing={24}>
            <Grid item xs={12} sm={6} md={4}>
              START DATE: <span className={classes.textBold}>{moment(event.beginDate).format('YYYY-MM-DD')}</span>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              CANCER NAME: <span className={classes.textBold}>{event.cancerName}</span>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              PATIENT NAME: <span className={classes.textBold}>{event.patientName}</span>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid justify="center" className={classes.root} container spacing={24}>
            <Grid item xs={12}>
            <Typography variant='subheading' className={classes.subTitle} color="textSecondary">
              Cycle Information
            </Typography>
            {
              event && event.cycles && event.cycles.map((cycle, cycleIndex) => {
                return (
                  <div key={cycleIndex}>
                    <Grid justify="center" className={classes.root} container spacing={24}>
                      <Grid item xs={12} sm={6} md={4}>
                        NAME: <span className={classes.textBold}>{cycle.cycleName}</span>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        START: <span className={classes.textBold}>{moment(cycle.cycleStartDate).format('YYYY-MM-DD')}</span>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        END: <span className={classes.textBold}>{moment(cycle.cycleEndDate).format('YYYY-MM-DD')}</span>
                      </Grid>
                    </Grid>
                    <Grid justify="center" className={classes.root} container spacing={24}>
                      <Grid item xs={8}>
                        <Typography variant='subheading' className={classes.superSubTitle} color="textSecondary">
                          Drug Information
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell className={classes.tableCell}>
                                #
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                Drug Name
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                Frequency
                              </TableCell>
							  <TableCell className={classes.tableCell}>
                                Drug Strength
                              </TableCell>
							  <TableCell className={classes.tableCell}>
                                Duration
                              </TableCell>
							  <TableCell className={classes.tableCell}>
                                Type
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {
                              cycle.medicines && cycle.medicines.map((medicine, medicineIndex)=> {
                                return (
                                  <TableRow key={medicineIndex}>
                                    <TableCell className={classes.tableCell}>
                                      { medicineIndex + 1 }
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                      { medicine.name }
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                      { medicine.frequency }
                                    </TableCell>
									<TableCell className={classes.tableCell}>
                                      { medicine.strength }
                                    </TableCell>
									<TableCell className={classes.tableCell}>
                                      { medicine.duration }
                                    </TableCell>
									<TableCell className={classes.tableCell}>
                                      { medicine.type }
                                    </TableCell>
                                  </TableRow>
                                )
                              })
                            }
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                  </div>
                )
              })
            }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(RegimeView);