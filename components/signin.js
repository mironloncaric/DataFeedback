import { useState } from "react";

import { useAuth } from "./authcontext.js";
import styles from "../styles/signin.module.css";

export default function SignIn(props) {
  const { useSignIn } = useAuth();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");

  const [error, setError] = useState("");

  return (
    props.showLogin && (
      <div className={styles.loginbackground}>
        <div
          onClick={() => {
            setEmail("");
            setPassword("");
            setRepeatPassword("");
            setSuccess(false);
            setName("");
            setError("");
            setSurname("");
            props.setShowLogin(false);
          }}
          className={styles.quitlogin}
        ></div>
        <div className={styles.logincontainer}>
          {success ? (
            <div className="success">You have successfully registered</div>
          ) : (
            <>
              {error.trim().length !== 0 && (
                <div className="error">{error}</div>
              )}
              <h3>Login</h3>
              <div className="grid-50">
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  name="surname"
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Surname"
                />
              </div>
              <div>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                />
              </div>
              <div className="grid-50">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <input
                  name="repeat-password"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Repeat password"
                />
              </div>
              <button
                onClick={async () => {
                  setError("");
                  const { success, error } = await useSignIn(
                    name,
                    surname,
                    email,
                    password,
                    repeatPassword
                  );
                  if (!success) {
                    setError(error);
                  } else {
                    setSuccess(true);
                  }
                }}
              >
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    )
  );
}
