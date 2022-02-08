import { useState, useEffect } from "react";

import styles from "../styles/ispunjavanje.module.css";
import { useRouter } from "next/router";
import { scales } from "../scales.js";

export default function IspunjavanjeComponent(props) {
  const router = useRouter();

  const [gender, setGender] = useState("female");
  const [age, setAge] = useState(14);
  const [sums, setSums] = useState();
  const [itemsValue, setItemsValue] = useState({});
  const [error, setError] = useState(null);
  const [isSubmited, setIsSubmited] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (Object.keys(itemsValue).length < props.scale.pitanja.length)
      setError("Molim vas, odgovorite na sva pitanja");
    else if (age > 14 || age < 11)
      setError(
        "Norme nisu dostupne za ovu dob. Molim vas, unesite dob između 11 i 14 godina."
      );
    else setError("");
  }, [itemsValue, error, age]);

  if (props) {
    return (
      <div className="page-container">
        <h3 className="scale-name">{props.scale.skalaIme}</h3>
        {props.scale.pitanja.map((question, index) => (
          <div className={styles.scaleInputItem} key={index}>
            <h5
              className={`${
                isSubmited && !itemsValue[`${props.scale.url}${index}`] && "red"
              }`}
            >
              {props.scale.pitanja[index]}
            </h5>
            <div className={styles.questionRadio}>
              <div className={styles.scaleInputRadioItem}>
                <label>1</label>
                <input
                  checked={itemsValue[`${props.scale.url}${index}`] === 1}
                  onChange={(e) => {
                    let temp = {};
                    temp = itemsValue;
                    temp[`${props.scale.url}${index}`] = 1;
                    setItemsValue(() => ({ ...temp }));
                  }}
                  value={1}
                  type="radio"
                  name={index}
                />
              </div>
              <div className={styles.scaleInputRadioItem}>
                <label>2</label>
                <input
                  checked={itemsValue[`${props.scale.url}${index}`] === 2}
                  onChange={(e) => {
                    let temp = {};
                    temp = itemsValue;
                    temp[`${props.scale.url}${index}`] = 2;
                    setItemsValue(() => ({ ...temp }));
                  }}
                  value={2}
                  type="radio"
                  name={index}
                />
              </div>
              <div className={styles.scaleInputRadioItem}>
                <label>3</label>
                <input
                  checked={itemsValue[`${props.scale.url}${index}`] === 3}
                  onChange={(e) => {
                    let temp = {};
                    temp = itemsValue;
                    temp[`${props.scale.url}${index}`] = 3;
                    setItemsValue(() => ({ ...temp }));
                  }}
                  value={3}
                  type="radio"
                  name={index}
                />
              </div>
              <div className={styles.scaleInputRadioItem}>
                <label>4</label>
                <input
                  checked={itemsValue[`${props.scale.url}${index}`] === 4}
                  onChange={(e) => {
                    let temp = {};
                    temp = itemsValue;
                    temp[`${props.scale.url}${index}`] = 4;
                    setItemsValue(() => ({ ...temp }));
                  }}
                  value={4}
                  type="radio"
                  name={index}
                />
              </div>
              <div className={styles.scaleInputRadioItem}>
                <label>5</label>
                <input
                  checked={itemsValue[`${props.scale.url}${index}`] === 5}
                  onChange={(e) => {
                    let temp = {};
                    temp = itemsValue;
                    temp[`${props.scale.url}${index}`] = 5;
                    setItemsValue(() => ({ ...temp }));
                  }}
                  value={5}
                  type="radio"
                  name={index}
                />
              </div>
            </div>
          </div>
        ))}
        <div>{error && isSubmited && <div className="error">{error}</div>}</div>
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
        <button
          className="align-center btn-outline"
          onClick={() => {
            setIsSubmited(true);
            if (!error || error.length === 0) {
              //console.log("No error");
              const scaleSums = {};
              Object.keys(props.scale.sumsTemplate).forEach((item, key) => {
                let a = 0;
                props.scale.sumsTemplate[item].forEach((num) => {
                  a += Number(itemsValue[`${props.scale.url}${num - 1}`]);
                });
                scaleSums[item] = a;
              });
              props.setPropsSums(scaleSums);
              props.setPropsAge(age);
              props.setPropsGender(gender);
              props.setUpisDisplay(false);
              //console.log(scaleSums);
              /*
            if (token) {
              fetch("/api/post-token", {
                method: "POST",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userToken: token,
                  name: props.name,
                  sums: scaleSums,
                }),
              }).then((response) => {
                router.push(response.url);
              });
            } else {
              props.setUpisDisplay(false);
            }
            */
            }
          }}
        >
          Submit
        </button>
        <br />
      </div>
    );
  } else {
    return <span>Loading...</span>;
  }
}
