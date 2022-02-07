import { useState, useEffect } from "react";

import styles from "../styles/ispunjavanje.module.css";
import { useRouter } from "next/router";

export default function IspunjavanjeComponent(props) {
  const router = useRouter();

  const [gender, setGender] = useState("female");
  const [age, setAge] = useState(14);
  const [sums, setSums] = useState();
  const [itemsValue, setItemsValue] = useState({});

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
      <>
        <label htmlFor="age">Starost</label>
        <input
          name="age"
          type="number"
          value={age}
          onChange={(e) =>
            e.target.value >= 11 &&
            e.target.value <= 14 &&
            setAge(e.target.value)
          }
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
          Object.keys(props.scale.sumsImena).forEach((key) => {
            console.log(key);
            if (!itemsValue[key]) itemsValue[key] = 0;
          });
          console.log(itemsValue);
          props.setPropsSums(itemsValue);
          props.setPropsAge(age);
          props.setPropsGender(gender);
          props.setUpisDisplay(false);
        }}
      >
        Submit
      </button>
      <br />
    </div>
  );
}
