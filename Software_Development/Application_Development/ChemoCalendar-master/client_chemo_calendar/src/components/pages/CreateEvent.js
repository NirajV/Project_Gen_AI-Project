import React from 'react';
import { Redirect } from 'react-router-dom';
import { Map, fromJS } from 'immutable';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm, FieldArray } from 'redux-form/immutable';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from '../commons/Modal';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Select, { Creatable } from 'react-select';
import time from '../calendar/utils/times';
import CreateFavCycleContainer from '../../containers/CreateFavCycleContainer';
import medicineList from '../../data/medicineList.json';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';

const styles = theme => {
  return ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing.unit*2
    },
    innerContainer: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      margin: theme.spacing.unit
    },
    textField: {
      margin: theme.spacing.unit
    },
    typegraphy: {
      marginBottom: theme.spacing.unit,
      fontSize: '1.2rem'
    },
    saveButton: {
      paddingRight: theme.spacing.unit*2,
      paddingLeft: theme.spacing.unit*2
    },
    saveAsFavButton: {
      paddingRight: theme.spacing.unit*2,
      paddingLeft: theme.spacing.unit*2,
      marginBottom: theme.spacing.unit*2
    },
    addMedicineButton: {
      paddingRight: theme.spacing.unit*2,
      paddingLeft: theme.spacing.unit*2,
      margin: `${theme.spacing.unit}px`
    },
    addCycleButton: {
      paddingRight: theme.spacing.unit*2,
      paddingLeft: theme.spacing.unit*2,
      margin: `${theme.spacing.unit}px 0`
    },
    rightIcon: {
      paddingLeft: theme.spacing.unit
    },
    leftIcon: {
      marginRight: theme.spacing.unit/2,
    },
    iconSmall: {
      fontSize: 20,
    },
    divider: {
      margin: `${theme.spacing.unit*2}px 0`
    },
    list: {
      listStyleType: 'none',
      padding: 'inherit'
    },
    listItemHeader: {
      textAlign: 'left',
      marginLeft: theme.spacing.unit,
      fontWeight: '600'
    },
    selectControl: {
      width: '100%'
    },
    selectControlLabel: {
      color: theme.palette.action.active,
      padding: '0',
      fontSize: theme.typography.caption.fontSize,
      fontFamily: theme.typography.fontFamily,
      textAlign: 'left',
      paddingLeft: '16px'
    },
    selectControlWrapper: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    select: {
      textAlign: 'left',
      margin: '4px 0',
      paddingLeft: '16px',
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
    selectWithoutLabel: {
      textAlign: 'left',
      margin: '8px',
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
    selectOptions: {
      display: 'flex'
    },
    expansionPanelDetails: {
      display: 'block',
      backgroundColor: theme.palette.grey["100"]
    },
    cycleActionButtons: {
      position: 'absolute',
      right: theme.spacing.unit * 4
    },
    favoriteIconSelected: {
      color: 'rgb(255, 215, 0)'
    },
    favoriteIcon: {
      marginRight: theme.spacing.unit * 2
    },
    warningChip: {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.contrastText
    },
    featureHidden: {
      display: 'none'
    }
  })
};
class CreateEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      saveFavoriteModal: -1,
      deleteCycleModal: -1,
      deleteMedicineModal: -1,
      saveEventFavoriteModal: -1,
      selectedFavoriteEvent: '',
      createFromFavorite: false
    }
  }

  componentDidMount() {
    const { router: { route: { location } } } = this.context;
    const parsed = queryString.parse(location.search);
    if(parsed.eventName) {
      this.props.fetchAllCycles({
        hospitalId: this.props.user.data.hospitalId,
        eventName: parsed.eventName
      })
      this.setState({ createFromFavorite: true });
    }
    this.props.user && this.props.fetchAllFavoriteEvents(this.props.user.data.hospitalId);
  }

  componentWillReceiveProps(newProps) {
    const { router: { route: { location } } } = this.context;
    const { createFromFavorite } = this.state;
    const { change, cycles } = newProps;
    const parsed = queryString.parse(location.search);
    if(parsed.eventName && createFromFavorite && cycles) {
      change('cycles', fromJS(cycles));
      this.setState({ createFromFavorite: false });
    }
  }

  componentWillMount() {
    this.props.clearEvent({});
  }

  renderField({ input, label, type, meta: { touched, error, warning }, fullWidth, fieldClassName, shrink }) {
    return (
      <FormControl fullWidth={fullWidth}>
        <TextField
          className={fieldClassName}
          label={label}
          type={type}
          error={touched && error}
          InputLabelProps={{
            shrink
          }}
          {...input}
        />
      </FormControl>
    )
  }

  renderSelect = ({ input, options, valueKey, labelKey, placeholder, simpleValue, classes, optionRenderer, label, allowCreate }) => {
    const SelectType = allowCreate ? Creatable : Select;
    return (
      <FormControl className={classes.selectControl}>
        {
          label && <label className={classes.selectControlLabel}>{label}</label>
        }
        <SelectType
           value={input.value || ''}
           onChange={input.onChange}
           options={options}
           valueKey={valueKey}
           labelKey={labelKey}
           placeholder={placeholder.show ? placeholder.text : 'Please select...'}
           simpleValue={simpleValue ? true : false}
           className={classes.select}
           optionRenderer={optionRenderer}
           valueRenderer={optionRenderer}
           allowCreate={allowCreate ? true : false}
        />
      </FormControl>
    )
  }

  toggleDeleteMedicineModal = (event, index) => {
    event && event.stopPropagation();
    if (this.state.deleteMedicineModal !== -1) {
      this.setState({ deleteMedicineModal: - 1 });
    } else {
      this.setState({ deleteMedicineModal: index + 1 });
    }
  }

  renderMedicines = ({fields, classes, deleteMedicineModal, cycleIndex}) => {
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
    return (
      <ul className={classes.list}>
        {
          fields.map((field, index) => {
            return (
              <li key={`${cycleIndex}_${index}`}>
                <Paper className={classes.paper} >
                <Grid className={classes.innerContainer} container spacing={0}>
                  <Grid item xs={8} sm={6} md={4} lg={2}>
                    <Typography className={classes.listItemHeader}>
                      Drug #{index + 1}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} sm={5} md={7} lg={9}>
                    {/*Empty Spaces*/}
                  </Grid>
                  <Grid item xs={1}>
                    <DeleteIcon titleAccess="Delete this drug" color="error" className={classes.deleteIcon} onClick={(event) => {
                      const confirm = window && window.confirm("Are you sure you want to delete this drug")
                      if(confirm) fields.remove(index);
                      }} />
                  </Grid>
                </Grid>
                <Grid justify="center" className={classes.innerContainer} container spacing={0}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <Field
                        name={`${field}.name`}
                        component={this.renderSelect}
                        type="select"
                        valueKey='value'
                        labelKey='label'
                        options={medicineList}
                        label="Drug name"
                        simpleValue={true}
                        placeholder={{
                          show: true,
                          text: "Enter the drug name"
                        }}
                        allowCreate
                        classes={classes}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <Field
                        name={`${field}.days`}
                        component={this.renderField}
                        type="text"
                        label='Frequency in days'
                        fullWidth
                        fieldClassName={classes.textField}
                      />
                    </Grid>
					<Grid item xs={4} sm={4} md={4} lg={4}>
                      <Field
                        name={`${field}.strength`}
                        component={this.renderField}
                        type="text"
                        label='Strength (mg)'
                        fullWidth
                        fieldClassName={classes.textField}
                      />
                    </Grid>
					<Grid item xs={4} sm={4} md={4} lg={4}>
                      <Field
                        name={`${field}.duration`}
                        component={this.renderField}
                        type="text"
                        label='Duration (mins)'
                        fullWidth
                        fieldClassName={classes.textField}
                      />
                    </Grid>
					<Grid item xs={4} sm={4} md={4} lg={4}>
                      <Field
                        name={`${field}.type`}
                        component={this.renderSelect}
                        type="select"
                        valueKey='value'
                        labelKey='label'
                        options={drugTypeOption}
                        disabled={drugTypeOption && drugTypeOption.length > 0 ? false : true}
                        simpleValue={true}
                        label="Drug Type"
                        placeholder={{
                          show: true,
                          text: "Select the drug type"
                        }}
                        classes={classes}
                        optionRenderer={this.optionTypeRenderer}
                      />
                    </Grid>
                  </Grid>
                  </Paper>
              </li>
            )
          })
        }
        {
          fields && !fields.length && <li>
            <Grid justify="center" className={classes.innerContainer} container spacing={0}>
              <Grid item xs={12} sm={12} md={6} lg={3}>
                <Chip className={classes.warningChip} label="Please add atleast one drug" />
              </Grid>
            </Grid>
          </li>
        }
        <li>
          <Grid justify="center" className={classes.innerContainer} container spacing={0}>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <Button
                onClick={() => {
                  fields.push(Map({}))
                }}
                className={classes.addMedicineButton}
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
              >
                <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                DRUG
              </Button>
            </Grid>
          </Grid>
        </li>
      </ul>
    );
  }

  toggleSaveFavoriteModal = (event, index) => {
    event && event.stopPropagation();
    if (this.state.saveFavoriteModal !== -1) {
      this.setState({ saveFavoriteModal: - 1 });
    } else {
      this.setState({ saveFavoriteModal: index + 1 });
    }
  }

  toggleDeleteCycleModal = (event, index) => {
    event && event.stopPropagation();
    if (this.state.saveFavoriteModal !== -1) {
      this.setState({ deleteCycleModal: - 1 });
    } else {
      this.setState({ deleteCycleModal: index + 1 });
    }
  }

  onChangeFavoriteEventName = (value) => {
    this.props.fetchAllCycles({
      hospitalId: this.props.user.data.hospitalId,
      eventName: value.value
    })
    this.setState({ selectedFavoriteEvent: value });
  }

  renderCycles = ({fields, classes, saveFavoriteModal, cycles, deleteCycleModal, deleteMedicineModal, favoriteEvents, onChangeFavoriteEventName, selectedFavoriteEvent}) => {
    const options = cycles && cycles.map((cycle, cycleIndex) => {
      return {
        label: cycle.cycleName,
        value: cycle
      }
    });
    const eventNameOptions = favoriteEvents && favoriteEvents.map((favEvent)=> {
      return {
        label: favEvent,
        value: favEvent
      }
    });
    const beginDateOptions = [{
      label: 'Starts from end of previous cycle',
      value: 'END_OF_PREV'
    }, {
      label: 'Starts from regime begin date',
      value: 'REGIME_BEGIN_DATE'
    }]
    return (
        <div>
          {
            fields.map((field, index) => {
              return (
                <ExpansionPanel key={index}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.listItemHeader}>Cycle #{index + 1}</Typography>
                    <div className={classes.cycleActionButtons}>
                      <DeleteIcon titleAccess="Delete this cycle" color="error" className={classes.deleteIcon} onClick={(event) => {this.toggleDeleteCycleModal(event, index)}} />
                    </div>
                    <Modal 
                      open={saveFavoriteModal === (index + 1)}
                      title="Are you sure you want to save this cycle as favorite"
                      subTitle={<CreateFavCycleContainer toggleSaveFavoriteModal={this.toggleSaveFavoriteModal} field={fields.get(index)} eventDetails={this.props.eventDetails}/>}
                      handleClose={this.toggleSaveFavoriteModal}
                      hideActions
                    />
                    <Modal 
                      open={deleteCycleModal === (index + 1)}
                      title="Are you sure you want to delete this cycle"
                      subTitle={fields.get(index) && fields.get(index).get('cycleName')}
                      handleClose={this.toggleDeleteCycleModal}
                      handleAgree={() => {
                        fields.remove(index);
                        this.toggleDeleteCycleModal();
                      }}
                    />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                    <Grid justify="center" className={classes.innerContainer} container spacing={0}>
                      <Grid item xs={8}>
                        <Field
                          name={`${field}.cycleName`}
                          component={this.renderField}
                          type="text"
                          label='Cycle name'
                          fullWidth
                          fieldClassName={classes.textField}
                        />
                      </Grid>
                      <Grid item xs={4}>
                      <Field
                        name={`${field}.beginFrom`}
                        component={this.renderSelect}
                        type="select"
                        valueKey='value'
                        labelKey='label'
                        options={beginDateOptions}
                        disabled={beginDateOptions && beginDateOptions.length > 0 ? false : true}
                        simpleValue={true}
                        label="Cycle begin from"
                        placeholder={{
                          show: true,
                          text: "Select the begin from"
                        }}
                        classes={classes}
                        optionRenderer={this.optionRenderer}
                      />
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Field
                          name={`${field}.cycleLength`}
                          component={this.renderField}
                          type="number"
                          label='Cycle length in days'
                          fullWidth
                          fieldClassName={classes.textField}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Field
                          name={`${field}.repetition`}
                          component={this.renderField}
                          type="number"
                          label='Number of time the cycle should repeat'
                          fullWidth
                          fieldClassName={classes.textField}
                        />
                      </Grid>
                    </Grid>
                    <div className={classes.medicineWrapper}>
                      <FieldArray cycleIndex={index} name={`${field}.medicines`} deleteMedicineModal={deleteMedicineModal} component={this.renderMedicines} classes={classes}/>
                    </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })
          }
          <Grid justify="center" className={classes.innerContainer} container spacing={0}>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Select
                onChange={onChangeFavoriteEventName}
                value={selectedFavoriteEvent}
                options={eventNameOptions}
                placeholder={'Select Regime from favorite'}
                className={classes.selectWithoutLabel}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Select
                value={''}
                onChange={selctedOption => {
                  fields.push(fromJS(selctedOption.value))
                }}
                options={options}
                valueKey='value'
                labelKey='label'
                placeholder={'Add cycles from favorite'}
                className={classes.selectWithoutLabel}
              />
            </Grid>
          </Grid>
          <Grid justify="center" className={classes.innerContainer} container spacing={0}>
            <Grid item xs={6} sm={6} md={6} lg={3}>
              <Button 
                onClick={() => {
                  fields.push(Map({}))
                }}
                className={classes.addCycleButton}
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
              >
                <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                Empty CYCLE
              </Button>
            </Grid>
          </Grid>
        </div>
    )
  }

  toggleSaveEventFavoriteModal = (event) => {
    event && event.stopPropagation();
    if (this.state.saveEventFavoriteModal !== -1) {
      this.setState({ saveEventFavoriteModal: - 1 });
    } else {
      this.setState({ saveEventFavoriteModal: 1 });
    }
  }

  getTimeSlot = () => {
    const timeSlots = time.getTimeSlots(30);
    const newTimeSlots = [];
    timeSlots.map((slot) => {
      const newSlot = {
        label: slot,
        value: slot
      }
      newTimeSlots.push(newSlot);
    })
    return newTimeSlots;
  }

  optionRenderer = (option) => {
    return <Typography className={this.props.classes.selectOptions}>
      <AccessTimeIcon className={classNames(this.props.classes.leftIcon, this.props.classes.iconSmall)} />
      <span style={{
        
      }}>{option.label}</span>
    </Typography>
  }
  
  optionTypeRenderer = (option) => {
    return <Typography className={this.props.classes.selectOptions}>
      <span style={{
        
      }}>{option.label}</span>
    </Typography>
  }

  render() {
    const { classes, event, cycles, favoriteEvents } = this.props;
    const options = this.getTimeSlot();
    if (event && event.date && event.data._id) {
      return <Redirect to={`/viewEvent/${event.data._id}`} />
    }

    return (
      <Grid justify="center" className={classes.root} container>
        <Grid item xs={12} sm={12} md={10} lg={8}>
          <Paper className={classes.paper}>
            <Typography className={classes.typegraphy} headlineMapping={{headline: 'h3'}} variant="headline" color="inherit">
              CREATE NEW REGIME
            </Typography>
            <form>
              <Grid className={classes.innerContainer} container spacing={0}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Field
                    name="cancerName"
                    component={this.renderField}
                    type="text"
                    label='Cancer name *'
                    fullWidth
                    fieldClassName={classes.textField}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.innerContainer} container spacing={0}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Field
                    name="patientName"
                    component={this.renderField}
                    type="text"
                    label='Patient name'
                    fullWidth
                    fieldClassName={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Field
                    name="mrn"
                    component={this.renderField}
                    type="text"
                    label='MRN'
                    fullWidth
                    fieldClassName={classes.textField}
                  />
                </Grid>
              </Grid>
              <Grid className={classes.innerContainer} container spacing={0}>
                <Grid item xs={6}>
                  <Field
                    name="beginDate"
                    component={this.renderField}
                    type="date"
                    label='Begin date *'
                    fullWidth
                    fieldClassName={classes.textField}
                    shrink
                  />
                </Grid>
                <Grid item xs={6} className={classNames(classes.selectControlWrapper, classes.featureHidden)}>
                  {<Field
                    name="timeSlot"
                    component={this.renderSelect}
                    type="select"
                    valueKey='value'
                    labelKey='label'
                    options={options}
                    disabled={options && options.length > 0 ? false : true}
                    simpleValue={true}
                    label="Time slot *"
                    placeholder={{
                      show: true,
                      text: "Select time slot"
                    }}
                    classes={classes}
                    optionRenderer={this.optionRenderer}
                  />}
                </Grid>
              </Grid>
              <div className={classes.medicineWrapper}>
                <FieldArray cycles={cycles} deleteMedicineModal={this.state.deleteMedicineModal} onChangeFavoriteEventName={this.onChangeFavoriteEventName} deleteCycleModal={this.state.deleteCycleModal} saveFavoriteModal={this.state.saveFavoriteModal} name="cycles" component={this.renderCycles} classes={classes} favoriteEvents={favoriteEvents} selectedFavoriteEvent={this.state.selectedFavoriteEvent}/>
              </div>
              <Modal 
                open={this.state.saveEventFavoriteModal === 1}
                title="Are you sure you want to save this Regime as favorite"
                subTitle={<CreateFavCycleContainer toggleSaveFavoriteModal={this.toggleSaveEventFavoriteModal} eventDetails={this.props.eventDetails}/>}
                handleClose={this.toggleSaveEventFavoriteModal}
                hideActions
              />
              <Grid justify="center" className={classes.innerContainer} container spacing={0}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Field
                    name="eventName"
                    component={this.renderField}
                    type="text"
                    label='Regime name(Required for saving as fav)'
                    fullWidth
                    fieldClassName={classes.textField}
                  />
                </Grid>
              </Grid>
              <Grid justify="center" className={classes.innerContainer} container spacing={0}>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <Button
                    onClick={this.toggleSaveEventFavoriteModal}
                    className={classes.saveAsFavButton}
                    variant="raised"
                    color="primary"
                    size="small"
                    fullWidth
                  >
                    <StarBorderIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                    Regime As Favorite
                  </Button>
                </Grid>
              </Grid>
              <Grid justify="center" className={classes.innerContainer} container spacing={0}>
                <Grid item xs={12} sm={12} md={6} lg={3}>
                  <Button 
                    onClick={() => {
                      this.props.handleSubmit()
                    }}
                    className={classes.saveButton}
                    variant="raised"
                    color="secondary"
                    size="small"
                    fullWidth
                  >
                    <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                    SAVE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

const validate = values => {
  const errors = {
  }
  const formValues = values.toJS();
  if (!formValues.cancerName) {
    errors.cancerName = true
  }
  if (!formValues.beginDate) {
    errors.beginDate = true
  }
  if (formValues.cycles && formValues.cycles.length) {
    const cycles = formValues.cycles
    errors.cycles = [];
    cycles.map((cycle, index) => {
      errors.cycles.push({
        cycleName: false
      })
      if(!cycle.cycleName) {
        errors.cycles[index].cycleName = true;
      }
      if(!cycle.beginFrom) {
        errors.cycles[index].beginFrom = true;
      }
      if(!cycle.repetition) {
        errors.cycles[index].repetition = true;
      }
      if(!cycle.cycleLength) {
        errors.cycles[index].cycleLength = true;
      }
    })
  }
  return errors
}

CreateEvent.contextTypes = {
  router: PropTypes.object
}

CreateEvent = connect(
  state => {
    const cycles = state.getIn(['form', 'create-event-form', 'values', 'cycles']);
    const eventDetails = {
      eventName: state.getIn(['form', 'create-event-form', 'values', 'eventName']),
      cycles: cycles && cycles.toJS()
    }
    return {
      eventDetails: eventDetails
    }
  }
)(CreateEvent)

CreateEvent = reduxForm({
  form: 'create-event-form',
  validate
})(CreateEvent);

export default  withStyles(styles)(CreateEvent);