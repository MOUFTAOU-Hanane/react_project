// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connexion from './page/connexion';
import Inscription from './page/Inscription';
import Home from './page/Home';
import Fichiers from './page/fichiers';
import Protected from './page/Protected';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<Connexion/>} />
        <Route path="/inscription" element={<Inscription/>} />
        <Route path='/' element={<Protected/>} >
          <Route path="/home" element={<Home/>} />
          <Route path="/list" element={<Fichiers/>} />
        </Route>
       
      </Routes>
    </Router>
  );
}

export default App;
