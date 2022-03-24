import React from "react";
import Show from "./Show";
import Empty from "./Empty";
import Header from "./Header";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  // const timeCheck = () => {
  //   if (props.time) {
  //     return `Appointment at ${props.time}`;
  //   }
  //   return `No Appointment`;
  // };
  return (
    <>
      <article className="appointment">
        <Header time={props.time}></Header>
        {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
      </article>
    </>
  );
}