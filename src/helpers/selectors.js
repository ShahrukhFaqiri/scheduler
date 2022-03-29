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
      interviewerArr = [...singleDay.appointments];
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