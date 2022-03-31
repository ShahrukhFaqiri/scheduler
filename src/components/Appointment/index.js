import React from "react";
import Show from "./Show";
import Form from "./Form";
import Error from "./Error";
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
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
 
    transition(SAVING);
    props.bookInterview(props.id, interview, mode)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => transition(ERROR_SAVE, true));
  };

  const remove = (id) => {
    transition(DELETING, true)
    props.cancelInterview(props.id).then(() => {
      transition(EMPTY);
    })
      .catch(error => transition(ERROR_DELETE, true));
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
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
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
            message="Are you want to delete?"
            onConfirm={() => remove(props.id)}
            onCancel={back}
             />
        )}
        {mode === EDIT && (
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
        {mode === SAVING && (
          <Status
            message="Saving..." />)}
        {mode === DELETING && (
          <Status
            message="Deleting..." />)}
        {mode === ERROR_SAVE && (
          <Error message="There was an error saving!" onClose={back} />
        )}
        {mode === ERROR_DELETE && (
          <Error message="There was an error deleting!" onClose={back} />
        )}
      </article>
    </>
  );
}