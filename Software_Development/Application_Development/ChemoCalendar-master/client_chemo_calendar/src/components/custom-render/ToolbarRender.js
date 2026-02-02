import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Today from '@material-ui/icons/Today';
import FileDownloadIcon from '@material-ui/icons/FileDownload';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = theme => {
  return ({
    root: {
      //margin: `${theme.spacing.unit}px 0`
    },
    typography: {
      display: 'inline-block'
    },
    iconLeft: {
      marginRight: theme.spacing.unit
    },
    button: {
      margin: `0 ${theme.spacing.unit}px`,
      padding: '2px 8px',
      minWidth: '42px'
    },
    buttonGroupLeft: {
      float: 'left'
    },
    buttonGroupRight: {
      float: 'right'
    }
  })
}

class ToolbarRender extends React.Component {

  componentDidMount() {
    let newDate = moment(this.props.date).add(1, 'seconds');
    this.props.onNavigate('DDD', newDate.toDate());
  }
  
  render() {
    const { classes, label, onNavigate, onViewChange, views, toggleLegendView, showLegend, saveCalendarAsPDF } = this.props;
    return (
      <div className={classes.root}>
        <div className={`${classes.buttonGroupLeft} hide-for-download`}>
          <Button onClick={() => onNavigate('TODAY')} size="small" className={classes.button} variant="outlined" color="secondary">
            <Today className={classes.iconLeft} />
            Today
          </Button>
          <Button onClick={() => onNavigate('PREV')} size="small" className={classes.button} variant="outlined" color="secondary">
            <NavigateBefore />
          </Button>
          <Button onClick={() => onNavigate('NEXT')} size="small" className={classes.button} variant="outlined" color="secondary">
            <NavigateNext />
          </Button>
        </div>
        <Typography className={classes.typography} variant="display1" gutterBottom>{ label }</Typography>
        <div style={{visibility: 'hidden'}} className={`${classes.buttonGroupRight} hide-for-download`}>
          <Button onClick={() => onViewChange(views[0])} size="small" className={classes.button} variant="outlined" color="secondary">
            <Today className={classes.iconLeft} />
            Month
          </Button>
          <Button onClick={() => toggleLegendView()} size="small" className={classes.button} variant='outlined' color={showLegend ? 'secondary': 'default'}>
            Legend
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(ToolbarRender);