import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";

export default function Translations() {
  const [translations, setTranslations] = useState([]);

  const { data, error, message } = useLoaderData();
  useEffect(() => {
    return setTranslations(data);
  }, [data]);

  // if (!localStorage.getItem("token")) {
  //   return (
  //     <div>
  //       Please <Link to={"/login"}>Login</Link>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div>There is following error: {message}. Contact site administrator</div>
    );
  }
  return (
    <div>
      <h1>Translations</h1>

      {translations.length === 0 ? (
        <div>Its lonely here... Add some data..</div>
      ) : (
        translations.map(({ input, output, fromUser, id }) => (
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
            <div className="flex sm:flex-col md:flex-row justify-center items-center">
              <Link
                to={`/translations/${id}/`}
                className="m-2 font-semibold bg-green-100 hover:bg-green-400 px-4 rounded-lg py-2"
              >
                view
              </Link>
              <Link
                to={`/translations/${id}/update/`}
                state={{ input: input, output: output, id: id }}
                className="m-2 font-semibold bg-blue-100 hover:bg-blue-400 px-4 rounded-lg py-2"
              >
                edit
              </Link>
              <DeleteDialog id={id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export async function translationsDataLoader() {
  let config = {
    method: "get",
    url: "http://127.0.0.1:8000/api/translations",
  };
  try {
    const response = await axios(config);
    console.log({ response });
    return { data: response.data, error: false, message: null };
  } catch (error) {
    console.log(JSON.parse(error.request.responseText).detail);
    return {
      data: null,
      error: true,
      message: JSON.parse(error.request.responseText).detail,
    };
  }
}
