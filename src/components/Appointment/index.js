import React from "react";
import Show from "./Show";
import Form from "./Form";
import Empty from "./Empty";
import Status from "./Status";
import Header from "./Header";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      });
  };

  const remove = (id) => {
    transition(DELETING);
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    });
  };

  const confirmRemove = () => {
    transition(CONFIRM);
  };

  return (
    <>
      <article className="appointment">
        <Header time={props.time}></Header>
        {mode === EMPTY &&
          <Empty
            onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => confirmRemove()}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save} />
        )}
        {mode === CONFIRM && (
          <Confirm
            message="Confirm Delete:"
            onConfirm={() => remove(props.id)} />
        )}
        {mode === SAVING && (
          <Status
            message="Saving..." />)}
        {mode === DELETING && (
          <Status
            message="Deleting..." />)}
      </article>
    </>
  );
}