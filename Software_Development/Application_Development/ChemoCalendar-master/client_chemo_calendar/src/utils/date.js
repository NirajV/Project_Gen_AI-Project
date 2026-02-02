import moment from 'moment';

const startDate = moment("2018-01-19");
const lastDate = startDate.clone();

export const getStartMonth = () => {
  return startDate.month() + 1;
}

export const getLastMonth = () => {
  return lastDate.add(20, 'day').month() + 1;
}

export const formatDates = (startDate, inputRanges) => {
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