export function getAppointmentsForDay(state, day) {  
  let dayAppId = [];

    for (const singleDay of state.days){
      if (singleDay.name === day){
        dayAppId = [...singleDay.appointments]
      }
    }
    const appointmentsDay = dayAppId.map(id => state.appointments[id]);

  return appointmentsDay;
};
