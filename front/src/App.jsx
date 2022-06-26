
import Main from './pages/Main';
import './styles/App.scss'

import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import Monster from './pages/Monster';
import Post from './pages/Post';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/monsters" element={<Monster />} />
          <Route path="/posts" element={<Post />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
