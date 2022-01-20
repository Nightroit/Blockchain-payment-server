import './App.css';
import {
  BrowserRouter,
  Routes,
  Route, 
} from "react-router-dom";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  if(localStorage.getItem('token')) {
    return ""
  }
  return (
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
  );
}

export default App;
