import { React, useState } from "react";

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory((prev) => [newMode, ...prev.slice((1))]);
    } else {
      setHistory((prev) => [newMode, ...prev.slice((0))]);
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