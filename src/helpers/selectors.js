/* 
Helper functions for data display

1) return an array of appointsment for that day
2) return an array of interviewers for that day
3) return object of student and interview
*/


export function getAppointmentsForDay(state, day) {
  let dayArr = [];
  state.days.forEach(singleDay => {
    if (singleDay.name === day) {
      dayArr = [...singleDay.appointments];
    }
  })
  return dayArr.map(id => state.appointments[id]);
};

export function getInterviewersForDay(state, day) { 
   if (state.days.length === 0) {
    return [];
  }
  let interviewerArr = [];
  state.days.forEach(singleDay => {
    if (singleDay.name === day) {
      interviewerArr = [...singleDay.interviewers];
    }
  })
  return interviewerArr.map(id => state.interviewers[id]);
};

export function getInterview(state, interview) {
  if (!interview) return null;
  return { 
    student: interview.student, 
    interviewer: state.interviewers[interview.interviewer] 
  };
};