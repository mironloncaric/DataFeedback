import { useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function ResultComponent(props) {
  const granice = props.scale.granice[props.propsGender][props.propsAge];
  const n_skala = props.scale.n_skala;
  const positive = props.scale.positive;
  const sumsImena = props.scale.sumsImena;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <h3>{props.scale.skalaIme}</h3>
      {Object.keys(granice).map((item, key) => (
        <div key={item}>
          <h5>{sumsImena[item]}</h5>
          {props.propsSums[item] <= granice[item][0] && (
            <p>
              Vaš rezultat je ispodprosječan i spada u prvi kvartil rezultata
              (25% najnižih rezultata za ispitanike vašeg spola i dobi)
            </p>
          )}
          {props.propsSums[item] > granice[item][0] &&
            props.propsSums[item] <= granice[item][1] && (
              <p>
                Važ rezultat je prosječan i spada u srednjih 25% rezultata (26.
                - 50. percentil)
              </p>
            )}
          {props.propsSums[item] >= granice[item][1] &&
            props.propsSums[item] < granice[item][2] && (
              <p>
                Važ rezultat je prosječan i spada u srednjih 25% rezultata (51.
                - 74. percentil)
              </p>
            )}
          {props.propsSums[item] >= granice[item][2] && (
            <p>
              Važ rezultat je iznadprosječan i spada u četvrti kvartil rezultata
              (25% najviših rezultata za ispitanike vašeg spola i dobi)
            </p>
          )}
        </div>
      ))}
      <div
        style={{
          height: "auto",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <Bar
          datasetIdKey="id"
          data={{
            labels: Object.keys(granice),
            datasets: [
              {
                label: "Rezultati",
                yAxisID: "yAxis",
                data: Object.keys(granice).map(
                  (key, index) => props.propsSums[key] / n_skala[key]
                ),
                backgroundColor: Object.keys(granice).map(
                  (key, index) =>
                    (props.propsSums[key] <= granice[key][0] &&
                      (positive[key]
                        ? // positive, small value
                          "rgba(107, 255, 250, 0.6)"
                        : // negative, small value
                          "rgba(204, 90, 90, 0.6)")) ||
                    (props.propsSums[key] > granice[key][0] &&
                      props.propsSums[key] <= granice[key][1] &&
                      (positive[key]
                        ? // positive, medium value
                          "rgba(217, 213, 95, 0.6)"
                        : // negative, medium value
                          "rgba(84, 214, 75, 0.6)")) ||
                    (props.propsSums[key] > granice[key][1] &&
                      props.propsSums[key] <= granice[key][2] &&
                      (positive[key]
                        ? "rgba(84, 214, 75, 0.6)"
                        : "rgba(217, 213, 95, 0.6)")) ||
                    // negative, medium value
                    (props.propsSums[key] > granice[key][2] &&
                      (positive[key]
                        ? // negative, small value
                          "rgba(204, 90, 90, 0.6)"
                        : // positive, small value
                          "rgba(107, 255, 250, 0.6)")) ||
                    "rgba(255, 206, 86, 1)"
                ),
                borderColor: Object.keys(granice).map(
                  (key, index) =>
                    (props.propsSums[key] <= granice[key][0] &&
                      (positive[key]
                        ? // positive, small value
                          "rgba(107, 255, 250, 0.6)"
                        : // negative, small value
                          "rgba(204, 90, 90, 0.6)")) ||
                    (props.propsSums[key] > granice[key][0] &&
                      props.propsSums[key] <= granice[key][1] &&
                      (positive[key]
                        ? // positive, medium value
                          "rgba(217, 213, 95, 0.6)"
                        : // negative, medium value
                          "rgba(84, 214, 75, 0.6)")) ||
                    (props.propsSums[key] > granice[key][1] &&
                      props.propsSums[key] <= granice[key][2] &&
                      (positive[key]
                        ? "rgba(84, 214, 75, 0.6)"
                        : "rgba(217, 213, 95, 0.6)")) ||
                    // negative, medium value
                    (props.propsSums[key] > granice[key][2] &&
                      (positive[key]
                        ? // negative, small value
                          "rgba(204, 90, 90, 0.6)"
                        : // positive, small value
                          "rgba(107, 255, 250, 0.6)")) ||
                    "rgba(255, 206, 86, 1)"
                ),
                borderWidth: 1,
              },
              {
                label: "Prosječni rezultati",
                data: Object.keys(granice).map(
                  (key, index) => granice[key][1] / n_skala[key]
                ),
                backgroundColor: "rgba(214, 214, 214, 0.6)",
                borderColor: "rgba(214, 214, 214, 1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            indexAxis: "y",
            aspectRatio: 1.5,
            maintainAspectRatio: true,
            scales: {
              yAxis: {
                ticks: {
                  font: {
                    size: 9,
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />{" "}
      </div>{" "}
    </div>
  );
}
