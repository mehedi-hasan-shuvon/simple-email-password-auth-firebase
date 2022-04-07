import logo from './logo.svg';
import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';
import { Button, Form } from 'react-bootstrap';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
function App() {

  const handelEmailBlur = (event) => {
    console.log(event.target.value);
  };
  const handelPasswordBlur = (event) => {
    console.log(event.target.value);
  };

  const handelFormSubmit = (event) => {
    console.log("form submitted");
    event.preventDefault();
  };

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
        <h2 className='text-primary'>Please Register Bro</h2>
        <Form onSubmit={handelFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handelEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handelPasswordBlur} type="password" placeholder="Password" />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
