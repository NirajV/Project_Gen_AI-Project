import moment from 'moment';
import { createUserRepo } from '../repository/user.js';
import { createHospitalRepo } from '../repository/hospital.js';
import User from '../models/User.js';
import Hospital from '../models/Hospital.js';
import pkg from 'immutable';
const { fromJS, toJS, List } = pkg;

export const formatEvent = (rawEvent) => {
  let event = fromJS(rawEvent);
  const cycles = event.get('cycles');
  let beginDate = event.get('beginDate');
  event = event.set('beginDate', moment(beginDate).add(12, 'hours').format());
  beginDate = event.get('beginDate');
  let preCycleLastDate = moment(new Date(beginDate));
  cycles.map((cycle, cycleIndex) => {
    const cycleLength = cycle.get('cycleLength');
    const repetition = cycle.get('repetition');
    const medicines = cycle.get('medicines');  
    const startDate = moment(new Date(beginDate));
    const cycleBeginFrom = cycle.get('beginFrom');
    const cycleColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    event = event.setIn(['cycles', cycleIndex, 'cycleColor'], cycleColor);
    if(cycleBeginFrom === 'REGIME_BEGIN_DATE') {
      const cycleStartDate = startDate;
      const cycleEndDate = startDate.clone().add(parseInt(repetition) * parseInt(cycleLength), 'days')
      event = event.setIn(['cycles', cycleIndex, 'cycleStartDate'], cycleStartDate);
      event = event.setIn(['cycles', cycleIndex, 'cycleEndDate'], cycleEndDate);
    } else if (cycleBeginFrom === 'END_OF_PREV') {
      const cycleStartDate = preCycleLastDate.clone().add(1, 'days');
      const cycleEndDate = preCycleLastDate.clone().add(parseInt(repetition) * parseInt(cycleLength), 'days');
      event = event.setIn(['cycles', cycleIndex, 'cycleStartDate'], cycleStartDate);
      event = event.setIn(['cycles', cycleIndex, 'cycleEndDate'], cycleEndDate);
    }

    medicines.map((medicine, medicineIndex) => {
		
      const medicineColor = '#'+Math.floor(Math.random()*16777215).toString(16);
      let days = new List();
      event = event.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'frequency'], medicine.get('days'));
      [...Array(parseInt(repetition))].map((temp, rep) => {
        let cycleStartDate = startDate.clone().add(rep * parseInt(cycleLength), 'days');
        if(cycleBeginFrom === 'REGIME_BEGIN_DATE') {
          cycleStartDate = startDate.clone().add(rep * parseInt(cycleLength), 'days');
        } else if (cycleBeginFrom === 'END_OF_PREV') {
          cycleStartDate = preCycleLastDate.clone().add(rep * parseInt(cycleLength), 'days');
        }
        const formatedDates = formatDates(cycleStartDate, medicine.get('days'));
        days = days.concat(formatedDates);
      });
      event = event.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'days'], days);
      event = event.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'medicineColor'], medicineColor);
	  event = event.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'strength'], medicine.get('strength')+' mg');
	  event = event.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'duration'], medicine.get('duration')+ ' mins');
    });
    preCycleLastDate = preCycleLastDate.clone().add(parseInt(cycleLength) * parseInt(repetition), 'days');
  });
  return event.toJS();
}

