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

export function getInterview(state, interview) {
  if (!interview) return null;

  const interviewerId = interview.interviewer;
  const interviewerDb = state.interviewers;
  const interviewer = interviewerDb[interviewerId]

  const interviewObject = {
    ...interview, 
    interviewer
  };
  console.log(interviewObject)
  return interviewObject;
};