import './App.css';
import {
  Routes,
  Route,
  Navigate, 
} from "react-router-dom";  
import SignIn from './components/SignIn';
import Main from './components/Main';


function App() {
  console.log(localStorage.getItem('chainerToken'));
  if(localStorage.getItem('chainerToken') != null) {
    return (
      <Main/>
    )
  } else {
    return <SignIn/>; 
  }
}

export default App;
