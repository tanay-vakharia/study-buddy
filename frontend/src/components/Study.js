import React, { useState, useEffect, useCallback, useRef } from 'react';
import Task from './Task';
import { Button, Image } from 'react-bootstrap';
import muse from '../apis/muse';
import './Study.css';

const Study = ({ task, duration, onFinish }) => {
  // Data we get from the muse (Focused or not focused)
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(true);
  const [secondsFocused, setSecondsFocused] = useState(0);
  const [secondsDistracted, setSecondsDistracted] = useState(0);
  const beats = useRef(new Audio('beats.mp3'));

  const callMuse = useCallback(async () => {
    const { data } = await muse.get('/get_focus');
    setFocused(data.state);
  }, []);

  useEffect(() => {
    callMuse();
    const interval = setInterval(() => callMuse(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [callMuse]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (focused) {
        setSecondsFocused(secondsFocused + 1);
      } else {
        setSecondsDistracted(secondsDistracted + 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [focused, secondsDistracted, secondsFocused]);

  const onTaskFinish = () => {
    onFinish(secondsFocused, secondsDistracted);
    beats.current.pause();
  };

  const OnEarlyTaskFinish = () => {
    onFinish(
      secondsFocused,
      secondsDistracted,
      Math.ceil((secondsDistracted + secondsFocused) / 60)
    );
    beats.current.pause();
  };

  const onBeatsClick = () => {
    setPaused(!paused);
    paused ? beats.current.play() : beats.current.pause();
  };

  return (
    <div style={{ marginTop: '35px' }}>
      <h4 className="text-center">
        you are currently{' '}
        <span className={focused ? 'focused' : 'distracted'}>
          {focused ? 'focused' : 'not focused'}
        </span>
      </h4>
      <div className="text-center">
        <Image
          src="./lofiMuse.jpg"
          className="fluid rounded shadow-2-strong"
          alt="LoFi Muse"
          style={{
            maxWidth: '27rem',
            marginBottom: '13px',
            marginTop: '8px',
          }}
        ></Image>
        <Task task={task} duration={duration} onTaskFinish={onTaskFinish} />
        <Button
          variant={paused ? 'outline-secondary' : 'secondary'}
          onClick={onBeatsClick}
          style={{ marginRight: '10px' }}
        >
          {paused ? 'get focused' : 'stop the sound'}
        </Button>
        <Button
          variant="outline-danger"
          onClick={OnEarlyTaskFinish}
          style={{ marginLeft: '10px' }}
        >
          end
        </Button>{' '}
      </div>
    </div>
  );
};

export default Study;
