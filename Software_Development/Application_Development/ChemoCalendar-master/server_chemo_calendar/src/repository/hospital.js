import Hospital from '../models/Hospital.js';

export const createHospitalRepo = (hospital) => {
  return new Promise ((resolve, reject) => {
    const newHospital = new Hospital(hospital);
    newHospital.save((err) => {
      if (err) reject(err);
      else resolve(newHospital);
    });
  });
};