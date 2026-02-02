import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Select, { Creatable } from 'react-select';
import DeleteIcon from '@material-ui/icons/Delete';
import medicineList from '../../data/medicineList.json';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import { Map, fromJS } from 'immutable';

const styles = theme => ({
  typegraphy: {
    paddingBottom: theme.spacing.unit
  },
  textField: {
    margin: theme.spacing.unit
  },
  hiddenField: {
	  opacity: "0"
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 2
  },
  button : {
	  margin: theme.spacing.unit
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
  innerContainer: {
      flexGrow: 1
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
	warningChip: {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.error.contrastText
    },
	addMedicineButton: {
      paddingRight: theme.spacing.unit*2,
      paddingLeft: theme.spacing.unit*2,
      margin: `${theme.spacing.unit}px`
    }
});

class AddCycle extends React.Component {
  constructor(props) {
    super(props);
	this.state = { emailModal: false, emailValue: null,deleteMedicineModal: -1 };
  }
  handleClose = () => {
    this.setState({ emailModal: false });
  }
  
	handleChange = (e) => {
		this.setState({emailValue: e.target.value});
	}
  renderField({ input, label, type, meta: { touched, error, warning }, fullWidth, fieldClassName }) {
    return (
      <FormControl fullWidth={fullWidth}>
        <TextField
          className={fieldClassName}
          label={label}
          type={type}
          error={touched && error}
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

    renderMedicines = ({fields, classes, deleteMedicineModal, drugTypeOption}) => {
		
		const drugIndex = 0;
		return (
		  <ul className={classes.list}>
        {
          fields.map((field, index) => {
            return (
              <li>
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
  render() {
    const { classes, drugTypeOption} = this.props;
	const beginDateOptions = [{
      label: 'Starts from end of previous cycle',
      value: 'END_OF_PREV'
    }]
    return (
		<div className={classes.container}>
			<Typography className={classes.typegraphy} headlineMapping={{headline: 'h1'}} variant="headline" color="inherit">
				Add Cycle
			</Typography>
			<form>
				<Grid justify="center" className={classes.innerContainer} container spacing={0}>
                      <Grid item xs={6}>
                        <Field
                          name= "cycleName"
                          component={this.renderField}
                          type="text"
                          label='Cycle name'
                          fullWidth
                          fieldClassName={classes.textField}
                        />
                      </Grid>
                      <Grid item xs={6}>
                      <Field
                        name= "beginFrom"
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
                          name="cycleLength"
                          component={this.renderField}
                          type="number"
                          label='Cycle length in days'
                          fullWidth
                          fieldClassName={classes.textField}
                        />
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6}>
                        <Field
                          name= "repetition"
                          component={this.renderField}
                          type="number"
                          label='Number of time the cycle should repeat'
                          fullWidth
                          fieldClassName={classes.textField}
                        />
                      </Grid>
                    </Grid>
					<div className={classes.medicineWrapper}>
                      <FieldArray name="medicines" deleteMedicineModal={this.state.deleteMedicineModal} component={this.renderMedicines} classes={classes} drugTypeOption = {drugTypeOption}/>
                    </div>
			  <div className={classes.buttonWrapper}>
				<Button 
				  onClick={
					this.props.handleSubmit(values => {
					  this.props.updateCycle(values.toJS());
					})
				  }
				  className={classes.button}
				  variant="raised"
				  color="primary"
				  size="small"
				>
				  Add Cycle
				</Button>
			  </div>
			  <div>
			  </div>
			</form> 
		</div>
    );
  }
}

AddCycle = reduxForm({
  form: 'add-cycle-form' 
})(AddCycle);

export default withStyles(styles)(AddCycle);