import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Today from '@material-ui/icons/Today';
import ZoomIn from '@material-ui/icons/ZoomIn';
import DateRange from '@material-ui/icons/DateRange';
import ZoomOut from '@material-ui/icons/ZoomOut';
import Assignment from '@material-ui/icons/Assignment';
import ListIcon from '@material-ui/icons/List';
import FileDownloadIcon from '@material-ui/icons/FileDownload';
import Button from '@material-ui/core/Button';
import EventRender from '../custom-render/EventRender';
import ToolbarRender from '../custom-render/ToolbarRender';
import HeaderRender from '../custom-render/HeaderRender';
import DayHeaderRender from '../custom-render/DayHeaderRender';
import { Table, TableBody, TableCell, TableRow, TableHead, Typography } from '@material-ui/core';
import { fromJS, List } from 'immutable';
import SummaryRender from '../custom-render/SummaryRender';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DateCellWrapperRender from '../custom-render/DateCellWrapperRender';
import RegimeView from '../custom-render/RegimeView';
import Notes from '../notes/Notes';
import Avatar from '@material-ui/core/Avatar';
import { invertColor } from '../../utils/color';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import { formatDates } from '../../utils/date';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EmailSendContainer from '../../containers/EmailSendContainer';
import AddCycle from '../cycle/AddCycle';
BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

