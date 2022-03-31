import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const bookInterview = (id, interview, mode) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      let days = (mode === "CREATE") ? updateSpots(-1) : state.days;
      setState({ ...state, appointments, days });
    });
  };

  const updateSpots = (num) => {
    return state.days.map((item) => {
      return {...item, spots: item.name === state.day ? (item.spots + num) : (item.spots)}
    });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(1);
      setState({ ...state, appointments, days });
    });
  };

  const setDay = day => setState({ ...state, day });

  return { state, bookInterview, cancelInterview, setDay };
}

