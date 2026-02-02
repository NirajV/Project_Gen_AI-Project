import React from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CompleteIcon from '@material-ui/icons/Done';

const styles = theme => {
  return ({
    root: {
      fontFamily: theme.typography.fontFamily,
      flexFlow: 1
    },
    dateBadge: {
      width: '80px',
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      padding: theme.spacing.unit
    },
    dateBadgeDay: {
      fontSize: '26px'
    },
      dateBadgeMonth: {
        fontSize: '20px'
    },
    event: {
      display: 'flex',
      backgroundColor: theme.palette.grey["200"],
      margin: theme.spacing.unit,
    },
    title: {
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      display: 'flex',
      width: '100%'
    },
	grid: {
	  height: '60vh',
	  "overflow-y": 'auto',
	  "overflow-x": 'hidden'
	},
	complete: {
      justifyContent: 'center',
      flexDirection: 'column',
      display: 'flex',
	  marginLeft: '20px',
	  color: 'green'
    }
  })
}

class SummaryRender extends React.Component {
	state = {
		value: 0,
	};
	handleChange = (event, value) => {
		this.setState({ value });
	};
  render() {
    const { classes, events } = this.props;
	console.log(events)
	const { value } = this.state;
    let eventText = '';
    let previousDate = events? events[0].start: '';
	let today = new Date();
    //events.push({start:'asded'});
    return (
		<div className={classes.grid}>
			<Tabs value={value} onChange={this.handleChange} centered>
				<Tab label="Previous" />
				<Tab label="Current" />
				<Tab label="Upcoming" />
			</Tabs>
			{value === 0 && <Grid justify="center" className = {classes.root} container spacing={24}>
        
				{
					events && events.map((event, eventIndex) => {
					  if(moment(event.start).isBefore(moment(today))) {
						let textToRender = event.title;
						let dateToRender = event.start;
						eventText = event.title;
						previousDate = event.start;
						return (
						<Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
						  <Event key={eventIndex} classes={classes} event={{start:dateToRender, title: textToRender}} medStatus = {event.medStatus}/>     
						</Grid>
					  )
					} else {
					  eventText += eventText == ''?event.title:(', ' + event.title);
					  return (<span key={eventIndex}/>)
					}

					})
				}
			</Grid>}
			{value === 1 && <Grid justify="center" className={classes.root} container spacing={24}>
        
				{
					events && events.map((event, eventIndex) => {
					  if(moment(event.start).isSame(moment(today))) {
						let textToRender = event.title;
						let dateToRender = event.start;
						eventText = event.title;
						previousDate = event.start;
						return (
						<Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
						  <Event key={eventIndex} classes={classes} event={{start:dateToRender, title: textToRender}} medStatus = {event.medStatus}/>     
						</Grid>
					  )
					} else {
					  eventText += eventText == ''?event.title:(', ' + event.title);
					  return (<span key={eventIndex}/>)
					}

					})
				}
			</Grid>}
			{value === 2 && <Grid justify="center" className={classes.root} container spacing={24}>
        
				{
					events && events.map((event, eventIndex) => {
					  if(moment(event.start).isAfter(moment(today))) {
						let textToRender = event.title;
						let dateToRender = event.start;
						eventText = event.title;
						previousDate = event.start;
						return (
						<Grid item xs={12} sm={10} md={6} lg={6} xl={4}>
						  <Event key={eventIndex} classes={classes} event={{start:dateToRender, title: textToRender}} medStatus = {event.medStatus}/>     
						</Grid>
					  )
					} else {
					  eventText += eventText == ''?event.title:(', ' + event.title);
					  return (<span key={eventIndex}/>)
					}

					})
				}
			</Grid>}
		</div>
    )
  }
}


const Event = (props) => {
  const { classes, event: { start, title } , medStatus} = props;
  const eventStart = moment(start);
  return (
    <div className={classes.event}>
      <div className={classes.dateBadge}>
        <div className={classes.dateBadgeDay}>
          {eventStart.format('DD')}
        </div>
        <div className={classes.dateBadgeMonth}>
          {eventStart.format('MMM')}
        </div>
        <small>{eventStart.format('YYYY')}</small>
      </div>
      <div className={classes.title}>
        <Typography variant="title" gutterBottom>{ title }</Typography>
      </div>
	  <div className={classes.complete}>
	  {
		 medStatus ? <CompleteIcon /> : ''
	  }
	  </div>
    </div>
  )
}

export default withStyles(styles)(SummaryRender);