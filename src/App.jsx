import Main from "./pages/Main";
import "./styles/App.scss";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Monster from "./pages/Monster";
import Post from "./pages/Post";
import { ToastContainer, toast } from "react-toastify";
import GlobalStyle from "./styles/global";
import React, { useEffect } from "react";
import socket from "./services/socket";



function App() {
  useEffect(() => {
    socket.connect();
    socket.on('notification', (data) => {
      console.log(data);
      if (data && data.message) {
        console.log(data.message);
        toast.info(data.message);
      }
    });

    return () => {
      socket.off("notification");
    };
  }, []);
  return (
    <div className="App">
       <ToastContainer />
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
