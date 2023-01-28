import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import axios, * as others from "axios";
import { Link } from "react-router-dom";

export default function Translations() {
  const [translations, setTranslations] = useState([]);
  const { user, loading, error, auth } = useContext(AuthContext);
  auth.onIdTokenChanged(async (user) => {
    const token = await user?.getIdToken();
    localStorage.setItem("token", token);
  });

  useEffect(() => {
    async function getAllTranslations() {
      let config = {
        method: "get",
        url: "http://127.0.0.1:8000/api/translations",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const response = await axios(config);
        setTranslations(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllTranslations();
  }, []);
  return (
    <div>
      <h1>Translations</h1>
      {translations.map(({ input, output, fromUser, id }) => (
        <div
          key={id}
          className="flex flex-col space-y-2 max-w-7xl ml-5 mx-auto bg-orange-100 m-5 rounded-lg shadow-md hover:bg-orange-200"
        >
          <div className="text-xl ml-3 py-3">
            <span className="italic ">input: </span> {input}
          </div>
          <div className="text-xl ml-3 py-3">
            <span className="italic ">output: </span> {output}
          </div>
          <Link
            to={`/translations/${id}/`}
            state={{ input: input, output: output, id: id, fromUser: fromUser }}
            className="flex sm:flex-col md:flex-row justify-center items-center"
          >
            <button className="m-2 font-semibold bg-green-100 hover:bg-green-400 px-4 rounded-lg py-2">
              view
            </button>
            <Link
              to={`/translations/${id}/update/`}
              state={{ input: input, output: output, id: id }}
              className="m-2 font-semibold bg-blue-100 hover:bg-blue-400 px-4 rounded-lg py-2"
            >
              edit
            </Link>
            <button className="m-2 font-semibold bg-red-100 hover:bg-red-400 px-4 rounded-lg py-2">
              delete
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
