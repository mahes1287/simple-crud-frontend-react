import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit } = useForm();

  const [data, setData] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function getData() {
      let config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_API_URL}/api/translations/${id}`,
      };
      try {
        const response = await axios(config);
        setData(response.data);
      } catch (error) {
        console.log(JSON.parse(error.request.responseText).detail);
        return {
          data: null,
          error: true,
          message: JSON.parse(error.request.responseText).detail,
        };
      }
    }
    getData();
  }, [id]);

  const onSubmit = (data) => {
    async function update() {
      let config = {
        method: "put",
        url: `${process.env.REACT_APP_BASE_API_URL}/api/translations/${id}/update`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          ...data,
          fromUser: localStorage.getItem("displayName"),
        }),
      };
      try {
        await axios(config);
        navigate("/translations");
      } catch (error) {
        console.log(error);
      }
    }
    update();
  };

  if (!localStorage.getItem("token")) {
    return (
      <div className="container mx-auto px-2 pt-5">
        Please{" "}
        <Link to={"/login"} className="text-blue-500 hover:text-blue-800">
          Login
        </Link>{" "}
        to edit
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 pt-5">
      <div>Update a translation</div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 pt-5 space-y-6">
        <div className="rounded-md shadow-sm space-y-5">
          <label
            htmlFor="input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your original text:
          </label>
          <textarea
            id="input"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Input text here..."
            {...register("input")}
            value={data.input}
            onChange={handleChange}
          ></textarea>

          <label
            htmlFor="output"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your translated text:
          </label>
          <textarea
            id="output"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Transaltion goes here..."
            {...register("output")}
            value={data.output}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className="m-2 font-semibold bg-blue-400 hover:bg-blue-700 px-4 rounded-lg py-2"
        >
          Update
        </button>
      </form>
    </div>
  );
}
