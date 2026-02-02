import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fade from '@material-ui/core/Fade';
import DeleteForever from '@material-ui/icons/DeleteForever';
import OpenWith from '@material-ui/icons/OpenWith';
import AddCircle from '@material-ui/icons/AddCircle';
import Modal from '../commons/Modal';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import medicineList from '../../data/medicineList.json';
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const styles = theme => {
  return ({
    root: {
      display: 'inline-table',
      padding: '4px'
    },
    label: {
      display: 'table-cell',
      padding: theme.spacing.unit
    },
    iconButton: {
      fontSize: '14px',
      height: '32px',
      width: '32px',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white
      }
    },
    listItemIconMove: {
      color: theme.palette.primary.main
    },
    listItemIconDelete: {
      color: theme.palette.error.main
    },
    title: {
      display: 'inline-block',
      color: theme.palette.secondary.main,
      position: 'absolute',
      left: '15px',
      top: '5px'
    },
    dateForm: {
      width: '100%'
    },
    modal: {
      fontFamily: theme.typography.fontFamily
    },
    addMedicineField: {
      width: '400px',
      marginBottom: theme.spacing.unit * 8
    },
    addMedicineTitle: {
      marginBottom: theme.spacing.unit * 4
    },
    select: {
      textAlign: 'left',
      margin: '4px 0',
      '& .Select-value' : {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      },
      '& .Select-control' : {
        height: '31px',
        fontFamily: theme.typography.fontFamily
      },
      '& .Select-menu-outer': {
        fontFamily: theme.typography.fontFamily
      }
    },
    note: {
      margin: theme.spacing.unit,
      fontSize: '12px',
      color: theme.palette.primary.light
    }
  })
}

class DayHeaderRender extends React.Component {
  state = {
    anchorEl: null,
    addModal: false,
    deleteAllModal: false,
    moveAllModal: false,
    moveToDate: '',
    medicine: null,
    frequency: null,
    applytoAllRepetition: false,
    currentCycle: null,
    effectAllCycles: false,
	strength: null,
	duration: null,
	type: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, addModal: false, deleteAllModal: false, moveAllModal: false, moveToDate: '', medicine: null, applytoAllRepetition: false, 
	currentCycleInfo: null, effectAllCycles: false, frequency: null, strength: null, duration: null, type: null });
  };
  
  onDeleteAllModal = () => {
    this.setState({ deleteAllModal: true, anchorEl: null });
  }

  onMoveAllModal = (event) => {
    this.setState({ moveAllModal: true, anchorEl: null, effectAllCycles: false, moveToDate: moment(this.props.date, 'YYYY-MM-DD').format('YYYY-MM-DD') });
  }

  onAddModal = () => {
    const { event } = this.props;
    let currentCycle = null;
    event && event.cycles && event.cycles.map((cycle, cycleIndex) => {
      const cycleStartDate = moment(cycle.cycleStartDate).format('YYYY-MM-DD');
      const cycleEndDate = moment(cycle.cycleEndDate).format('YYYY-MM-DD');
      const selectedDate = moment(this.props.date).format('YYYY-MM-DD');
      if (moment(selectedDate).isSameOrAfter(moment(cycleStartDate)) && moment(selectedDate).isSameOrBefore(moment(cycleEndDate))) {
        currentCycle = cycle;
      }
    });

    this.setState({ addModal: true, anchorEl: null, currentCycle });
  }

  onDeleteAll = () => {
    this.props.deleteAllEventsOfOneDay(this.props.date);
    this.setState({ anchorEl: null, deleteAllModal: false });
  }

  onAdd = () => {
    this.props.addEventToADay(this.state.currentCycle, this.state.medicine, this.props.date, this.state.frequency, this.state.applytoAllRepetition, this.state.strength, this.state.duration,
	this.state.type);
    this.setState({ anchorEl: null, medicine: null, applytoAllRepetition: false, currentCycleInfo: null, addModal: false, frequency: null, strength: null, duration: null, type: null });
  }

  onMoveAll = () => {
    this.props.moveAllEventsOfOneDay(this.props.date, this.state.moveToDate, this.state.effectAllCycles);
    this.setState({ anchorEl: null, moveAllModal: false, moveToDate: '', effectAllCycles: false });
  }

  onChangeMoveToDate = (event) => {
    this.setState({ moveToDate: event.target.value })
  }

  onChangeMedicine = (medicine) => {
    this.setState({ medicine: medicine });
  }

  onChangeFrequency = (event) => {
    this.setState({ frequency: event.target.value });
  }

  onChangeEffectAllCycles = (event) => {
    this.setState({ effectAllCycles: event.target.checked });
  }
  onChangeApplytoAllRepetition = (event) => {
    this.setState({ applytoAllRepetition: event.target.checked });
  }
  onChangeStrength= (event) => {
    this.setState({ strength: event.target.value });
  }
  onChangeDuration= (event) => {
    this.setState({ duration: event.target.value });
  }
  onChangeType = (type) => {
    this.setState({ type: type });
  }

  render() {
    const { classes, label, date, isOffRange, drugTypeOption } = this.props;
    const { anchorEl, deleteAllModal, moveAllModal, addModal, medicine, currentCycle, frequency, type, strength, duration } = this.state;
    const selectedDate = moment(date);
    return (
      <div className={`${classes.root}`}>
        <IconButton 
          color="inherit"
          className={classes.iconButton}
          aria-owns={anchorEl ? 'fade-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color={isOffRange ? 'default' : 'secondary'}
        >
          {label}
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={this.onAddModal}>
            <ListItemIcon className={classes.listItemIconMove}>
              <AddCircle color="primary"/>
            </ListItemIcon>
            <ListItemText>
              Add Drug(s)
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={this.onMoveAllModal}>
            <ListItemIcon className={classes.listItemIconMove}>
              <OpenWith color="primary"/>
            </ListItemIcon>
            <ListItemText>
              Move All
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={this.onDeleteAllModal}>
            <ListItemIcon className={classes.listItemIconDelete}>
              <DeleteForever color="error" />
            </ListItemIcon>
            <ListItemText>
              Delete All
            </ListItemText>
          </MenuItem>
        </Menu>
        <Modal 
          open={deleteAllModal}
          title="Are you sure you want to delete"
          subTitle={<div>All the events on <strong>{selectedDate.format("LL")}</strong></div>}
          handleAgree={this.onDeleteAll}
          handleClose={this.handleClose}
        />
        <Modal
          className={classes.modal}
          open={moveAllModal}
          title="Are you sure you want to move"
          subTitle={<DateForm 
            moveToDate={this.state.moveToDate}
            classes={classes}
            onChangeMoveToDate={this.onChangeMoveToDate}
            title={<div>All events on <strong>{selectedDate.format("LL")}</strong> to </div>}
            effectAllCycles={this.state.effectAllCycles}
            onChangeEffectAllCycles={this.onChangeEffectAllCycles}
          />}
          handleAgree={this.onMoveAll}
          handleClose={this.handleClose}
        />
        <Modal 
          open={addModal}
          title="Current Cycle information"
          subTitle={<AddMedicineForm
            medicine={medicine}
            onChangeMedicine={this.onChangeMedicine}
            title={<div className={classes.addMedicineTitle}>Add Drug to <strong>{selectedDate.format("LL")}</strong></div>}
            classes={classes}
            currentCycle={currentCycle}
            frequency={frequency}
            onChangeFrequency={this.onChangeFrequency}
			drugTypeOption={drugTypeOption}
			onChangeStrength={this.onChangeStrength}
			onChangeDuration={this.onChangeDuration}
			onChangeType={this.onChangeType}
		    type={type}
          />}
          disabled={!this.state.frequency}
          handleAgree={this.onAdd}
          handleClose={this.handleClose}
        />
      </div>
    )
  }
}

