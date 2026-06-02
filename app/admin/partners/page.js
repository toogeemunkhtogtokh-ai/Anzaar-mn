"use client";

import { useEffect, useState } from "react";

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarPartners")) || [];

    setPartners(saved);
  }, []);

  const handleLogo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setLogo(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const savePartner = () => {
    if (!name || !logo) {
      alert("Нэр болон лого оруулна уу");
      return;
    }

    const newPartner = {
      id: Date.now(),
      name,
      website,
      logo,
      active: true,
    };

    const updated = [...partners, newPartner];

    setPartners(updated);

    localStorage.setItem(
      "anzaarPartners",
      JSON.stringify(updated)
    );

    setName("");
    setWebsite("");
    setLogo("");

    alert("Хамтрагч хадгалагдлаа");
  };

  const deletePartner = (id) => {
    const updated = partners.filter(
      (partner) => partner.id !== id
    );

    setPartners(updated);

    localStorage.setItem(
      "anzaarPartners",
      JSON.stringify(updated)
    );
  };

  return (
    <main
      style={{
        background: "#050505",
        color: "#fff",
        minHeight: "100vh",
        padding: "60px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <a
        href="/admin"
        style={{
          color: "#aaa",
          textDecoration: "none",
        }}
      >
        ← Хяналтын самбар руу буцах
      </a>

      <h1
        style={{
          fontSize: 56,
          marginTop: 20,
          marginBottom: 40,
        }}
      >
        Хамтрагч байгууллагууд
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: 24,
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255,255,255,.08)",
            padding: 20,
          }}
        >
          <h2>Шинэ хамтрагч</h2>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Байгууллагын нэр"
            style={inputStyle}
          />

          <input
            value={website}
            onChange={(e) =>
              setWebsite(e.target.value)
            }
            placeholder="https://example.com"
            style={inputStyle}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleLogo}
            style={inputStyle}
          />

          {logo && (
            <img
              src={logo}
              alt=""
              style={{
                width: "100%",
                marginTop: 16,
                border: "1px solid rgba(255,255,255,.08)",
              }}
            />
          )}

          <button
            onClick={savePartner}
            style={saveButton}
          >
            Хамтрагч хадгалах
          </button>
        </div>

        <div
          style={{
            border: "1px solid rgba(255,255,255,.08)",
            padding: 20,
          }}
        >
          <h2>
            Хамтрагчид ({partners.length})
          </h2>

          {partners.length === 0 && (
            <p style={{ color: "#777" }}>
              Хамтрагч алга
            </p>
          )}

          {partners.map((partner) => (
            <div
              key={partner.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: 16,
                marginBottom: 14,
                border:
                  "1px solid rgba(255,255,255,.08)",
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                style={{
                  width: 100,
                  height: 60,
                  objectFit: "contain",
                  background: "#111",
                }}
              />

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                  }}
                >
                  {partner.name}
                </div>

                <div
                  style={{
                    color: "#999",
                    marginTop: 6,
                  }}
                >
                  {partner.website}
                </div>
              </div>

              <button
                onClick={() =>
                  deletePartner(partner.id)
                }
                style={{
                  background: "#d10000",
                  color: "#fff",
                  border: 0,
                  padding: "10px 18px",
                  cursor: "pointer",
                }}
              >
                Устгах
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: 14,
  marginTop: 14,
  background: "#111",
  border: "1px solid rgba(255,255,255,.08)",
  color: "#fff",
};

const saveButton = {
  width: "100%",
  marginTop: 18,
  background: "#e11212",
  color: "#fff",
  border: 0,
  padding: 16,
  cursor: "pointer",
  fontWeight: 700,
};
