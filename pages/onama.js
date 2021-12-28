import styles from "../styles/onama.module.css";

export default function oNama() {
  return (
    <div className="page-container">
      <h2>O nama</h2>
      <div className="grid-30">
        <div className="item text-align-center">
          <div className={`${styles.img} ${styles.darko} center`}></div>
          <strong>Darko Lončarić</strong>
          <p>Urednik</p>
        </div>
        <div className="item text-align-center">
          <div className={`${styles.img} ${styles.miron} center`}></div>
          <strong>Miron Lončarić</strong>
          <p>Programer i grafički dizajner</p>
        </div>
        <div className="item text-align-center">
          <div className={`${styles.img} ${styles.antonia} center`}></div>
          <strong>Antonia Ćurić</strong>
          <p>Analitičarka i grafička dizajnerica</p>
        </div>
      </div>
    </div>
  );
}