const styles = theme => {
  return ({
    rootWithLegend: {
      minHeight: '920px'
    },
    rootWithoutLegend: {
      minHeight: '920px'
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    bigCalendar: {
      fontFamily: theme.typography.fontFamily,
      '& .rbc-date-cell': {
        padding: '0'
      }
    },
    calendarContainer: {
      padding: theme.spacing.unit * 2
    },
    tableRoot: {
      marginTop: theme.spacing.unit * 5
    },
    viewButtonContaienr: {
      textAlign: 'right',
      margin: '0px 35px'
    },
    button: {
      margin: `0 2px`,
      padding: '2px 8px',
      minWidth: '42px'
    },
    cycleInfo: {
      padding: theme.spacing.unit * 2,
      margin: `0 ${theme.spacing.unit * 4}px`
    },
    cycleTitle: {
      display: 'inline-block'
    },
    avatar: {
      height: '24px',
      width: '24px',
      display: 'inline-flex',
      fontSize: '12px',
      margin: '0 8px'
    },
    cycleName: {
      fontSize: '14px',
      fontFamily: theme.typography.fontFamily,
    },
    iconLeft: {
      marginRight: theme.spacing.unit
    },
    undoRedoContainer: {
      position: 'fixed',
      top: '90px',
      left: '25px'
    },
    viewEventInfo: {
      fontFamily: theme.typography.fontFamily,
      fontSize: '18px'
    },
    eventInfo: {
      marginBottom: theme.spacing.unit * 2
    },
    eventTitle: {
      margin: '0 35px'
    },
	btnbar: {
		backgroundColor: '#f3f3f3',
		margin: '0 15px 0 15px',
		padding: '10px'
	},
	actionBtn: {
		paddingRight: theme.spacing.unit*2,
		paddingLeft: theme.spacing.unit*2
	},
	innerContainer: {
      flexGrow: 1
    },
	patientHeader: {
		backgroundColor: '#d9e5e5',
		top: '75px',
		left: 0,
		padding: '15px',
		color: '#1a2889',
		borderRadius: '5px'
	},
	medicineContainer: {
		border: '1px solid #ccc',
		marginTop: '5px',
		marginBottom: '10px',
		width: '340px',
		borderRadius: '5px',
		maxHeight: '400px'
	},
	medicineTableHeader: {
		fontWeight: 'bold',
		fontSize: '12px',
		padding: '5px',
		textAlign:'center',
		color: '#fff',
		backgroundColor: '#94959d'
	},
	medicineRow: {
		fontSize: '12px',
		padding: '5px',
		color: '#fff',
		textAlign:'center'
	}
  })
}

const viewType = {
  CALENDAR: 'CALENDAR',
  SUMMARY: 'SUMMARY',
  REGIME: 'REGIME'
}

const color = [
	'#e6f0f1', '#D5EFF4', '#d5efed', '#d5e1e3', '#d3e4e7', '#d0e4e7', '#c1c9ce', '#b4cbd9', '#9ac6e1' 
]

let colorIndex = 0;
class ViewEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showLegend: false,
      selectedGroupId: null,
      viewType: viewType.CALENDAR,
      originalEvent: null,
      calendarHeight: 920,
	  emailModal: false,
	  docFile:null,
	  cycleModal: false
    }
  }

  componentDidMount() {
    const hospitalId = this.props.user.hospitalId;
    this.props.fetchEventById(this.props.match.params.id, hospitalId);
    this.props.fetchNotesByEventId({eventId: this.props.match.params.id});
  }

  componentWillUnmount() {
    this.props.clearEvent({});
    this.props.clearUndoRedo();
  }
  
  
  handleClickOpen = () => {
	var fileBlob = null;
	const elementsToHide = Array.from(this.calendarRef.getElementsByClassName('hide-for-download'));
    elementsToHide.map((element) => {
      element.style.display = 'none';
    });
    
    html2canvas(this.calendarRef, {
      logging: false
    })
      .then((canvas) => {
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210; 
        var pageHeight = 295;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        var doc = new jsPDF('p', 'mm', 'a4',true);
        var position = 0;
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight,undefined ,'FAST');
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight,undefined ,'FAST');
          heightLeft -= pageHeight;
        }
        //doc.save(this.props.event.eventName);
        elementsToHide.map((element) => {
          element.style.display = 'block';
        });
		fileBlob = doc.output('blob');
		this.setState({ emailModal: true, docFile: fileBlob});
      });
    
  }
  
  handleClose = () => {
    this.setState({ emailModal: false });
  }
  
  handleCycleOpen = () => {
    this.setState({ cycleModal: true });
  }
  
  handleCycleClose = () => {
    this.setState({ cycleModal: false });
  }

  generateEvents = () => {
    const { event } = this.props;
    let eventList = [];
    event && event.cycles && event.cycles.map((cycle, cycleIndex) => {
      cycle && cycle.medicines && cycle.medicines.map((medicine, medicineIndex) => {
        const groupId = `${cycleIndex}-${medicineIndex}`;
        medicine && medicine.days && medicine.days.map((day, dayIndex) => {
          const startDate = moment(day);
          const endDate = moment(day);
          const cycleStartDateFormated = moment(cycle.cycleStartDate).format('YYYY-MM-DD');
          const cycleStartDate = moment(cycleStartDateFormated);
          let currentRepetition = 1;
          for(let i = 0; i  < cycle.repetition ; i++) {
            if(
              cycleStartDate.clone().add(i * cycle.cycleLength, 'days').isSameOrBefore(startDate) &&
              cycleStartDate.clone().add((i + 1) * cycle.cycleLength + 1, 'days').isSameOrAfter(startDate)
            ) {
              currentRepetition = i + 1;
            }
          }
		  let medStatus = null;
		  medicine.completeStatus.map((item, index) => {
			medStatus = item.medicineDate == day ? item.status : '';
		  });
		  
          const newEvent = {
            timeSlot: event.timeSlot,
            title: medicine.name,
            start: startDate,
            end: endDate,
            groupId,
            bgColor: medicine.medicineColor,
            eventIndex: dayIndex,
            cycleIndex,
            medicineIndex,
            cycleLength: cycle.cycleLength,
            cycleRepetition: cycle.repetition,
            cycleStartDate: cycle.cycleStartDate,
            cycleEndDate: cycle.cycleEndDate,
            cycleColor: cycle.cycleColor,
            cycleName: cycle.cycleName,
            currentRepetition,
			medStatus : medStatus
          };
          eventList.push(newEvent);
        })
      });
    })

    eventList = this.sortEventsByDate(eventList);

    return eventList;
  }

  sortEventsByDate = (events) => {
    return events.sort((prev, next) => {
      return prev.start - next.start;
    })
  }

  deleteOne = (event) => {
    let newEvent = fromJS(this.props.event);
    let medicineDays = newEvent.getIn(['cycles', event.cycleIndex, 'medicines', event.medicineIndex, 'days']);
    medicineDays = medicineDays.splice(event.eventIndex, 1);
    newEvent = newEvent.setIn(['cycles', event.cycleIndex, 'medicines', event.medicineIndex, 'days'], medicineDays);
    this.props.updateEvent(newEvent.toJS(), 'Successfully deleted...');
  }

  deleteSeries = (event) => {
    let newEvent = fromJS(this.props.event);
    let medicineDays = newEvent.getIn(['cycles', event.cycleIndex, 'medicines', event.medicineIndex, 'days']);
    const selectedDate = moment(event.start);
    medicineDays = medicineDays.filter((day) => {
      const mDay = moment(day);
      return mDay.isBefore(selectedDate, 'day');
    });
    newEvent = newEvent.setIn(['cycles', event.cycleIndex, 'medicines', event.medicineIndex, 'days'], medicineDays);
    this.props.updateEvent(newEvent.toJS(), 'Successfully deleted...');
  }

  deleteAllEventsOfOneDay = (date) => {
    let newEvent = fromJS(this.props.event);
    let updatedEventList = fromJS(this.props.event);
    const selectedDate = moment(date).format();
    newEvent.get('cycles').map((cycle, cycleIndex) => {
      cycle.get('medicines').map((medicine, medicineIndex) => {
        medicine.get('days').map((day, dayIndex) => {
          const newDay = moment(day);
          const newDate = moment(selectedDate);
          if (newDay.isSame(newDate, 'day')) {
            updatedEventList = updatedEventList.deleteIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'days', dayIndex]);
          }
        })
      });
    });
    this.props.updateEvent(updatedEventList.toJS(), 'Successfully deleted all the events on the selected date');
  }

  moveAllEventsOfOneDay = (date, moveToDate, effectAllCycles) => {
    let newEvent = fromJS(this.props.event);
    let updatedEventList = fromJS(this.props.event);
    const selectedDate = moment(date).format();
    const selectedMoveDate = moment(moveToDate).format();
    const diffInDays = moment(moveToDate).diff(moment(date), 'days');
    newEvent.get('cycles').map((cycle, cycleIndex) => {
      cycle.get('medicines').map((medicine, medicineIndex) => {
        medicine.get('days').map((day, dayIndex) => {
          const newDay = moment(day);
          const newDate = moment(selectedDate);
          if (newDay.isSame(newDate, 'day')) {
            updatedEventList = updatedEventList.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'days', dayIndex], moment(selectedMoveDate).format('YYYY-MM-DD'));
          } else if(effectAllCycles && newDay.isAfter(newDate, 'day')) {
            updatedEventList = updatedEventList.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'days', dayIndex], newDay.clone().add(diffInDays, 'days').format('YYYY-MM-DD'));
          }
        })
      });
      if( moment(date).isAfter(moment(updatedEventList.getIn(['cycles', cycleIndex, 'cycleStartDate']))) && moment(date).isBefore(moment(updatedEventList.getIn(['cycles', cycleIndex, 'cycleEndDate']))) ) {
        updatedEventList = updatedEventList.setIn(['cycles', cycleIndex, 'cycleEndDate'], moment(updatedEventList.getIn(['cycles', cycleIndex, 'cycleEndDate'])).add(diffInDays, 'days'));
      } else if(moment(date).isBefore(moment(updatedEventList.getIn(['cycles', cycleIndex, 'cycleStartDate'])))) {
        updatedEventList = updatedEventList.setIn(['cycles', cycleIndex, 'cycleEndDate'], moment(updatedEventList.getIn(['cycles', cycleIndex, 'cycleEndDate'])).add(diffInDays, 'days'));
        updatedEventList = updatedEventList.setIn(['cycles', cycleIndex, 'cycleStartDate'], moment(updatedEventList.getIn(['cycles', cycleIndex, 'cycleStartDate'])).add(diffInDays, 'days'));
      }
    });
    this.props.updateEvent(updatedEventList.toJS(), 'Successfully moved all the events on the selected date');
  }

  addEventToADay = (cycleInfo, medicine, date, frequency, applytoAllRepetition, strength, duration, type ) => {
    let newEvent = fromJS(this.props.event);
    let days = new List();
    if(applytoAllRepetition) {
      [...Array(parseInt(cycleInfo.repetition))].map((temp, rep) => {
        const formatedDates = formatDates(moment(cycleInfo.cycleStartDate).add(rep * parseInt(cycleInfo.cycleLength), 'days'), frequency);
        days = days.concat(formatedDates);
      });
    } else {
      const formatedDates = formatDates(moment(cycleInfo.cycleStartDate), frequency);
      days = days.concat(formatedDates);
    }
    const medicineColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    const medicineDate = days.filter((day, dayIndex) => {
      return moment(day).isSameOrAfter(moment(date));
    });
    const newMedicine = {
      days: medicineDate.toJS(),
      name: medicine && medicine.value,
      medicineColor,
      frequency,
	  duration: duration+ ' mins',
	  strength: strength+' mg',
	  type: type && type.value
    }

    newEvent.get('cycles').map((cycle, cycleIndex) => {
      if(cycle.get('_id') === cycleInfo._id) {
        newEvent = newEvent.updateIn(['cycles', cycleIndex, 'medicines'], updater => updater.push(newMedicine))
      }
    });
    this.props.updateEvent(newEvent.toJS(), 'Successfully added new Drug...');
  }
  completeMedStatus = (event, status) => {
	console.log('on complete med status')
	//console.log('event',event)
	let newEvent = fromJS(this.props.event);
    let medicineDays = newEvent.getIn(['cycles', event.cycleIndex, 'medicines', event.medicineIndex, 'days']);
	console.log(medicineDays)
    medicineDays = medicineDays.get(event.eventIndex);
	console.log('medicineDays', medicineDays);
	let medStatus = newEvent.getIn(['cycles', event.cycleIndex, 'medicines', event.medicineIndex, 'completeStatus'])
	let completeStatus = {'medicineDate': medicineDays, 'status': status, 'completionDate': new Date()};
	if(!medStatus) {
		medStatus = []
	}
	medStatus.push(completeStatus);
    newEvent = newEvent.setIn(['cycles', event.cycleIndex, 'medicines', event.medicineIndex, 'completeStatus'], medStatus);
    this.props.updateEvent(newEvent.toJS(), 'Successfully deleted...');
  }
  moveOne = (event, moveToDate) => {
    let newEvent = fromJS(this.props.event);
    let medicineDays = newEvent.getIn(['cycles', event.cycleIndex, 'medicines', event.medicineIndex, 'days']);
    const moveToDateTemp = moment(moveToDate);
    medicineDays = medicineDays.set(event.eventIndex, moveToDateTemp.format('YYYY-MM-DD'));
    newEvent = newEvent.setIn(['cycles', event.cycleIndex, 'medicines', event.medicineIndex, 'days'], medicineDays);
    this.props.updateEvent(newEvent.toJS(), 'Successfully moved...');
  }

  moveSeries = (event, moveToDate, effectAllCycles) => {
    let newEvent = fromJS(this.props.event);
    let medicineDays = newEvent.getIn(['cycles', event.cycleIndex, 'medicines', event.medicineIndex, 'days']);
    const moveToDateTemp = moment(moveToDate);
    const firstEventDate = moment(medicineDays.get(event.eventIndex));
    const moveDaysBy = moveToDateTemp.diff(firstEventDate, 'days');
    const selectedDate = moment(event.start);
    const diffInDays = moveToDateTemp.diff(moment(selectedDate), 'days');
    if(effectAllCycles && diffInDays > 0 && newEvent.get('cycles').size > event.cycleIndex + 1) {
      const cycles = newEvent.get('cycles');
      cycles.map((cycle, cycleIndex) => {
        const cycleBeginFrom = cycle.get('beginFrom');
        if(cycleBeginFrom === 'END_OF_PREV' && cycleIndex > event.cycleIndex) {
          newEvent = newEvent.setIn(['cycles', event.cycleIndex, 'cycleEndDate'], moment(event.cycleStartDate).add(diffInDays, 'days'));
          newEvent = newEvent.setIn(['cycles', cycleIndex, 'cycleStartDate'], moment(cycle.get('cycleStartDate')).add(diffInDays, 'days'));
          newEvent = newEvent.setIn(['cycles', cycleIndex, 'cycleEndDate'], moment(cycle.get('cycleEndDate')).add(diffInDays, 'days'));
          const cycleMedicines = newEvent.getIn(['cycles', cycleIndex, 'medicines']);
          cycleMedicines.map((cycleMedicine, cycleMedicineIndex) => {
            const cycleMedicineDays = cycleMedicine.get('days');
            cycleMedicineDays.map((cycleMedicineDay, cycleMedicineDayIndex) => {
              newEvent = newEvent.setIn(['cycles', cycleIndex, 'medicines', cycleMedicineIndex, 'days', cycleMedicineDayIndex], moment(cycleMedicineDay).add(diffInDays, 'days'));
            })
          });
        }
      });
    }
    medicineDays.map((day, dayIndex) => {
      const medDay = moment(day);
      if(!medDay.isBefore(selectedDate, 'day')) {
        const newDay = moment(day).add(moveDaysBy, 'days').format('YYYY-MM-DD');
        medicineDays = medicineDays.set(dayIndex, newDay);
      }
    });
    newEvent = newEvent.setIn(['cycles', event.cycleIndex, 'medicines', event.medicineIndex, 'days'], medicineDays);
    this.props.updateEvent(newEvent.toJS(), 'Successfully moved...');
  }

  getEventGroups = (events) => {
    let eventGroup = events.filter((event, index, self) =>
      index === self.findIndex((t) => (
        t.groupId === event.groupId
      ))
    )
    return eventGroup;
  }

  eventStyleGetter = (event) => {
	const style = {
      backgroundColor: this.state.showLegend || this.state.selectedGroupId === event.groupId ? event.bgColor : 'inherit',
	  border: this.state.showLegend ? 'none' : `1px solid ${event.bgColor}`,
      borderRadius: '40px',
      margin: '1px 12px',
      position: 'relative',
      padding: '0px'
    }
    return {
      style
    }
  }

  toggleLegendView = () => {
    this.setState({ showLegend: !this.state.showLegend });
  }

  setSelectedGroupId = (groupId, callback) => {
    this.setState({ selectedGroupId: groupId });
  }

  onViewChange = (type) => {
    this.setState({ viewType: type });
  }

  saveCalendarAsPDF = () => {
    const elementsToHide = Array.from(this.calendarRef.getElementsByClassName('hide-for-download'));
    elementsToHide.map((element) => {
      element.style.display = 'none';
    });
    
    html2canvas(this.calendarRef, {
      logging: false
    })
      .then((canvas) => {
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210; 
        var pageHeight = 295;  
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        var doc = new jsPDF('p', 'mm', 'a4',true);
        var position = 0;
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight,undefined ,'FAST');
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight,undefined ,'FAST');
          heightLeft -= pageHeight;
        }
        doc.save(this.props.event.eventName);
        elementsToHide.map((element) => {
          element.style.display = 'block';
        });
      });
  }

  showMore = () => {
    this.setState({ calendarHeight: this.state.calendarHeight + 100 });
  }

  showLess = () => {
    this.setState({ calendarHeight: this.state.calendarHeight - 100 });
  }

  updateCycle = (cycleObj) => {
	  let newEvent = fromJS(this.props.event);
	  newEvent = newEvent.updateIn(['cycles'], updater => updater.push(cycleObj))
	  this.props.updateEvent(newEvent.toJS(), 'Cycle Added...');
	  this.setState({ cycleModal: false });
  }
  render() {
    const { classes, onUndo, onRedo, canRedo, canUndo, event, fetchNotesByEventId, notes } = this.props;
    const events = this.generateEvents();
    const eventGroup = this.getEventGroups(events);
	const drugTypeOption = [{
		  label: 'Oral',
		  value: 'Oral'
		}, {
		  label: 'Injection',
		  value: 'Injection'
		}, {
		  label: 'Radiation',
		  value: 'Radiation'
		}]
    
    if(!event) return '';
    const defaultDate = new Date(event.beginDate);
    const eventInfo = event && (
      <div className = {classes.patientHeader}>
		<Grid container spacing={0}>
			<Grid item xs={4} sm={4} md={4} lg={4}>
				<span>Regime: <strong>{event.eventName}</strong></span>
			</Grid>
			<Grid item xs={4} sm={4} md={4} lg={4}>
				{
				  event.patientName ? <span>Patient: <strong>{event.patientName}</strong></span>: ''
				}
			</Grid>
			<Grid item xs={4} sm={4} md={4} lg={4}>
				<span>Start Date: <strong>{moment(event.beginDate).format('YYYY-MM-DD')}</strong></span>
			</Grid>
		</Grid> 
      </div>
    );
    return (
      <Paper className={classes.paper} square elevation={6}>
        <div className={classes.viewButtonContaienr}>
          <Button title="Calendar View" onClick={() => this.onViewChange(viewType.CALENDAR)} size="small" className={classes.button} variant="outlined" color={this.state.viewType === viewType.CALENDAR ? 'secondary': 'default'}>
            <DateRange />
          </Button>
          <Button title="Regime View" onClick={() => this.onViewChange(viewType.REGIME)} size="small" className={classes.button} variant="outlined" color={this.state.viewType === viewType.REGIME ? 'secondary': 'default'}>
            <ListIcon />
          </Button>
          <Button title="Summary View" onClick={() => this.onViewChange(viewType.SUMMARY)} size="small" className={classes.button} variant="outlined" color={this.state.viewType === viewType.SUMMARY ? 'secondary': 'default'}>
            <Assignment />
            
          </Button>
          <Button onClick={() => this.showLess()} size="small" className={classes.button} variant="outlined" color='secondary'>
            <ZoomOut />
          </Button>
          <Button onClick={() => this.showMore()} size="small" className={classes.button} variant="outlined" color='secondary'>
            <ZoomIn />
          </Button>
          <Button onClick={onUndo} size="small" className={classes.button} variant="outlined" disabled={!canUndo} color="secondary">
            <Undo />
          </Button>
          <Button onClick={onRedo} size="small" className={classes.button} variant="outlined" disabled={!canRedo} color="secondary">
            <Redo />
          </Button>
          <Button title="Download as PDF"  onClick={() => this.saveCalendarAsPDF()} size="small" className={classes.button} variant='outlined' color='secondary'>
            <FileDownloadIcon />
          </Button>
        </div>
        {
          this.state.viewType === viewType.CALENDAR && (
            <Grid container>
              <Grid  item xs={9}>
                <div className={classes.calendarContainer} ref={ref => this.calendarRef = ref}>
                  <div className={classes.eventTitle}>
                    {
                      event && (
                        <div className={classes.eventInfo}>
                          <Typography className={classes.viewEventInfo} variant='display1'>{eventInfo}</Typography>
                        </div>
                      )
                    }
                  </div>
                  <Grid container style={{height: `${this.state.calendarHeight}px`}} className={this.state.showLegend ? classes.rootWithLegend : classes.rootWithoutLegend}>
                    <Grid item xs={this.state.showLegend ? 8 : 12}>
                      <BigCalendar
                        startAccessor='start'
                        endAccessor='end'
                        events={events}
                        views={allViews}
                        step={60}
                        showMultiDayTimes
                        defaultDate={defaultDate}
                        eventPropGetter={(this.eventStyleGetter)}
                        onDrillDown={() => {}}
                        className={classes.bigCalendar}
                        height={this.state.calendarHeight}
                        components={{
                          dateCellWrapper: DateCellWrapperRender,
                          event: (props) => <EventRender 
                            setSelectedGroupId={this.setSelectedGroupId}
                            showLegend={this.state.showLegend}
                            deleteSeries={this.deleteSeries}
                            deleteOne={this.deleteOne}
                            moveOne={this.moveOne}
                            moveSeries={this.moveSeries}
							completeStatus={this.completeMedStatus}
                            {...props}/>,
                          toolbar: (props) => <ToolbarRender 
                            saveCalendarAsPDF={this.saveCalendarAsPDF}
                            showLegend={this.state.showLegend}
                            toggleLegendView={this.toggleLegendView}
                            {...props}/>,
                          month: {
                            header: HeaderRender,
                            dateHeader: (props) => <DayHeaderRender event={this.props.event} deleteAllEventsOfOneDay={this.deleteAllEventsOfOneDay} 
							moveAllEventsOfOneDay={this.moveAllEventsOfOneDay} addEventToADay={this.addEventToADay} drugTypeOption={drugTypeOption} {...props}/>
                          },
                        }}
                      />
                    </Grid>
                    {
                      this.state.showLegend && (
                        <Grid item xs={4}>
                          <Table className={classes.tableRoot}>
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  Medicine Name
                                </TableCell>
                                <TableCell>
                                  Medicine
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {
                                eventGroup.map((medicine, index) => {
                                  return (
                                    <TableRow key={index}>
                                      <TableCell>{medicine.title}</TableCell>
                                      <TableCell style={{backgroundColor: medicine.medicineColor}}></TableCell>
                                    </TableRow>
                                  )
                                })
                              }
                            </TableBody>
                          </Table>
                        </Grid> 
                      )
                    }
                  </Grid>
                  <Paper className={classes.cycleInfo}>
                    {
                      this.props.event && this.props.event.cycles && this.props.event.cycles.map((cycle, cycleIndex) => {
                        return (
                          <div key={cycleIndex} className={classes.cycleTitle}>
                            <Avatar
                              className={classes.avatar}
                              style={{
                                backgroundColor: cycle.cycleColor,
                                color: invertColor(cycle.cycleColor, true)
                              }}
                            >
                              {cycleIndex + 1}
                            </Avatar>
                            <span className={classes.cycleName}>
                              {cycle.cycleName}
                            </span>
                          </div>
                        )
                      })
                    }
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={3} className={classes.calendarContainer}>
				<div>
					<Grid item xs={3} >
					  <Table className={classes.medicineContainer}>
						<TableHead>
						  <TableRow>
							<TableCell className={classes.medicineTableHeader}>
							  Drugs Name
							</TableCell>
							<TableCell className={classes.medicineTableHeader}>
							  Drugs Strength
							</TableCell>
							<TableCell className={classes.medicineTableHeader}>
							  Drugs Duration
							</TableCell>
							<TableCell className={classes.medicineTableHeader}>
							  Drugs Type
							</TableCell>
						  </TableRow>
						</TableHead>
						<TableBody>
						{
							this.props.event && this.props.event.cycles && this.props.event.cycles.map((cycle, cycleIndex) => {
								return (
								cycle.medicines.map((medicine, index) => {
									colorIndex = color.length - 2 == colorIndex ? 0 : colorIndex + 1
                                  return (
                                    <TableRow key={index}>
                                      <TableCell className = {classes.medicineRow} style = {{backgroundColor: medicine.medicineColor}}>{medicine.name}</TableCell>
                                      <TableCell className = {classes.medicineRow} style = {{backgroundColor: color[colorIndex], color: '#000'}}>{medicine.strength}</TableCell>
									  <TableCell className = {classes.medicineRow} style = {{backgroundColor: color[colorIndex+1], color: '#000'}}>{medicine.duration}</TableCell>
									  <TableCell className = {classes.medicineRow} style = {{backgroundColor: color[colorIndex+2], color: '#000'}}>{medicine.type}</TableCell>
                                    </TableRow>
                                  )
                                })
								)
							})
						}
						</TableBody>
					  </Table>
					</Grid> 
				</div>
                <Notes notes={notes}/>
				
              </Grid>
            </Grid>
          )
        }
        {
          this.state.viewType === viewType.SUMMARY && (
            <div className={classes.calendarContainer} ref={ref => this.calendarRef = ref}>
              <div className={classes.eventTitle}>
                {
                  event && (
                    <div className={classes.eventInfo}>
                      <Typography className={classes.viewEventInfo} variant='display1'>{eventInfo}</Typography>
                    </div>
                  )
                }
              </div>
              <SummaryRender events={events} />
            </div>
          )
        }
        {
          this.state.viewType === viewType.REGIME && (
            <div className={classes.calendarContainer} ref={ref => this.calendarRef = ref}>
              <div className={classes.eventTitle}>
                {
                  event && (
                    <div className={classes.eventInfo}>
                      <Typography className={classes.viewEventInfo} variant='display1'>{eventInfo}</Typography>
                    </div>
                  )
                }
              </div>
              <RegimeView event={event} />
            </div>
          )
        }
		{
          this.state.viewType === viewType.CALENDAR ? <div className={classes.btnbar}>
			<Button variant="raised"
                  color="primary"
                  size="small"
				  className={classes.button}
				  onClick={() => this.handleClickOpen()}>
				Email
			</Button>
			<Button variant="raised"
                  color="primary"
                  size="small"
				  className={classes.button}
				  onClick={() => this.handleCycleOpen()}>
				Add New Cycle
			</Button>
		</div> : <div className={classes.btnbar}>
			<Button variant="raised"
                  color="primary"
                  size="small"
				  className={classes.button}
				  onClick={() => this.handleClickOpen()}>
				Email
			</Button>
		</div>
        }
		<Dialog
            fullWidth
            open={this.state.emailModal}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <EmailSendContainer emailFile = {this.state.docFile} eventName = {event.eventName} 
			  patientName = {event.patientName} beginDate = {moment(event.beginDate).format('YYYY-MM-DD')} viewType = {this.state.viewType}/>
            </DialogContent>
        </Dialog>
		<Dialog
            fullWidth
			maxWidth = 'md'
            open={this.state.cycleModal}
            onClose={this.handleCycleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
				<AddCycle updateCycle = {this.updateCycle} drugTypeOption = {drugTypeOption} />
            </DialogContent>
        </Dialog>
      </Paper>
    )
  }
}

export default withStyles(styles)(ViewEvent);