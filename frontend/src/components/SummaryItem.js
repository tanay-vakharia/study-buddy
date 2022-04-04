import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SummaryItem = ({ setModal, handleClose, result }) => {
  return (
    <>
      <Modal
        size="sm"
        show={setModal}
        onHide={handleClose}
        style={{
          fontFamily: 'Bree Serif',
          color: '#373737',
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>
            Your Task Summary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: '13px' }}>
          <p>
            Task: <i style={{ color: '#2f4f4f' }}>{result[0]}</i>
          </p>
          <p>
            Time Started:{' '}
            <i style={{ color: '#2f4f4f' }}>
              {result[4]
                .toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })
                .toLowerCase()}{' '}
            </i>
          </p>
          <p>
            Time Ended:{' '}
            <i style={{ color: '#2f4f4f' }}>
              {result[5]
                .toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })
                .toLowerCase()}{' '}
            </i>
          </p>
          <p>
            Duration:{' '}
            <i style={{ color: '#2f4f4f' }}>
              {result[1]} {result[1] === 1 ? 'minute' : 'minutes'}
            </i>
          </p>
          <p>
            Percentage Focused:{' '}
            <i style={{ color: '#2f4f4f' }}>
              {Math.round((100.0 * result[2]) / (result[2] + result[3]))}%
            </i>
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SummaryItem;
