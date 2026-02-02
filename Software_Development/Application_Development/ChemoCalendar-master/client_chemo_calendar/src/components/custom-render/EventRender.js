import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForever from '@material-ui/icons/DeleteForever';
import OpenWith from '@material-ui/icons/OpenWith';
import Settings from '@material-ui/icons/Settings';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Modal from '../commons/Modal';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { invertColor } from '../../utils/color';
import CompleteIcon from '@material-ui/icons/Done';

const styles = theme => {
  return ({
    root: {
      display: 'inline-block',
      float: 'right',
      height: '18px',
      width: '18px',
      marginRight: '4px',
      '&:hover button' : {
        visibility: 'visible'
      }
    },
    moreIcon: {
      fontSize: '12px',
      fill: 'black'
    },
    iconButton: {
      height: '24px',
      width: '24px',
      visibility: 'hidden'
    },
    gearIconButton: {
      height: '16px',
      width: '16px',
      visibility: 'hidden',
      position: 'absolute',
      right: '3px',
      top: '1px'
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
      left: '-8px',
      top: '-1px'
    },
    dateForm: {
      width: '100%'
    },
    checkbox: {
      fontFamily: theme.typography.fontFamily
    },
    modal: {
      fontFamily: theme.typography.fontFamily
    },
    avatar: {
      height: '20px',
      width: '22px',
      display: 'inline-flex',
      fontSize: '10px',
      margin: '0 8px',
    },
    titleText: {
      display: 'inline-block',
      textOverflow: 'ellipsis',
      width: '150px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      position: 'absolute',
      textAlign: 'left',
      left: '32px',
      fontSize: '12px',
      top: '3px'
    }
  });
}

class EventRender extends React.Component {

  state = {
    anchorEl: null,
    deleteOneModal: false,
    deleteSeriesModal: false,
    moveOneModal: false,
    moveSeriesModal: false,
    selectedEvent: null,
    moveToDate: '',
    moveInRepetition: false,
    effectAllCycles: false
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.props.setSelectedGroupId(null);
    this.setState({ anchorEl: null, deleteOneModal: false, deleteSeriesModal: false, moveOneModal: false, moveSeriesModal: false, selectedEvent: null, moveToDate: '', moveInRepetition: false });
  };
  
  onDeleteOneModal = () => {
    this.setState({ deleteOneModal: true, anchorEl: null });
  }

  onMoveOneModal = (event) => {
    this.setState({ moveOneModal: true, anchorEl: null, selectedEvent: event, moveToDate: moment(this.props.event.start, 'YYYY-MM-DD').format('YYYY-MM-DD') });
  }

  onMoveSeriesModal = () => {
    this.setState({ moveSeriesModal: true, anchorEl: null, moveToDate: moment(this.props.event.start, 'YYYY-MM-DD').format('YYYY-MM-DD') });
  }

  onDeleteSeriesModal = () => {
    this.setState({ deleteSeriesModal: true, anchorEl: null });
  }

  onDeleteOne = () => {
    this.props.deleteOne(this.props.event);
    this.setState({ anchorEl: null, deleteOneModal: false });
  }

  onDeleteSeries = () => {
    this.props.deleteSeries(this.props.event);
    this.setState({ anchorEl: null, deleteSeriesModal: false });
  }

  onMoveOne = () => {
    this.props.moveOne(this.props.event, this.state.moveToDate);
    this.setState({ anchorEl: null, moveOneModal: false, moveToDate: '' });
  }

  onMoveSeries = () => {
    this.props.moveSeries(this.props.event, this.state.moveToDate, this.state.effectAllCycles);
    this.setState({ anchorEl: null, moveOneModal: false, moveToDate: '' });
  }

  onChangeMoveToDate = (event) => {
    this.setState({ moveToDate: event.target.value })
  }

  onChangeEffectAllCycles = (event) => {
    this.setState({ effectAllCycles: event.target.checked });
  }

