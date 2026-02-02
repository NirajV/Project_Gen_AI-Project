var moment = require('moment');

const nextWeek = moment().month('Jan');

const startWeek = nextWeek.startOf('month').week();
const endWeek = nextWeek.endOf('month').week();


let calendar = []
for(var week = startWeek; week<endWeek;week++){
  calendar.push({
    week:week,
    days:Array(7).fill(0).map((n, i) => moment().week(week).startOf('week').clone().add(n + i, 'day'))
  })
}