import Main from "./pages/Main";
import "./styles/App.scss";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Monster from "./pages/Monster";
import Post from "./pages/Post";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
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