  onCompleteStatus = (event) => {
	this.props.completeStatus(this.props.event, 'COMPLETE');
  }
  render() {
    const  { classes, event, showLegend } = this.props;
	const { anchorEl, deleteOneModal, deleteSeriesModal, moveOneModal, moveSeriesModal } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.title}>
            <Avatar
              style={{
                backgroundColor: event.cycleColor,
                color: invertColor(event.cycleColor, true)
              }}
              className={classes.avatar}
              title={event.cycleName}
            >
              {`${event.cycleIndex + 1}.${event.currentRepetition}`}
            </Avatar>
          {
            !showLegend && <span className={classes.titleText}>{event.title}</span>
          }
        </div>
        <IconButton 
          color="inherit"
          className={classes.gearIconButton}
          aria-owns={anchorEl ? 'fade-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Settings className={classes.moreIcon} />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
		  <MenuItem onClick={() => this.onCompleteStatus(event)}>
            <ListItemIcon className={classes.listItemIconMove}>
              <CompleteIcon color="primary"/>
            </ListItemIcon>
            <ListItemText>
              Completed
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={() => this.onMoveOneModal(event)}>
            <ListItemIcon className={classes.listItemIconMove}>
              <OpenWith color="primary"/>
            </ListItemIcon>
            <ListItemText>
              Move one
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={this.onMoveSeriesModal}>
            <ListItemIcon className={classes.listItemIconMove}>
              <OpenWith color="primary"/>
            </ListItemIcon>
            <ListItemText>
              Move series
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={this.onDeleteOneModal}>
            <ListItemIcon className={classes.listItemIconDelete}>
              <DeleteForever color="error" />
            </ListItemIcon>
            <ListItemText>
              Delete one
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={this.onDeleteSeriesModal}>
            <ListItemIcon className={classes.listItemIconDelete}>
              <DeleteForever color="error" />
            </ListItemIcon>
            <ListItemText>
              Delete series
            </ListItemText>
          </MenuItem>
        </Menu>
        <Modal 
          open={deleteOneModal}
          title="Are you sure you want to delete"
          subTitle={<div>One occurrence of <strong>{event.title}</strong></div>}
          handleAgree={this.onDeleteOne}
          handleClose={this.handleClose}
        />
        <Modal 
          open={deleteSeriesModal}
          title="Are you sure you want to delete"
          subTitle={<div>All occurence of <strong>{event.title}</strong></div>}
          handleAgree={this.onDeleteSeries}
          handleClose={this.handleClose}
        />
        <Modal
          className={classes.modal}
          open={moveOneModal}
          title="Are you sure you want to move"
          subTitle={<DateForm 
            moveToDate={this.state.moveToDate}
            moveInRepetition={this.state.moveInRepetition}
            classes={classes}
            onChangeMoveToDate={this.onChangeMoveToDate}
            title={<div>One occurrence of <strong>{event.title}</strong> to</div>}
          />}
          handleAgree={this.onMoveOne}
          handleClose={this.handleClose}
        />
        <Modal 
          open={moveSeriesModal}
          title="Are you sure you want to move"
          subTitle={<DateForm moveToDate={this.state.moveToDate}
            moveInRepetition={this.state.moveInRepetition}
            classes={classes}
            onChangeMoveToDate={this.onChangeMoveToDate}
            title={<div>All occurence of <strong>{event.title}</strong> starting with</div>}
            onChangeEffectAllCycles={this.onChangeEffectAllCycles}
          />}
          handleAgree={this.onMoveSeries}
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
      {
        props.onChangeEffectAllCycles && <FormControlLabel
          control={
            <Switch
              checked={props.effectAllCycles}
              onChange={props.onChangeEffectAllCycles}
              value="effectAllCycles"
              color="primary"
            />
          }
          label="Would you like to effect all the cycles?"
        />
      }
    </FormGroup>
  )
}

export default withStyles(styles)(EventRender);