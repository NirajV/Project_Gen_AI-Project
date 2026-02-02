import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
  return ({
    root: {
      display: 'inline-table'
    },
    label: {
      display: 'table-cell',
      padding: theme.spacing.unit
    }
  })
}

class SummaryDateRender extends React.Component {
  render() {
    const { classes, label } = this.props
    return (
      <div className={classes.root}>
        <span className={classes.label}>
          {label}
        </span>
      </div>
    )
  }
}

export default withStyles(styles)(SummaryDateRender);