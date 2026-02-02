export default {
  getWeek(selectedDate) {
    const dateObject = new Date(selectedDate);
    const date = dateObject.getDate();
    const day = dateObject.getDay();
    const monday = date - day + 1;
    const tuesday = date - day + 2;
    const wednesday = date - day + 3;
    const thursday = date - day + 4;
    const friday = date - day + 5;
    const saturday = date - day + 6;
    const sunday = date - day + 7;
    return [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
  }
};