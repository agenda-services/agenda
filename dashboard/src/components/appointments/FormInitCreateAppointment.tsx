import type { FormEvent } from "react";
import { navigate } from "astro:transitions/client";
import { useRef } from "react";
import { useStore } from "@nanostores/react";
import { client } from "../../stores/clientStore";

export default function FormInitCreateAppointment() {
  const $client = client.get();
  const nameRef = useRef(null);

  const handleNameValue = () => {
    $client.firstName = nameRef.current?.value || "";
  };

  const goToSchedulePerson = (event: FormEvent) => {
    event.preventDefault();
    navigate("/schedule-person");
  };

  return (
    <form onSubmit={goToSchedulePerson} className="flex w-full items-end my-3">
      <label className="flex flex-col w-full" htmlFor="schedule-person">
        <span className="mb-3 text-xl font-bold">Agendar una cita para...</span>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M7 2a2 2 0 0 0-2 2v1a1 1 0 0 0 0 2v1a1 1 0 0 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a1 1 0 1 0 0 2v1a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7Zm3 8a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-1 7a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3 1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            ref={nameRef}
            onChange={handleNameValue}
            id="schedule-person"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            required
          />
        </div>
      </label>
      <button
        type="submit"
        className="p-2.5 ms-2 text-sm font-medium text-white rounded-lg border focus:ring-4 focus:outline-none"
      >
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m9 5 7 7-7 7"
          ></path>
        </svg>
      </button>
    </form>
  );
}
