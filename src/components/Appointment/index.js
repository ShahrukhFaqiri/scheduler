import React from "react";
import "components/Appointment/styles.scss"

export default function Appointment(props) {
  const timeCheck = () => {
    if(props.time){
      return `Appointment at ${props.time}`
    }
    return `No Appointment`
  }
  return (
    <>
    <article className="appointment">{timeCheck()}</article>

    </>
  );
}