import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Main from './pages/mainpg';
import Login from './pages/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' exact  element={<Login />}> </Route>
          <Route path = '/mainpg' Component={Main}> </Route> 
        </Routes>
 
      </Router>
     
    </div>
  );
}

export default App;
