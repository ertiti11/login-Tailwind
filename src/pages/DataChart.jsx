import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto"; // Importa Chart.js
import { getData } from "../api/auth";

const DataChart = () => {
  const chartRef = useRef(null);

  const [votes, setVotes] = useState("");

  useEffect(() => {
    const fetchDataAndCreateChart = async () => {
      const { respuestas, votes } = await getData();
      setVotes(votes);
      
      if (respuestas) {
        try {
          const data = {
            labels: [
              "Opción A: AquaRefining: una forma limpia de reciclar plomo.",
              "Opción B: Hywind Scotland, la primera granja flotante de aeros.",
            ],
            datasets: [
              {
                data: respuestas,
                backgroundColor: ["#25CF0D", "#0D65CF"],
              },
            ],
          };

          const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: "white",
                  font: {
                    size: 16,
                  },
                },
              },
            },
          };

          // Crea el gráfico de Chart.js en el elemento canvas
          const doughnutChart = new Chart(chartRef.current, {
            type: "doughnut",
            data: data,
            options: options,
          });
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      } else {
        throw new Error("No se encontraron datos");
      }
    };

    fetchDataAndCreateChart();
  }, []);


  return (
    <>
      <div className="w-full flex justify-center mt-24">
        <h1 className="text-4xl font-bold text-white">
          Resultados de votación
        </h1>
      </div>

      <div className="w-1/2 mx-auto h-auto mt-24">
        <>
          <div>
            <canvas ref={chartRef} className="w-full h-96"></canvas>
          </div>
          <div>
            <h1 className="mt-12 text-4xl text-center font-bold text-white">
              Votos: {votes}
            </h1>
          </div>
        </>
      </div>
    </>
  );
};

export default DataChart;
