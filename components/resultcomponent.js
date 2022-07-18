import { useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export default function ResultComponent(props) {
  const granice = props.scale.granice[props.propsGender][props.propsAge];
  const n_skala = props.scale.n_skala;
  const positive = props.scale.positive;
  const sumsImena = props.scale.sumsImena;
  const skale = props.scale.skale;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <h3>{props.scale.skalaIme}</h3>
      {Object.keys(granice).map((item, key) => (
        <div key={item}>
          <h5>{`${sumsImena[item]} ${skale[key]}`}</h5>
          {(!props.propsSums[item] ||
            props.propsSums[item] <= granice[item][0]) && (
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
          {props.propsSums[item] > granice[item][1] &&
            props.propsSums[item] <= granice[item][2] && (
              <p>
                Važ rezultat je prosječan i spada u srednjih 25% rezultata (51.
                - 74. percentil)
              </p>
            )}
          {props.propsSums[item] > granice[item][2] && (
            <p>
              Važ rezultat je iznadprosječan i spada u četvrti kvartil rezultata
              (25% najviših rezultata za ispitanike vašeg spola i dobi)
            </p>
          )}
        </div>
      ))}
      <hr />
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
                          "rgba(255, 154, 162, 0.7)"
                        : // negative, small value
                          "rgba(199, 206, 234, 0.7)")) ||
                    (props.propsSums[key] > granice[key][0] &&
                      props.propsSums[key] <= granice[key][1] &&
                      (positive[key]
                        ? // positive, medium value
                          "rgba(255, 218, 193, 0.7)"
                        : // negative, medium value
                          "rgba(181, 234, 215, 0.7)")) ||
                    (props.propsSums[key] > granice[key][1] &&
                      props.propsSums[key] <= granice[key][2] &&
                      (positive[key]
                        ? "rgba(181, 234, 215, 0.7)"
                        : "rgba(255, 218, 193, 0.7)")) ||
                    // negative, medium value
                    (props.propsSums[key] > granice[key][2] &&
                      (positive[key]
                        ? // negative, small value
                          "rgba(199, 206, 234, 0.7)"
                        : // positive, small value
                          "rgba(255, 154, 162, 0.7)")) ||
                    "rgba(255, 206, 86, 1)"
                ),
                borderColor: Object.keys(granice).map(
                  (key, index) =>
                    (props.propsSums[key] <= granice[key][0] &&
                      (positive[key]
                        ? // positive, small value
                          "rgba(255, 154, 162, 1)"
                        : // negative, small value
                          "rgba(199, 206, 234, 1)")) ||
                    (props.propsSums[key] > granice[key][0] &&
                      props.propsSums[key] <= granice[key][1] &&
                      (positive[key]
                        ? // positive, medium value
                          "rgba(255, 218, 193, 1)"
                        : // negative, medium value
                          "rgba(181, 234, 215, 1)")) ||
                    (props.propsSums[key] > granice[key][1] &&
                      props.propsSums[key] <= granice[key][2] &&
                      (positive[key]
                        ? "rgba(181, 234, 215, 1)"
                        : "rgba(255, 218, 193, 1)")) ||
                    // negative, medium value
                    (props.propsSums[key] > granice[key][2] &&
                      (positive[key]
                        ? // negative, small value
                          "rgba(199, 206, 234, 1)"
                        : // positive, small value
                          "rgba(255, 154, 162, 1)")) ||
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
      <hr />
      <p>
        Na grafičkim prikazima prosječan rezultat za skupinu određenog spola i
        dobi označen je sivom bojom. Rezultati osobe za koju se izrađuje profil
        označeni su različitim bojama s obzirom na povezanost s proaktivnom
        samoregulacijom učenja*. Proaktivna samoregulacija učenja povezana je s
        osobinama i aktivnostima koje vode napretku u usvajanju znanja, vještina
        i povećava vjerojatnost aktivnog korištenje usvojenih znanja i vještina.
      </p>
      <p>
        Na nekim skalama za to su poticajni iznadprosječni (51-75 percentil)
        rezultati i izrazito iznadprosječni rezultati (više od 75-og
        percentila), a u nekim ispodprosječni (26-50 percentil) i izrazito
        ispodprosječni rezultati (do 25-og percentila). Rezultati povezani s
        povećanjem proaktivne samoregulacije učenja poticajne za ulaganje truda
        u stjecanje znanja i vještina uz želju za njihovim aktivnim korištenjem
        označeni su zelenom i tirkiznom bojom. Rezultati koji su povezani sa
        smanjenjem proaktivne samoregulacije označeni su žutom ili crvenom
        bojom.{" "}
      </p>
      <p>
        Poželjan profil je u zelenoj boji uz posebno pozitivne karakteristike
        izražene tirkiznom bojom na pojedinim mjerama. Žuta boja ne mora
        ukazivati na probleme, ali crvena boja ukazuje na područja na kojima je
        potrebno dodatno raditi. Pretežito crvena boja može ukazivati na obrazac
        izostanka proaktivne samoregulacije i naučenu bespomoćnost ili na
        samoregulaciju prema ciljevima učenja koji nisu optimalni. Pretežito
        crvena boja na većini mjera može ukazivati i na poziv u pomoć ili na
        provokaciju, dok pretežito tirkizna boja na većini mjera može ukazivati
        na sklonost davanju socijalno poželjnih odgovora. Oba ekstremna obrasca
        mogu ukazivati na potrebu za pažnjom. Konačnu interpretaciju mora uz
        dodatne informacije donesti kvalificirana osoba.
      </p>
      <p>
        *Za druge kriterije (npr. prosječan školski uspjeh) shema boja je
        drugačija i nije dio automatiziranih izvještaja.
      </p>
    </div>
  );
}
