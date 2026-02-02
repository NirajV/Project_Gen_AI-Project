import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import classNames from 'classnames';
import holidays from '../../data/holidays.json';

const styles = theme => {
  return ({
    root: {
      display: 'block',
      borderLeft: '1px solid #ddd',
      width: '100%',
      '&:first-child': {
        borderLeft: 'none'
      }
    },
    weekend: {
      backgroundColor: theme.palette.error.light,
      opacity: '0.2'
    },
    today: {
      backgroundColor: theme.palette.primary.light,
      opacity: '0.1'
    },
    publicHoliday: {
      backgroundColor: theme.palette.translucent.light,
      color: 'gray',
      fontSize: '12px',
      textTransform: 'capitalize'
    }
  })
}

class DateCellWrapperRender extends React.Component {

  checkForPublicHoliday = () => {
    let currentCellDate = moment(this.props.value).format('YYYY-MM-DD');
    currentCellDate = moment(currentCellDate);
    let isAPublicHoliday = false;
    const year = currentCellDate.year();
    let holidayObj = null;
    holidays && holidays[year] && holidays[year].some((holiday) => {
      const holidayTemp = moment(holiday.date, 'YYYY-MM-DD');
      isAPublicHoliday = currentCellDate.isSame(holidayTemp);
      if(isAPublicHoliday) holidayObj = holiday;
      return isAPublicHoliday;
    });
    return holidayObj;
  }

  render() {
    const { classes, value } = this.props;
    const date = moment(value);
    const day = date.day();
    const weekend = day === 0 || day === 6;
    const currentDay = moment();
    const today = currentDay.isSame(date, 'day');
    const holidayObj = this.checkForPublicHoliday();
    return (
      <div className={classNames(classes.root, weekend ? classes.weekend : '', today ? classes.today : '', holidayObj ? classes.publicHoliday : '')}>
      {
        holidayObj ? holidayObj.name : ''
      }
      </div>
    )
  }
}

export default withStyles(styles)(DateCellWrapperRender);