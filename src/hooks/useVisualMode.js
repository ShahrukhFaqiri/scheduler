import { React, useState } from "react";

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory([newMode, ...history.slice((1))]);
    } else {
      setHistory([newMode, ...history.slice((0))]);
    }
    setMode(newMode);
  }

  console.log(mode);

  function back() {
    if (history.length < 2) return;
    setHistory(history.slice(1));
    setMode(history.slice(1)[0]);
  }


  return { mode, transition, back };
}