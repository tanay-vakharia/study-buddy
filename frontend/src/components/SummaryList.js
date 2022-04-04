import React from 'react';
import { Table } from 'react-bootstrap';

const SummaryList = ({ results }) => {
  const items = (res) => {
    return res.map((task, index) => {
      return (
        <tr key={index}>
          <td>{task[0]}</td>
          <td>
            {task[4]
              .toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })
              .toLowerCase()}
          </td>
          <td>
            {task[5]
              .toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })
              .toLowerCase()}
          </td>
          <td>{task[1]}</td>
          <td>{Math.round((100.0 * task[2]) / (task[2] + task[3]))}%</td>
        </tr>
      );
    });
  };

  return (
    <div
      style={{
        margin: '30px 500px 20px 500px',
        backgroundColor: '#f9f6f2',
        border: '2px solid #434C56',
      }}
    >
      <div style={{ padding: '34px' }}>
        <h3>Tasks Summary</h3>
        <Table striped bordered hover style={{ fontSize: '16px' }}>
          <thead>
            <tr>
              <th>Task</th>
              <th>Time Started</th>
              <th>Time Ended</th>
              <th>Duration (min)</th>
              <th>Percentage focused</th>
            </tr>
          </thead>
          <tbody>{items(results)}</tbody>
        </Table>
      </div>
    </div>
  );
};

export default SummaryList;
