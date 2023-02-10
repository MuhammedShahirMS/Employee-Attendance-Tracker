import { useState, useEffect } from 'react';
import { db } from "../Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import  Button  from "react-bootstrap/Button";
import QRScan from './QRScan';
import Table from 'react-bootstrap/Table';

const UsersList = () => {

    const usersCollectionRef = collection(db, 'users');
    const [isQRMode, setQRMode] = useState(false);
    const[entries, setEntries]  = useState([]);

    const getUsers = async () => {
      const data       = await getDocs(usersCollectionRef);
      const users      = data.docs.map(document => ({...document.data(), id: document.id}));
      setEntries(users);
    }

    useEffect(() => {
      getUsers();
    }, [])

    const closeHandler = () => {
      setQRMode(false);
    }


    return (
  
        <Container fluid>
        {isQRMode && <QRScan closeScanner = {closeHandler} reRender = {getUsers}/>}
        <Row className='mt-5'>
        <Col md={8} >
        <h2>Check In & Check Out Status of Attendees</h2>
        </Col> 
        <Col md={4} >
        <Button onClick={() => setQRMode(true)}>Scan QR</Button>
        </Col> 
        </Row>

  
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>status</th>
          <th>Name</th>
          <th>Location</th>
          <th>E-mail</th>
          <th>Last Check-In</th>
          <th>Last Check-Out</th>
        </tr>
      </thead>
      <tbody>
      {entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.status}</td>
                    <td>{entry.name}</td>
                    <td>Location</td>
                    <td>{entry.email}</td>
                    <td>{entry.lastCheckIn}</td>
                    <td>{entry.lastCheckOut}</td>
                  </tr>
                ))
                }
      </tbody>
    </Table>
    </Container>
    )

}

export default UsersList;