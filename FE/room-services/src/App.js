import React from "react";
import Choice from "./component/Choice";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from "./component/Chat";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Choice />} />
          <Route path="/chat/:slug" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
