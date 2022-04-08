import logo from './logo.svg';
import './App.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from './firebase.init';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
function App() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);

  const [name, setName] = useState('');


  const handelNameBlur = (event) => {
    setName(event.target.value);
  };


  const handelEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const handelPasswordBlur = (event) => {
    setPassword(event.target.value);
  };

  const handelFormSubmit = (event) => {
    // console.log("form submitted");
    // console.log(email, password);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('password should contain at least one speical charecter');
      return;
    }
    setValidated(true);
    setError('');

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        });

    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          verifyEmail();
          setUserName();
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }


    event.preventDefault();
  };

  const handelRegisteredChanged = (event) => {
    // console.log(event.target.checked);
    setRegistered(event.target.checked);
  };


  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email verification sent');
      });
  };

  const handelPasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
      });
  };

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log('updating name');
    }).catch((error) => {
        setError(error.message);
      })
  }



  return (
    <div className="App">
      {/* <form onSubmit={handelFormSubmit}>
        <input onBlur={handelEmailBlur} type="email" name="" id="" />
        <br />
        <input onBlur={handelPasswordBlur} type="password" name="" id="" />
        <br />
        <input type="submit" value="Login" />
      </form> */}

      <div className="registration w-50 mx-auto mt-5">
        <h2 className='text-primary'>Please {registered ? 'Login' : 'Register'}</h2>
        <Form noValidate validated={validated} onSubmit={handelFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handelEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>YourName:</Form.Label>
            <Form.Control onBlur={handelNameBlur} type="text" placeholder="Enter your Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide your name
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handelPasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password more than  charecter.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handelRegisteredChanged} type="checkbox" label="Already registered?" />
          </Form.Group>
          <p className='text-danger'>{error}</p>
          <Button onClick={handelPasswordReset} variant="link">Forget password?</Button>
          <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
