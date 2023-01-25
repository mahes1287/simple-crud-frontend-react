import React from "react";

export default function TranslationForm() {
  return (
    <div className="bg-gray-100">
      <form className="mt-8 pt-5 space-y-6" action="#" method="POST">
        <div className="rounded-md shadow-sm space-y-5">
          <label
            for="input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your original text:
          </label>
          <textarea
            id="input"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Input text here..."
          ></textarea>

          <label
            for="output"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your translated text:
          </label>
          <textarea
            id="output"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Transaltion goes here..."
          ></textarea>
        </div>

        <button type="submit" className="">
          Submit
        </button>
      </form>
    </div>
  );
}
