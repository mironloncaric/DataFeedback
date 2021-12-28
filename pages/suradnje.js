import styles from "../styles/suradnje.module.css";
import Image from "next/image";

import Lupa from "../images/lupa.png";
import ISSCI from "../images/ISSCI.png";

export default function Suradnje() {
  return (
    <div className="page-container">
      <a
        href="https://www.ufri.uniri.hr/hr/fakultet/ustrojfakulteta/katedre/katedra-za-obrazovne-znanosti/laboratorij-za-ucenje-i-poucavanje.html"
        target="new"
        className={`${styles.link}`}
      >
        <div className={`${styles.image}`}>
          <Image src={Lupa} layout="fill" objectFit="contain" />
        </div>
      </a>
      <br />
      <a href="https://issci.online/" target="new" className={`${styles.link}`}>
        <div className={`${styles.image}`}>
          <Image src={ISSCI} layout="fill" objectFit="contain" />
        </div>
      </a>
    </div>
  );
}
