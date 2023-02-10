import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { updateDoc, doc } from 'firebase/firestore';
import { useRef} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserAuth = props => {

    const emailId = useRef();
    const userName = useRef();
    const usersCollectionRef = collection(db, 'users');

    const logout = (docId) => {
        const userDoc = doc(db, 'users', docId); 
        const newField = {lastCheckOut : new Date().toString(),
                          status: 'Checked-out'
        }
        updateDoc( userDoc , newField);
        props.reRender();
    }

    const logIn = (docId) => {
        const userDoc = doc(db, 'users', docId); 
        const date    = new Date().toString();
        const newField = {lastCheckIn : date,
                          status: 'Checked-in'
        }
        updateDoc( userDoc , newField);
        props.reRender();
    }

    const signUpUser = async (emailId, userName) => {
        const date    = new Date();
        await addDoc(usersCollectionRef, {
            name   : userName,
            email  : emailId,
            lastCheckIn: date.toString(),
            lastCheckOut: '',
            status: 'Checked-in'
        })
        props.reRender();
     }

     const firstLogout = (docId, timeOfSignUp) => {
        const userDoc = doc(db, 'users', docId); 
        const date    = new Date().toString();
        const newField = {lastCheckIn : timeOfSignUp,
                          lastCheckOut: date,
                          status: 'Checked-out'
        }
        updateDoc( userDoc , newField);
        props.reRender();
     }

    const checkUser = async (emailId, name) => {
        const data       = await getDocs(usersCollectionRef);
        const users      = data.docs.map(document => ({...document.data(), id: document.id}));
        const user       = users.filter(person => person.email === emailId);
        
        if(user.length !== 0) {
            console.log('User Found');
            const userExact  = user[0];
            if(userExact.lastCheckOut === '') {
                firstLogout(userExact.id, userExact.lastCheckIn);
                return;
            }
            if(Date.parse(userExact.lastCheckIn) > Date.parse(userExact.lastCheckOut)) {
                logout(userExact.id);
            }
            
            else {
                logIn(userExact.id);
            }}
        
            else if(user.length === 0) {
                console.log('User not found. Signing up...')
                signUpUser(emailId, name);
            }
    }


    const submitHandler = (e) => {
        e.preventDefault();
        checkUser(emailId.current.value, userName.current.value);
        props.closeScanner();
    }

    return(
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={emailId} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fullName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Full Name" ref={userName}/>
      </Form.Group>
      <Button className="ms-5" variant="primary" type="submit">
        Punch
      </Button>
    </Form>
    )
}

export default UserAuth;