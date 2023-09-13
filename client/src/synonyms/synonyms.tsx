import React from "react";

export const Home = () => {
  return (
    <div className="grid place-content-center bg-indigo-100 text-black">
      <h1>Search & Add Synonyms</h1>
      <ul className="list-disc list-inside">
        <li>The user should be able to add new words with synonyms.</li>
        <li>
          The user should be able to ask for synonyms for a word and lookup
          should work in both directions. For example, If "wash" is a synonym to
          "clean", then I should be able to look up both words and get the
          respective synonyms.
        </li>
        <li>
          A word may have multiple synonyms and all should be returned at a user
          request.
        </li>
        <li>
          Make the solution with simple, but fast, data structures in the
          backend's memory - no persistence needed.
        </li>
        <li>
          Transitive rule implementation, i.e. if "B" is a synonym to "A" and
          "C" a synonym to "B", then "C" should automatically, by transitive
          rule, also be the synonym for "A".
        </li>
      </ul>
    </div>
  );
};
