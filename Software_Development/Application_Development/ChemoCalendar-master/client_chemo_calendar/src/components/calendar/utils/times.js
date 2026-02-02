export default {
  //durations in minute
  getTimeSlots(durations) {
    const numberOfslots = 1440 / durations;
    const slots = [];
    for(let i = 0; i <= numberOfslots; i++) {
      const slot = (durations * i) / 60;
      if (slot % 1 === 0) {
        if ( slot < 10 ) {
          slots.push(`0${slot}:00`);
        } else {
          slots.push(`${slot}:00`);
        }
      } else {
        const min = Math.round((slot % 1) * 60);
        if ( slot < 10 ) {
          slots.push(`0${Math.floor(slot)}:${min}`);
        } else {
          slots.push(`${Math.floor(slot)}:${min}`);
        }
      }
    }
    return slots;
  }
};