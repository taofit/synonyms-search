import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { GetSynonyms, Home } from "./synonyms/synonyms";
import Addsynonyms from "./synonyms/addSynonyms";
import Header from "./Header";

function App() {
  let activeClassName = "active px-1.5";
  return (
    <div>
      <Header />
      <div className="place-content-center bg-indigo-200 text-blue-900">
        <BrowserRouter>
          <nav className="text-center">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? activeClassName : "px-1.5"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="getsynonyms"
              className={({ isActive }) =>
                isActive ? activeClassName : "px-1.5"
              }
            >
              Get Synonyms
            </NavLink>
            <NavLink
              to="addsynonyms"
              className={({ isActive }) =>
                isActive ? activeClassName : "px-1.5"
              }
            >
              Add Synonyms
            </NavLink>
          </nav>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="getsynonyms" element={<GetSynonyms />} />
            <Route path="addsynonyms" element={<Addsynonyms />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
