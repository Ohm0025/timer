import style from "./timer.module.css";
import Select from "react-select";
import { useEffect, useState, useRef } from "react";

const generateOptions = (count, pad) => {
  return Array.from({ length: count }, (v, k) => ({
    value: pad ? String(k).padStart(2, "0") : k,
    label: pad ? String(k).padStart(2, "0") : k,
  }));
};

const hours = generateOptions(24, true);
const min = generateOptions(60, true);
const sec = generateOptions(60, true);

const Timer = () => {
  const [selectedHr, setSelectedHr] = useState(null);
  const [selectedMin, setSelectedMin] = useState(null);
  const [selectedSec, setSelectedSec] = useState(null);

  const [time, setTime] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTime = () => {
    if (selectedHr || selectedMin || selectedSec) {
      const totalSec =
        parseInt(selectedHr?.value || 0) * 60 * 60 +
        parseInt(selectedMin?.value || 0) * 60 +
        parseInt(selectedSec?.value || 0);

      setTime(totalSec);

      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTime = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  return (
    <>
      <div className={style.container}>
        <Select
          className={style.select}
          placeholder="HH"
          options={hours}
          value={selectedHr}
          onChange={setSelectedHr}
        />
        <span className={style.separator}>:</span>
        <Select
          className={style.select}
          placeholder="MM"
          options={min}
          value={selectedMin}
          onChange={setSelectedMin}
        />
        <span className={style.separator}>:</span>
        <Select
          className={style.select}
          placeholder="SS"
          options={sec}
          value={selectedSec}
          onChange={setSelectedSec}
        />
        <button onClick={startTime}>play</button>
        <button onClick={stopTime}>stop</button>
      </div>
      <div>{time ? time : "It's time"}</div>
    </>
  );
};

export default Timer;
