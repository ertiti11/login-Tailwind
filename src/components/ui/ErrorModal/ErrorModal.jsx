import { useState } from "react";
import { useAuth } from "../../../context/authContext";
import { useEffect } from "react";
export default function ErrorModal({ isOpen, onClose, text }) {
  const { error, setError } = useAuth();
  const [status, setStatus] = useState("block"); // Cambié el estado inicial a "block"
  const [errorText, setErrorText] = useState("Error desconocido"); // Agregué este estado para guardar el error y mostrarlo en el modal

  useEffect(() => {
    if (text === "Failed to authenticate.") {
      setErrorText("Usuario o contraseña incorrectos");
    } else if (text === "Failed to create record.") {
      setErrorText(
        "Este usuario ya existe, prueba con otro correo electronico u otro usuario"
      );
    }
  }, [text]);

  const closeModal = () => {
    setStatus("hidden");
    setError(null); // Agregué esta línea para que se limpie el error al cerrar el modal
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed ${status} inset-0 flex items-center justify-center `}
    >
      <div className="modal-overlay -z-50 fixed inset-0 bg-black opacity-50"></div>
      <div className="modal bg-white rounded-lg shadow-lg w-96 dark:bg-gray-700 p-4">
        <div className="flex items-start justify-between p-4 border-b dark:bg-gray-700  rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-red-600">{text}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal"
            onClick={closeModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="modal-content p-4 text-white">{errorText}</div>
        <button
          className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
}
