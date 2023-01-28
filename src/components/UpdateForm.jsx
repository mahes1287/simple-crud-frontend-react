import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext, { useAuth } from "../contexts/AuthContext";
import axios, * as others from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateForm() {
  //   console.log({ input, output, id });
  const navigate = useNavigate();
  const {
    state: { input, output, id },
  } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user} = useAuth();

  const [data, setData] = useState({ input, output });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = (data) => {
    async function update() {
      let config = {
        method: "put",
        url: `http://127.0.0.1:8000/api/translations/${id}/update`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          ...data,
          fromUser: user.displayName,
        }),
      };
      try {
        const response = await axios(config);
        navigate("/translations");
      } catch (error) {
        console.log(error);
      }
    }
    update();
  };
  return (
    <div className="bg-gray-100">
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

        <button type="submit" className="">
          Submit
        </button>
      </form>
    </div>
  );
}
