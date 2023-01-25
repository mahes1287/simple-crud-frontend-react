import React from "react";

export default function Translations() {
  return (
    <div>
      <h1>Translations</h1>
      {new Array(5).fill(null).map((item, index) => (
        <div
          key={index}
          className="flex flex-col space-y-2 max-w-7xl ml-5 mx-auto bg-orange-100 m-5 rounded-lg shadow-md hover:bg-orange-200"
        >
          <div className="text-xl ml-3 py-3">
            <span className="italic ">input: </span> Amma
          </div>
          <div className="text-xl ml-3 py-3">
            <span className="italic ">output: </span> Mummy
          </div>
          <div className="flex sm:flex-col md:flex-row justify-center items-center">
            <button className="m-2 font-semibold bg-green-100 hover:bg-green-400 px-4 rounded-lg py-2">
              view
            </button>
            <button className="m-2 font-semibold bg-blue-100 hover:bg-blue-400 px-4 rounded-lg py-2">
              edit
            </button>
            <button className="m-2 font-semibold bg-red-100 hover:bg-red-400 px-4 rounded-lg py-2">
              delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
