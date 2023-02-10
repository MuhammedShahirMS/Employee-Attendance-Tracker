import {QRCodeSVG} from 'qrcode.react';
import { useState, useEffect } from 'react';
import UserAuth from './UserAuth';

import Modal from 'react-bootstrap/Modal';
import  Button  from "react-bootstrap/Button";

function QRScan (props) {
  
const [isScanned, setIsScanned] = useState(false);
const url = 'https://console.firebase.google.com/u/1/project/url-users/firestore/data/~2Fusers';

useEffect(() => {
  const timer = setTimeout(() => {
    setIsScanned(true)
  }, 3000);

  return () => {
    clearTimeout(timer);
  }

}, [])

 

  return (
    <>
      <Modal
        show='true'
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton onClick={() => {props.closeScanner()}}>
          <Modal.Title>Please Scan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { !isScanned && <QRCodeSVG value={url}/>}
          { isScanned && <UserAuth {...props}/> }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {props.closeScanner()}} variant="warning">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default QRScan;