export const formatUpdateEvent = (rawEvent) => {
  let event = fromJS(rawEvent);
  const cycles = event.get('cycles');
  
  cycles.map((cycle, cycleIndex) => {
	if(!cycle.get('_id')){
		let beginDate = event.get('beginDate');
		let preCycleEndDate = event.getIn(['cycles', cycleIndex - 1, 'cycleEndDate']);
		let preCycleLastDate = moment(new Date(preCycleEndDate));
		const cycleLength = cycle.get('cycleLength');
		const repetition = cycle.get('repetition');
		const medicines = cycle.get('medicines');  
		const startDate = moment(new Date(beginDate));
		const cycleBeginFrom = cycle.get('beginFrom');
		const cycleColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		event = event.setIn(['cycles', cycleIndex, 'cycleColor'], cycleColor);
		
		if(cycleBeginFrom === 'REGIME_BEGIN_DATE') {
			const cycleStartDate = startDate;
			const cycleEndDate = startDate.clone().add(parseInt(repetition) * parseInt(cycleLength), 'days')
			event = event.setIn(['cycles', cycleIndex, 'cycleStartDate'], cycleStartDate);
			event = event.setIn(['cycles', cycleIndex, 'cycleEndDate'], cycleEndDate);
		} else if (cycleBeginFrom === 'END_OF_PREV') {
			const cycleStartDate = preCycleLastDate.clone().add(1, 'days');
			const cycleEndDate = preCycleLastDate.clone().add(parseInt(repetition) * parseInt(cycleLength), 'days');
			event = event.setIn(['cycles', cycleIndex, 'cycleStartDate'], new Date(cycleStartDate));
			event = event.setIn(['cycles', cycleIndex, 'cycleEndDate'], new Date(cycleEndDate));
		}
		medicines.map((medicine, medicineIndex) => {
			const medicineColor = '#'+Math.floor(Math.random()*16777215).toString(16);
			let days = new List();
			event = event.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'frequency'], medicine.get('days'));
			[...Array(parseInt(repetition))].map((temp, rep) => {
			let cycleStartDate = startDate.clone().add(rep * parseInt(cycleLength), 'days');
			if(cycleBeginFrom === 'REGIME_BEGIN_DATE') {
			  cycleStartDate = startDate.clone().add(rep * parseInt(cycleLength), 'days');
			} else if (cycleBeginFrom === 'END_OF_PREV') {
			  cycleStartDate = preCycleLastDate.clone().add(rep * parseInt(cycleLength), 'days');
			}
			const formatedDates = formatDates(cycleStartDate, medicine.get('days'));
			days = days.concat(formatedDates);
			});
			event = event.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'days'], days);
			event = event.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'medicineColor'], medicineColor);
			event = event.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'strength'], medicine.get('strength')+' mg');
			event = event.setIn(['cycles', cycleIndex, 'medicines', medicineIndex, 'duration'], medicine.get('duration')+ ' mins');
		});
		preCycleLastDate = preCycleLastDate.clone().add(parseInt(cycleLength) * parseInt(repetition), 'days');
		console.log(event.get('cycles').toJS())
	}
  });
  return event.toJS();
}

const formatDates = (startDate, inputRanges) => {
  const spaceRemoved = inputRanges.replace(/\s/g, '');
  const inputRangesByComma = spaceRemoved.split(",")
  const actualDates = [];
  inputRangesByComma.map((inputRange, i) => {
    const days = inputRange.split("-");
    if( days.length > 1 ) {
      const startDay = parseInt(days[0])
      const endDay = parseInt(days[1])
      for(let i = startDay; i <= endDay; i++ ) {
        let clonedStartDate = startDate.clone();
        actualDates.push(clonedStartDate.add(parseInt(i) - 1, 'days').format('YYYY-MM-DD'))
      }
    } else {
      let clonedStartDate = startDate.clone();
      actualDates.push(clonedStartDate.add(parseInt(inputRange) - 1, 'days').format('YYYY-MM-DD'))
    }
  })
  return actualDates.sort();
}

export const createAdmin = () => {
  const user = {
    firstName: "Admin",
    lastName: "admin",
    email: "admin@chemo.com",
    password: "123456",
    phone: "9876543210"
  };

  User.find({ email: "admin@chemo.com" }, (err, users) => {
    users && !users.length && createUserRepo(user).then(newUser => {
      console.log("Admin user created");
    }).catch(err => {
      console.log("failed to create admin", err)
    });
  });
}

export const createHospital = () => {
  const hospital = {
    name: "Dummy",
    location: "Dummy Location",
    phone: "8105479865"
  };

  Hospital.find({ name: "Dummy" }, (err, hospitals) => {
    hospitals && !hospitals.length && createHospitalRepo(hospital).then(newHospital => {
      console.log("Dummy hospital created");
    }).catch(err => {
      console.log("failed to create dummy hospital", err)
    });
  });
}