import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function Application(props) {
  const host = `http://localhost:8001/api`;
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`${host}/days`), 
      axios.get(`${host}/appointments`),
      axios.get(`${host}/interviewers`)
    ]).then((all)=> {
      setState(prev => ({...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    })
  }, []);

  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const appointmentsList = dailyAppointments.map((appointment) => {
    if (appointment.interview) {
      return (
        <Appointment
          key={appointment.id}
          {...appointment} />
      );
    };
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}