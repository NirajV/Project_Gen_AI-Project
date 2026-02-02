import { createCycleRepo, getAllCyclesRepo, getUniqueEventNameFromCyclesRepo, getCyclesByEventNameRepo } from '../repository/cycle.js';

const validateCycleRequest = (cycle) => {
  let isValid = false;
  if (cycle.length || (
      cycle.cycleName &&
      cycle.repetition &&
      cycle.cycleLength &&
      cycle.medicines &&
      cycle.medicines.length )
    ) {
        isValid = true;
  }
  return isValid
}

export const createCycleService = (req, res) => {
  console.log('create cycle')
  const cycle = req.body;
  if ( typeof cycle !== 'object' || !validateCycleRequest(cycle) ) {
    res.status(400).send({
      hasError: true,
      data: null,
      error: {
        code: 100,
        message: "Bad request"
      }
    })
  } else {
    createCycleRepo(cycle).then(newEvent => {
      const response = {
        hasError: false,
        data: newEvent,
        errorCode: null
      };
      res.send(response);
    }).catch(err => {
      const response = {
        hasError: true,
        data: null,
        error: {
          code: 100,
          message: err
        }
      }
      res.status(400).send(response);
    });
  }
};

export const getAllCyclesService = (req, res) => {

  const userId = req.body.userId;

  getAllCyclesRepo(userId).then(cycles => {

    const response = {
      hasError: false,
      data: cycles,
      errorCode: null
    };

    res.send(response);
  }).catch(err => {
    
    const response = {
      hasError: true,
      data: null,
      error: {
        code: 100,
        message: err
      }
    }
    res.status(500).send(response);
  });
}

export const getCyclesByEventNameRepoService = (req, res) => {

  getCyclesByEventNameRepo(req.body).then(cycles => {
    const response = {
      hasError: false,
      data: cycles,
      errorCode: null
    };
    res.send(response);
  }).catch(err => {
    
    const response = {
      hasError: true,
      data: null,
      error: {
        code: 100,
        message: err
      }
    }
    res.status(500).send(response);
  });
}

export const getUniqueEventNameFromCyclesService = (req, res) => {

  getUniqueEventNameFromCyclesRepo(req.body).then(cycles => {
    const response = {
      hasError: false,
      data: cycles,
      errorCode: null
    };
    res.send(response);
  }).catch(err => {
    console.log(err);
    const response = {
      hasError: true,
      data: null,
      error: {
        code: 100,
        message: err
      }
    }
    res.status(500).send(response);
  });
}