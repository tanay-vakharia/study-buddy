import React, { useState, useEffect } from 'react';

const Task = ({ task, duration, onTaskFinish }) => {
  const [time, setTime] = useState(duration);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(time - 1), 60000);
    if (time <= 0) {
      setFinished(true);
    }
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  if (finished) {
    onTaskFinish(time);
    return <p className="text-lg-center">{task} &bull; Finished!</p>;
  }

  return (
    <p className="text-lg-center" style={{ fontSize: '19px' }}>
      {task} &bull; {time} {time !== 1 ? 'minutes' : 'minute'} left
    </p>
  );
};

export default Task;
