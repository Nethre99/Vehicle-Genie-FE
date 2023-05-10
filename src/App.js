import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Main from './pages/mainpg';
import Login from './pages/login';
import Advertisement from './pages/advertisement';
import AddListening from './pages/addlistening';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' exact  element={<Login />}> </Route>
          <Route path = '/mainpg' Component={Main}> </Route>
          <Route path='/view' Component={Advertisement}></Route>
          <Route path='/addListning' Component={AddListening}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
