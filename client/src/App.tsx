import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { GetSynonyms, Addsynonyms, NavBar } from "./synonyms/synonyms";

function App() {
  return (
    <div className="text-3xl font-bold underline">
      <BrowserRouter>
        having a kind heart
        <NavBar />
        <Routes>
          <Route path="/getsynonyms" element={<GetSynonyms />} />
          <Route path="/addsynonyms" element={<Addsynonyms />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
