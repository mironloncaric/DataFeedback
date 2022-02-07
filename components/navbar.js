import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/navbar.module.css";
import SignIn from "./signin.js";
import { useAuth } from "./authcontext.js";

export default function Navbar() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const { isAuthenticated, isRegistered } = useAuth();

  return (
    <>
      <nav>
        <Link href="/">
          <a className={styles.navlogo}>DFeed</a>
        </Link>
        <div id={show ? "show" : ""} className={`${styles.navlinks} navlinks`}>
          <div>
            <Link href="/izvori">
              <a className={styles.navlink}>Izvori</a>
            </Link>
            <Link href="/onama">
              <a className={styles.navlink}>O nama</a>
            </Link>
            <Link href="/suradnje">
              <a className={styles.navlink}>Suradnje</a>
            </Link>
          </div>
          <hr />
          {/*
          {!(isAuthenticated || isRegistered) && (
            <div className="auth">
              <button
                onClick={() => {
                  if (!showLogin) {
                    setShowLogin(true);
                    setShow(false);
                  }
                }}
                className={styles.navlink}
              >
                Sign up
              </button>
              <button className={styles.navlink}>Log in</button>
              <br />
            </div>
          )}*/}
        </div>
        <button
          className={styles.hidetoggle}
          id="hide-toggle"
          onClick={() => {
            show ? setShow(false) : setShow(true);
          }}
        >
          ...
        </button>
      </nav>
      <SignIn showLogin={showLogin} setShowLogin={setShowLogin} />
    </>
  );
}
