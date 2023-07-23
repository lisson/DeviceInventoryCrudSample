import './App.css';
import './DeviceInventoryFront.css';
import Create from './actions/Create';
import Read from './actions/Read';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  document.body.style.overflow = "scroll"
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">Devices</h2>
        <div>
          <Routes>
              <Route exact path='/create' element={<Create />} />
              <Route exact path='/' element={<Read />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;