const DateForm = (props) => {
  return (
    <FormGroup>
      <TextField 
        label={props.title}
        type={'date'}
        InputLabelProps={{
          shrink: true
        }}
        value={props.moveToDate}
        onChange={props.onChangeMoveToDate}
        className={props.classes.dateForm}
      />
      <FormControlLabel
          control={
            <Switch
              checked={props.effectAllCycles}
              onChange={props.onChangeEffectAllCycles}
              value="effectAllCycles"
              color="primary"
            />
          }
          label="Would you like to adjust all subsequent drugs?"
        />
    </FormGroup>
  )
}

const AddMedicineForm = (props) => {
  const { currentCycle } = props;
  return (
    <div className={props.classes.addMedicineField}>
      {
        currentCycle ? (
          <div style={{
            marginBottom: '16px'
          }}>
            <Typography>
              <span>Cycle Name: <strong>{currentCycle && currentCycle.cycleName}</strong></span>
            </Typography>
            <hr />
            <Typography>
              <span>Cycle Length: <strong>{currentCycle && currentCycle.cycleLength}</strong></span>
            </Typography>
            <hr />
            <Typography>
              <span>Cycle Repetition: <strong>{currentCycle && currentCycle.repetition}</strong></span>
            </Typography>
            <hr />
            <Typography>
              <span>Cycle Start Date: <strong>{moment(currentCycle && currentCycle.cycleStartDate).format('LL')}</strong></span>
            </Typography>
            <hr />
            <Typography>
              <span>Cycle End Date: <strong>{moment(currentCycle && currentCycle.cycleEndDate).format('LL')}</strong></span>
            </Typography>
            <hr />
            {props.title}
            <Select
              value={props.medicine || ''}
              onChange={props.onChangeMedicine}
              options={medicineList}
              valueKey='value'
              labelKey='label'
              placeholder={'Please select the drug'}
              className={props.classes.select}
              optionRenderer={optionRenderer}
              valueRenderer={optionRenderer}
            />
            <TextField 
              label="Enter frequency"
              type='text'
              InputLabelProps={{
                shrink: true
              }}
              value={props.moveToDate}
              onChange={props.onChangeFrequency}
              className={props.classes.dateForm}
            />
			<TextField 
              label="Enter strength (mg)"
              type='text'
              InputLabelProps={{
                shrink: true
              }}
              value={props.moveToDate}
              onChange={props.onChangeStrength}
              className={props.classes.dateForm}
            />
			<TextField 
              label="Enter duration (mins)"
              type='text'
              InputLabelProps={{
                shrink: true
              }}
              value={props.moveToDate}
              onChange={props.onChangeDuration}
              className={props.classes.dateForm}
            />
			<Select
              value={props.type || ''}
              onChange={props.onChangeType}
              options={props.drugTypeOption}
              valueKey='value'
              labelKey='label'
              placeholder={'Please select the drug type'}
              className={props.classes.select}
              optionRenderer={optionRenderer}
              valueRenderer={optionRenderer}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={props.applytoAllRepetition}
                  onChange={props.onChangeApplytoAllRepetition}
                  value="effectAllRepetition"
                  color="primary"
                />
              }
              label="Would you like add to all the repetition"
            />
            <div className={props.classes.note}>
              Note: Calculates from cycle start date and ignores everything before the selected date
            </div>
          </div>
        ) : (
          <div>
            <Typography>
              <span>Please select between cycle range</span>
            </Typography>
            <hr />
          </div>
        )
      }
    </div>
  )
}

const optionRenderer = (option) => {
  return <Typography>
    <span>{option.label}</span>
  </Typography>
}

export default withStyles(styles)(DayHeaderRender);