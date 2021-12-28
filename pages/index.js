import { useEffect } from "react";
import Link from "next/link";
import { scales } from "../scales.js";
import Image from "next/image";
import styles from "../styles/index.module.css";

export default function LandingPage() {
  const list = Object.keys(scales);
  return (
    <>
      <div className="landing-page-poster">
        <div className="info">
          <h3 className="title">Data Feedback HR</h3>
          <hr className={styles.hrdark} />
          <p>
            Data Feedback HR je regionalni sustava koji olakšava prikupljanje
            podataka, automatizira obradu podataka i izvještavanje o rezultatima
            na prikupljenim podacima.
          </p>
        </div>
      </div>

      <hr className={styles.landinghr} />

      <div id="info" className={styles.description}>
        <h5>Informacije</h5>
        <p>
          Za testove, skale i upitnike s normama u otvorenom pristupu imate
          mogućnost ispunjavanja ili ukoliko ste imali primjenu na papirnatioj
          verziji, unošenja rezultata koji se automatski uspoređuju s tablicama
          normi. Nakon ispunjavanja ili unošenja sumarnih rezultata dobivate
          izvještaj o usporedbi rezultata s normama u otvorenom pristupu.
        </p>
        <p>
          Za testove skale i upitnike čije norme nisu u otvorenom pristupu
          dostupne su vam samo demo verzije sustava za ispunjavanje i
          izvještavanje pri čemu se ne koriste norme u vlasništvu izdavača tih
          mjernih instrumenata. Ukoliko ovaj sustav želite koristiti za
          olakšavanje prikupljanja i/ili izvještavanja s mjernim instrumentima
          čija ste prava korištenja kupili od izdavača, kontaktirajte nas za
          dodatne informacije.
        </p>
      </div>

      <hr className={styles.landinghr} />

      <div className="items-grid">
        {list.map((key, index) => (
          <div key={index} className="item">
            <h3>{scales[key].skalaIme}</h3>
            <div>
              <Link href={`/ispunjavanje/${scales[key].url}`}>
                Ispunjavanje
              </Link>
              <Link href={`/upisivanje/${scales[key].url}`}>Upisivanje</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
