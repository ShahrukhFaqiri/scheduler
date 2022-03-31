import { React, useState } from "react";
/* 
1) Transition through the different modes for dynamic display 
2) back/cancel 
*/
export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init]);
  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory((prev) => [newMode, ...prev.slice((1))]);
    } else {
      setHistory((prev) => [newMode, ...prev.slice((0))]);
    }
    setMode(newMode);
  };

  const back = () => {
    if (history.length < 2) return;
    setHistory(history.slice(1));
    setMode(history.slice(1)[0]);
  };

  return { mode, transition, back };
}