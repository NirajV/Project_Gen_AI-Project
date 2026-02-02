import Cycle from '../models/Cycle.js';
import User from '../models/User.js';

export const createCycleRepo = (cycle) => {
  if(cycle.length) {
    return new Promise ((resolve, reject) => {
      Cycle.create(cycle, (err, doc) => {
        if (err) {
          if(err.code === 11000) {
            resolve(doc);
          } else {
            reject(err);
          }
        }
        else resolve(doc);
      });
    });
  }
  return new Promise ((resolve, reject) => {
    const newCycle = new Cycle(cycle);
    newCycle.save((err) => {
      if (err) reject(err);
      else resolve(newCycle);
    });
  });
};

export const getUniqueEventNameFromCyclesRepo = (payload) => {
  return new Promise ((resolve, reject) => {
    User.find({ hospitalId: payload.hospitalId }, (er, users) => {
      const userIds = users.map(user => user._id);
      Cycle.distinct('eventName', {
        'userId': {
          $in: userIds
        }
      }, (err, cycles) => {
        if (err) reject(err);
        else resolve(cycles);
      })
    });
  })
}

export const getAllCyclesRepo = (userId) => {
  return new Promise ((resolve, reject) => {
    Cycle.find({ userId: userId }, (err, cycles) => {
      if (err) reject(err);
      else resolve(cycles);
    })
  })
}

export const getCyclesByEventNameRepo = (payload) => {
  return new Promise ((resolve, reject) => {
    const { eventName, hospitalId } = payload;
    User.find({ hospitalId: hospitalId }, (er, users) => {
      const userIds = users.map(user => user._id);
      Cycle.find({
        'userId': {
          $in: userIds
        },
        eventName
      }, (err, cycles) => {
        if (err) reject(err);
        else resolve(cycles);
      })
    });
  })
}