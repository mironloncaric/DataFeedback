import { useEffect, useState } from "react";

import { useExtractPayload } from "../utils/JsonWebToken.js";
import styles from "../styles/signin.module.css";

export default function VerifyToken({ token }) {
  const [email, setEmail] = useState("");

  useEffect(async () => {
    console.log("token: ", token);
    const { payload, success, error } = await useExtractPayload(token);
    if (!error) setEmail(payload.email);
    else console.log(error);
  }, [token]);

  return (
    <div className={styles.loginbackground}>
      <div className={styles.logincontainer}>
        <p>E-mail: {email}</p>
        <button className="btn">Verify</button>
      </div>
    </div>
  );
}
