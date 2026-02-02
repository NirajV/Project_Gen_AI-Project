import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import dates from './utils/dates';
import times from './utils/times';
import { hexToRgb } from '../../utils/color';

const styles = theme => {
  return ({
    root: {
      marginTop: theme.spacing.unit,
      flexFlow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2
    },
    tableCell: {
      borderRight: '1px solid #e0e0e0',
      textAlign: 'center',
      padding: '12px 24px'
    },
    tableCellLeft: {
      borderLeft: '1px solid #e0e0e0'
    },
    tableCellTop: {
      borderTop: '1px solid #e0e0e0',
      color: theme.palette.common.white
    },
    tableCurrentRow: {
      backgroundColor: `rgba(${hexToRgb(theme.palette.primary.dark)}, 0.2)`
    },
    tableBodyRow: {
      backgroundColor: theme.palette.grey["50"]
    },
    tableHeaderRow: {
      backgroundColor: theme.palette.secondary.light
    }
  })
};

class Weekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      currentRowId: null
    }
  }

  componentDidMount() {
    const date = new Date();
    let hour = date.getHours();
    hour = hour < 10 ? "0" + hour : hour;
    let timeId = hour + ":" + (date.getMinutes() > 30? "30":"00");
    this.setState({ currentRowId: timeId });
  }

  render() {
    const { classes } = this.props;
    const { currentDate, currentRowId } = this.state;
    const daysInTheWeek = dates.getWeek(currentDate);
    const slots = times.getTimeSlots(30);
    setTimeout(() => {
      const element = document ? document.getElementById(currentRowId) : null;
      element && element.scrollIntoView({ 
          behavior: 'smooth' 
      });
      return true;
    }, 500);

    return (
      <Grid className={classes.root} justify="center" container spacing={16}>
        <Grid item xs={11}>
          Hello
        </Grid>
        <Grid item xs={12} md={11} >
          <Paper className={classes.paper}  elevation={6}>
            <Table>
              <TableBody>
                <TableRow className={classes.tableHeaderRow}>
                  <TableCell className={classNames(classes.tableCell, classes.tableCellLeft, classes.tableCellTop)}>Time</TableCell>
                  <TableCell className={classNames(classes.tableCell, classes.tableCellTop)}>Mon {daysInTheWeek[0]}</TableCell>
                  <TableCell className={classNames(classes.tableCell, classes.tableCellTop)}>Tue {daysInTheWeek[1]}</TableCell>
                  <TableCell className={classNames(classes.tableCell, classes.tableCellTop)}>Web {daysInTheWeek[2]}</TableCell>
                  <TableCell className={classNames(classes.tableCell, classes.tableCellTop)}>Thu {daysInTheWeek[3]}</TableCell>
                  <TableCell className={classNames(classes.tableCell, classes.tableCellTop)}>Fri {daysInTheWeek[4]}</TableCell>
                  <TableCell className={classNames(classes.tableCell, classes.tableCellTop)}>Sat {daysInTheWeek[5]}</TableCell>
                  <TableCell className={classNames(classes.tableCell, classes.tableCellTop)}>Sun {daysInTheWeek[6]}</TableCell>
                </TableRow>
                {
                  slots.map((slot, index) => {
                    return (
                      <TableRow key={index} className={currentRowId === slot ? classes.tableCurrentRow : classes.tableBodyRow } id={slot}>
                        <TableCell className={classNames(classes.tableCell, classes.tableCellLeft)}>
                          {slot}
                        </TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                        <TableCell className={classes.tableCell}></TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Weekly);