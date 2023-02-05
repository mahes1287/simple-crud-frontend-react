import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function TranslationForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    async function create() {
      let config = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_API_URL}/api/translations/create`,
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
    create();
  };

  if (!localStorage.getItem("token")) {
    return (
      <div>
        Please{" "}
        <Link to={"/login"} className="text-blue-500 hover:text-blue-800">
          Login
        </Link>{" "}
        to create
      </div>
    );
  }

  return (
    <div className="bg-gray-100 container mx-auto">
      <div>Create new translation</div>
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
          ></textarea>
        </div>

        <button
          type="submit"
          className="m-2 font-semibold bg-green-100 hover:bg-green-400 px-4 rounded-lg py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
