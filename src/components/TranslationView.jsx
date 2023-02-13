import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import axios from "axios";

export default function TranslationView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getTranslation() {
      let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_API_URL}/api/translations/${id}/`,
      };
      try {
        const response = await axios(config);
        // console.log(response);
        setData(response.data.data);
        setLoading(false);
        return response.data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getTranslation();
  }, [id, loading]);
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div className="flex flex-col space-y-2 max-w-7xl m-5 bg-orange-100 rounded-lg shadow-md hover:bg-orange-200">
      {data && data.error ? (
        <div className="text-xl ml-3 py-3 text-center">
          Requested translation not available.{" "}
        </div>
      ) : (
        <>
          <div className="text-xl ml-3 py-3">
            <span className="italic ">input: </span> {data.input}
          </div>
          <div className="text-xl ml-3 py-3">
            <span className="italic ">output: </span> {data.output}
          </div>
          <div className="text-xl ml-3 py-3">
            <span className="italic ">created by: </span> {data.fromUser}
          </div>

          {localStorage.getItem("displayName") ? (
            <>
              <div className="flex sm:flex-col md:flex-row justify-center items-center">
                <button
                  className="m-2 font-semibold bg-yellow-100 hover:bg-yellow-500 px-4 rounded-lg py-2"
                  onClick={() => navigate(-1) || navigate("/translations")}
                >
                  Go back
                </button>
                <Link
                  to={`/translations/${id}/update/`}
                  state={{ input: data.input, output: data.output, id: id }}
                  className="m-2 font-semibold bg-blue-100 hover:bg-blue-400 px-4 rounded-lg py-2"
                >
                  edit
                </Link>
                <DeleteDialog id={id} />{" "}
              </div>
            </>
          ) : (
            <button
              className="m-2 font-semibold bg-yellow-100 hover:bg-yellow-500 px-4 rounded-lg py-2"
              onClick={() => navigate(-1) || navigate("/translations")}
            >
              Go back
            </button>
          )}
        </>
      )}
    </div>
  );
}
