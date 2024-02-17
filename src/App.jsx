// App.js
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connexion from './page/connexion';
import Inscription from './page/Inscription';
import Home from './page/Home';
import Fichiers from './page/fichiers';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={<Connexion/>} />
        <Route path="/inscription" element={<Inscription/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/list" element={<Fichiers/>} />
      </Routes>
    </Router>
  );
}

export default App;
