"use client";

import { useEffect, useState } from "react";

const ADMIN_USERNAME = "anzaar_admin";
const ADMIN_PASSWORD = "CHANGE_THIS_PASSWORD";

export default function AdminGuard({ children }) {
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("anzaarAdminLoggedIn");

    if (session === "true") {
      setLoggedIn(true);
    }

    setChecked(true);
  }, []);

  const handleLogin = () => {
    if (
      username.trim() === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("anzaarAdminLoggedIn", "true");
      setLoggedIn(true);
      return;
    }

    alert("Нэвтрэх нэр эсвэл нууц үг буруу байна.");
  };

  const handleLogout = () => {
    localStorage.removeItem("anzaarAdminLoggedIn");
    window.location.href = "/admin";
  };

  if (!checked) {
    return (
      <main style={page}>
        <p style={{ color: "#888" }}>Шалгаж байна...</p>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main style={page}>
        <section style={loginBox}>
          <h1 style={title}>Admin нэвтрэх</h1>

          <p style={desc}>
            Anzaar.mn хяналтын самбар руу нэвтрэхийн тулд нэр, нууц үгээ
            оруулна уу.
          </p>

          <label style={label}>Нэвтрэх нэр</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="anzaar_admin"
            style={input}
            autoComplete="username"
          />

          <label style={label}>Нууц үг</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={input}
            autoComplete="current-password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <button onClick={handleLogin} style={button}>
            Нэвтрэх
          </button>
        </section>
      </main>
    );
  }

  return (
    <>
      <button onClick={handleLogout} style={logoutButton}>
        Гарах
      </button>

      {children}
    </>
  );
}

const page = {
  background: "#050505",
  color: "#fff",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
  fontFamily: "Arial, sans-serif",
};

const loginBox = {
  width: "100%",
  maxWidth: 420,
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: 28,
};

const title = {
  fontSize: 34,
  margin: "0 0 12px",
};

const desc = {
  color: "#888",
  lineHeight: 1.6,
  marginBottom: 24,
};

const label = {
  display: "block",
  marginTop: 16,
  marginBottom: 8,
  color: "#aaa",
  fontSize: 13,
  textTransform: "uppercase",
};

const input = {
  width: "100%",
  padding: 14,
  background: "#0b0b0b",
  border: "1px solid #333",
  color: "#fff",
  boxSizing: "border-box",
  fontSize: 15,
  outline: "none",
};

const button = {
  width: "100%",
  marginTop: 22,
  padding: 14,
  background: "#d71919",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: 15,
};

const logoutButton = {
  position: "fixed",
  right: 18,
  bottom: 18,
  zIndex: 9999,
  background: "#222",
  color: "#fff",
  border: "1px solid #444",
  padding: "10px 14px",
  cursor: "pointer",
  fontFamily: "Arial",
  fontSize: 13,
};
