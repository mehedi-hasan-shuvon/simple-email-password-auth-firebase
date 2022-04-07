import logo from './logo.svg';
import './App.css';
import { getAuth } from "firebase/auth";
import app from './firebase.init';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
function App() {
  return (
    <div className="App">
      <form action="">
        <input type="text" />
        <input type="password" />
      </form>
    </div>
  );
}

export default App;
