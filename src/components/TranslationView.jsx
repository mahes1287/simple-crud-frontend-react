import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import axios from "axios";
export default function TranslationView() {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    async function getTranslation() {
      let config = {
        method: "get",
        url: `http://127.0.0.1:8000/api/translations/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const response = await axios(config);
        setData(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    getTranslation();
  }, []);

  return (
    <div className="flex flex-col space-y-2 max-w-7xl ml-5 mx-auto bg-orange-100 m-5 rounded-lg shadow-md hover:bg-orange-200">
      <div className="text-xl ml-3 py-3">
        <span className="italic ">input: </span> {data.input}
      </div>
      <div className="text-xl ml-3 py-3">
        <span className="italic ">output: </span> {data.output}
      </div>
      <div className="text-xl ml-3 py-3">
        <span className="italic ">created by: </span> {data.fromUser}
      </div>
      <div className="flex sm:flex-col md:flex-row justify-center items-center">
        <Link
          to={`/translations/${id}/update/`}
          state={{ input: data.input, output: data.output, id: id }}
          className="m-2 font-semibold bg-blue-100 hover:bg-blue-400 px-4 rounded-lg py-2"
        >
          edit
        </Link>
        <DeleteDialog id={id} />
      </div>
    </div>
  );
}
