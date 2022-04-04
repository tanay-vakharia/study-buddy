import React, { useState } from 'react';
import Prompt from './Prompt';
import Study from './Study';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Clock from './Clock';
import SummaryList from './SummaryList';
import SummaryItem from './SummaryItem';

const App = () => {
  const [busy, setBusy] = useState(false);
  const [task, setTask] = useState('');
  const [duration, setDuration] = useState('');
  const [results, setResults] = useState([]);
  const [lastResult, setLastResult] = useState([]);
  const [show, setShow] = useState(false);
  const [timeStarted, setTimeStarted] = useState(new Date());

  const onFinish = (secondsFocused, secondsDistracted, timeElapsed = -1) => {
    setBusy(false);
    const res = [
      task,
      timeElapsed === -1 ? duration : timeElapsed,
      secondsFocused,
      secondsDistracted,
      timeStarted,
      new Date(),
    ];
    setResults([...results, res]);
    setLastResult(res);
    setShow(true);
  };

  const onTaskSubmit = (taskInput, durationInput) => {
    setBusy(true);
    setTask(taskInput);
    setDuration(durationInput);
    setTimeStarted(new Date());
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div
      style={{
        fontFamily: 'Bree Serif',
        userSelect: 'none',
        color: '#373737',
      }}
    >
      <div
        style={{
          backgroundColor: '#C2D9CD',
        }}
      >
        <Container
          style={{ marginRight: '0', marginLeft: '0', maxWidth: '100%' }}
        >
          <Row className="align-items-center">
            <Col sm={1}>
              <Image src="logo.png" style={{ maxWidth: '5rem' }}></Image>
            </Col>
            <Col sm={5} style={{ paddingLeft: '0' }}>
              <h1 style={{ fontSize: '27px' }}>study buddy</h1>
            </Col>
            <Col>
              <Clock />
            </Col>
          </Row>
        </Container>
        <hr style={{ color: '#373737', opacity: '100%', margin: 0 }} />
      </div>
      {busy ? (
        <Study task={task} duration={duration} onFinish={onFinish} />
      ) : (
        <div>
          <Prompt onTaskSubmit={onTaskSubmit} />
          <SummaryList results={results} />
          {show && (
            <SummaryItem
              setModal={show}
              handleClose={handleClose}
              result={lastResult}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
