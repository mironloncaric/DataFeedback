import { useState, useEffect } from "react";

import styles from "../styles/ispunjavanje.module.css";
import { useRouter } from "next/router";

export default function IspunjavanjeComponent(props) {
  const router = useRouter();

  const [gender, setGender] = useState("female");
  const [age, setAge] = useState(14);
  const [sums, setSums] = useState();
  const [itemsValue, setItemsValue] = useState({});
  const [error, setError] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <h3 className="scale-name">{props.scale.skalaIme}</h3>
      {Object.keys(props.scale.sumsImena).map((key, index) => (
        <div key={index} className={styles.upisInput}>
          <span className={styles.upisInputTitle}>
            {props.scale.sumsImena[key]}
          </span>
          <input
            className={styles.upisInputResult}
            name={key}
            type="number"
            value={itemsValue[key]}
            onChange={(e) => {
              if (
                e.target.value <= props.scale.n_skala[key] * 5 &&
                e.target.value >= 0
              ) {
                let temp = itemsValue;
                temp[key] = e.target.value;
                setItemsValue(() => ({ ...temp }));
                console.log(itemsValue);
              }
            }}
          />
        </div>
      ))}
      <div>{error && isSubmited && <div className="error">{error}</div>}</div>
      <>
        <label htmlFor="age">Starost</label>
        <input
          name="age"
          type="number"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
            if (e.target.value <= 14 && e.target.value >= 11) setError("");
          }}
        />
        <select
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="female">Žensko</option>
          <option value="male">Muško</option>
        </select>
      </>
      <button
        className="align-center btn-outline"
        onClick={() => {
          setIsSubmited(true);
          Object.keys(props.scale.sumsImena).forEach((key) => {
            if (!itemsValue[key]) itemsValue[key] = 0;
          });
          if (age < 11 || age > 14) {
            setError(
              "Norme nisu dostupne za ovu dob. Molim vas, unesite dob između 11 i 14 godina."
            );
            return;
          }
          if (error.length === 0) {
            props.setPropsSums(itemsValue);
            props.setPropsAge(age);
            props.setPropsGender(gender);
            props.setUpisDisplay(false);
          }
        }}
      >
        Submit
      </button>
      <br />
    </div>
  );
}
