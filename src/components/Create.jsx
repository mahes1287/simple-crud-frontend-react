import React from "react";
import { useForm } from "react-hook-form";
import axios, * as others from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function TranslationForm({ input, output, reqType }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    async function create() {
      let config = {
        method: "post",
        url: "http://127.0.0.1:8000/api/translations/create",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
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
    create();
  };
  return (
    <div className="bg-gray-100">
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

        <button type="submit" className="">
          Submit
        </button>
      </form>
    </div>
  );
}
