import React from 'react';
import { Form, Col, Button, FormControl } from 'react-bootstrap';
import muse from '../apis/muse';

const Prompt = ({ onTaskSubmit }) => {
  const onClickSubmit = (e) => {
    const task = e.target[0].value;
    const duration = e.target[1].value;
    if (!task || Number.isInteger(duration) || duration <= 0) {
      e.preventDefault();
      alert('Please input a valid task and/or duration');
      return;
    }
    startFocus();
    e.preventDefault();
    onTaskSubmit(e.target[0].value, e.target[1].value);
  };

  const startFocus = async (e) => {
    await muse.get('/start_focus');
  };

  const connectMuse = async (e) => {
    await muse.post('/connect_muse', null, {
      params: {
        id: e,
      },
    });
  };

  const onConnectSubmit = (e) => {
    const id = 'Muse-' + e.target[0].value;
    e.preventDefault();
    connectMuse(id);
  };
  return (
    <div>
      <div
        style={{
          margin: '40px 500px 20px 500px',
          backgroundColor: '#f9f6f2',
          border: '2px solid #434C56',
        }}
      >
        <div style={{ padding: '30px' }}>
          <Form onSubmit={onConnectSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Muse ID</Form.Label>
              <Form.Control type="id" placeholder="####" />
            </Form.Group>
            <Col xs="auto" className="my-1">
              <Button variant="secondary" type="submit">
                Connect
              </Button>
            </Col>
          </Form>
        </div>
      </div>
      <div
        style={{
          margin: '30px 500px 20px 500px',
          backgroundColor: '#f9f6f2',
          border: '2px solid #434C56',
        }}
      >
        <div style={{ padding: '30px' }}>
          <Form onSubmit={onClickSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>What's your task?</Form.Label>
              <Form.Control type="task" placeholder="" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>How many minutes?</Form.Label>
              <Form.Control type="duration" placeholder="" />
            </Form.Group>
            <Col xs="auto" className="my-1">
              <Button variant="secondary" type="submit">
                Start
              </Button>
            </Col>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
