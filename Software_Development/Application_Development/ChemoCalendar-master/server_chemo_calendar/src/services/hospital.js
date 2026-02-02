import { createHospitalRepo } from '../repository/hospital.js';

export const createHospitalService = (req, res) => {
  const hospital = req.body;
  createHospitalRepo(hospital).then(newHospital => {
    const response = {
      hasError: false,
      data: newHospital,
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
    res.send(response);
  });
};