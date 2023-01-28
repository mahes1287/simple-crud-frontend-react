import React, { useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function TranslationView() {
  const {
    user: { accessToken },
  } = useAuth();
  const { id } = useParams();

  console.log(id);
  return (
    <div className="flex flex-col space-y-2 max-w-7xl ml-5 mx-auto bg-orange-100 m-5 rounded-lg shadow-md hover:bg-orange-200">
      {/* <div className="text-xl ml-3 py-3">
        <span className="italic ">input: </span> {input}
      </div>
      <div className="text-xl ml-3 py-3">
        <span className="italic ">output: </span> {output}
      </div>
      <div className="text-xl ml-3 py-3">
        <span className="italic ">created by: </span> {fromUser}
      </div>
      <div className="flex sm:flex-col md:flex-row justify-center items-center">
        <Link
          to={`/translations/${id}/update`}
          state={{ input: input, output: output, id: id }}
          className="m-2 font-semibold bg-blue-100 hover:bg-blue-400 px-4 rounded-lg py-2"
        >
          edit
        </Link>
        <button className="m-2 font-semibold bg-red-100 hover:bg-red-400 px-4 rounded-lg py-2">
          delete
        </button>
      </div> */}
    </div>
  );
}
