import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import Loading from "./Loading";

export default function Translations() {
  const [translations, setTranslations] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");



  useEffect(() => {
    async function getData() {
      setLoading(true);
      const { data, error, message } = await translationsDataLoader();
      setTranslations(data);
      setError(error);
      setMessage(message);
      setLoading(false);
    }

    getData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div>
        <h1 className="text-2xl text-center">Translations</h1>
        There is following error: {message}. Contact site administrator
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl text-center ">List of Translations</h1>
      <div className="space-y-3 p-6">
        {translations.length ? (
          translations.map(({ input, output, fromUser, id }) => (
            <div
              key={id}
              className="flex flex-col space-y-2 max-w-7xl ml-5 mx-auto  bg-orange-100  rounded-lg shadow-md hover:bg-orange-200"
            >
              <div className="text-xl ml-3 py-3 truncate">
                <span className="italic ">input: </span> {input}
              </div>
              <div className="text-xl ml-3 py-3 truncate">
                <span className="italic ">output: </span> {output}
              </div>
              <div className="flex sm:flex-col md:flex-row justify-center items-center">
                <Link
                  to={`/translations/${id}/`}
                  className="m-2 font-semibold bg-green-100 hover:bg-green-400 px-4 rounded-lg py-2"
                >
                  view
                </Link>
                {localStorage.getItem("token") && (
                  <>
                    {" "}
                    <Link
                      to={`/translations/${id}/update/`}
                      state={{ input: input, output: output, id: id }}
                      className="m-2 font-semibold bg-blue-100 hover:bg-blue-400 px-4 rounded-lg py-2"
                    >
                      edit
                    </Link>
                    <DeleteDialog id={id}/>{" "}
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>Its lonely here... Add some data..</div>
        )}
      </div>
    </div>
  );
}

export async function translationsDataLoader() {
  let config = {
    method: "get",
    url: `${process.env.REACT_APP_BASE_API_URL}/api/translations/`,
  };

  try {
    const response = await axios(config);
    return { data: response.data, error: false, message: null };
  } catch (error) {
    return {
      data: null,
      error: true,
      message: "Something went wrong",
    };
  }
}
