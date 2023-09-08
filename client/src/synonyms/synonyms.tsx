import React from "react";
import { Link } from "react-router-dom";

export const GetSynonyms = () => {
  return <h1>get some synonyms</h1>;
};

export const Addsynonyms = () => {
  return <h1>add Synonyms</h1>;
};

export const NavBar = () => {
  return (
    <div>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/getsynonyms">Get Synonyms</Link>
        <Link to="/addsynonyms">Add Synonyms</Link>
      </ul>
    </div>
  );
};
