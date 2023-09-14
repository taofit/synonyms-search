import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddSynonyms = () => {
  const [inputSynonyms, setInputSynonyms] = useState([""]);

  const addSynonyms = () => {
    setInputSynonyms([...inputSynonyms, ""]);
  };

  const removeSynonyms = (index: number) => {
    const rows = [...inputSynonyms];
    rows.splice(index, 1);
    setInputSynonyms(rows);
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    const list = [...inputSynonyms];
    list[index] = value;
    setInputSynonyms(list);
  };

  const handleSubmit = async () => {
    if ([0, 1].includes(inputSynonyms.length)) {
      toast.error("No synonyms added");
      return;
    }
    const hasEmptyWord = inputSynonyms.some(
      (synonyms): boolean => synonyms.trim() === ""
    );
    if (hasEmptyWord) {
      toast.error("Synonyms has empty value");
      return;
    }
    const rawResponse = await fetch("http://localhost:5001/api/synonyms", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputSynonyms.map((w) => w.trim())),
    });
    if (!rawResponse.ok) {
      toast.error("error sent the synonyms to the backend");
      return;
    }
    toast.success("Successfully sent synonyms to the backend");
  };

  return (
    <div className="grid pb-6 place-content-center bg-indigo-100 text-black">
      <div>
        {inputSynonyms.map((data, index) => {
          return (
            <div className="row-span-1 py-2" key={index}>
              <input
                type="text"
                onChange={(event) => handleChange(index, event)}
                value={data}
                name="synonyms"
                className="placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                placeholder="enter a word"
              />
              {inputSynonyms.length !== 1 ? (
                <button
                  className="hover:rounded-lg text-red-600 px-2"
                  onClick={() => removeSynonyms(index)}
                >
                  x
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}

        <button
          className="w-3/4 inline-block border-solid border-black border rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={addSynonyms}
        >
          Add New
        </button>
      </div>
      <div className="row-auto py-2">
        <button
          className="w-3/4 inline-block border-solid border-black border rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AddSynonyms;
