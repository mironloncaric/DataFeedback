import { useState, useContext, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
  }
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  async function useSignIn(name, surname, email, password, repeatPassword) {
    let error = "";
    let success = true;
    if (
      name.trim() === "" ||
      surname.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      repeatPassword.trim() === ""
    ) {
      return { success: false, error: "All fields are required to sign in" };
    }
    if (!validateEmail(email)) {
      success = false;
      error = "Please enter a valid E-mail address";
      return { success, error };
    }
    if (password !== repeatPassword) {
      success = false;
      error = "Passwords do not match";
      return { success, error };
    }
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
        email,
        password,
      }),
    });
    if (response.status !== 200) {
      if (response.status === 409) {
        error = "User with this email already exists";
        success = false;
        return { error, success };
      } else if (response.status === 500) {
        error = "Internal server error";
        success = false;
        return { error, success };
      }
    }
    setIsRegistered(true);
    const res = await response.json();
    console.log(res.JWT, res.user);
    return { success, error };
  }
  const value = { useSignIn, isAuthenticated, isRegistered };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
