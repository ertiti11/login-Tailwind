import { useState, useEffect } from "react";
import { createQuest } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { client } from "../api/auth";
export default function Quest() {
  const [selectedOption, setSelectedOption] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    document.title = "Encuesta";
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const nose = JSON.parse(window.localStorage.getItem("pocketbase_auth"));
    const data = {
      user: nose.model.id,
      respuesta: selectedOption,
    };

    await createQuest(data);
    setSubmit(true);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (submit) {
      client.authStore.clear();
      navigate("/finished");
    }
  }, [navigate, submit]);

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 w-full p-4">
      <div className="space-y-4  sm:p-8 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <form className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Encuesta
          </h1>
          <div className="control-group">
            <p className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">
              Vota por tu proyecto favorito (solo te dejará votar 1 sola vez)
            </p>

            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                name="colorOption"
                value="A"
                checked={selectedOption === "A"}
                onChange={handleOptionChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                AquaRefining: una forma limpia de reciclar plomo.
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                name="colorOption"
                value="B"
                checked={selectedOption === "B"}
                onChange={handleOptionChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Hywind Scotland: la primera granja flotante de aeros.
              </label>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Enviar mi Respuesta
          </button>
        </form>
      </div>
    </div>
  );
}
