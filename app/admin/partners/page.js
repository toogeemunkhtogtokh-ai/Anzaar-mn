"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  const savePartners = (items) => {
    try {
      localStorage.setItem("anzaarPartners", JSON.stringify(items));
      setPartners(items);
    } catch (error) {
      console.error("Partners save error:", error);

      alert(
        "Хамтрагч хадгалагдсангүй. Лого зураг том байх эсвэл browser localStorage дүүрсэн байж магадгүй."
      );
    }
  };

  const handleLogo = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setLogo("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Зөвхөн зураг файл оруулна уу.");
      e.target.value = "";
      setLogo("");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Логоны хэмжээ 2MB-аас бага байх шаардлагатай.");
      e.target.value = "";
      setLogo("");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setLogo(reader.result);
    };

    reader.onerror = () => {
      alert("Лого уншихад алдаа гарлаа. Өөр зураг сонгоно уу.");
      e.target.value = "";
      setLogo("");
    };

    reader.readAsDataURL(file);
  };

  const savePartner = () => {
    if (!name.trim()) {
      alert("Байгууллагын нэр оруулна уу.");
      return;
    }

    if (!logo) {
      alert("Лого зураг оруулна уу.");
      return;
    }

    const newPartner = {
      id: Date.now(),
      name: name.trim(),
      website: website.trim(),
      logo,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newPartner, ...partners];

    savePartners(updated);

    setName("");
    setWebsite("");
    setLogo("");

    alert("Хамтрагч амжилттай хадгалагдлаа.");
  };

  const togglePartner = (id) => {
    const updated = partners.map((partner) =>
      partner.id === id
        ? {
            ...partner,
            active: partner.active === false ? true : false,
            updatedAt: new Date().toISOString(),
          }
        : partner
    );

    savePartners(updated);
  };

  const deletePartner = (id) => {
    const confirmed = confirm("Энэ хамтрагчийг устгах уу?");
    if (!confirmed) return;

    const updated = partners.filter((partner) => partner.id !== id);

    savePartners(updated);
  };

  return (
    <main style={page}>
      <div style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <h1 style={titleStyle}>Хамтрагч байгууллагууд</h1>

        <div style={grid}>
          <div style={formBox}>
            <h2 style={boxTitle}>Шинэ хамтрагч</h2>

            <label style={label}>Байгууллагын нэр</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Жишээ: Anzaar Media"
              style={inputStyle}
            />

            <label style={label}>Website холбоос</label>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
              style={inputStyle}
            />

            <label style={label}>Лого зураг</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogo}
              style={inputStyle}
            />

            {logo && (
              <div style={previewBox}>
                <p style={hint}>Preview</p>
                <img src={logo} alt="preview" style={previewLogo} />
              </div>
            )}

            <p style={hint}>
              Лого зураг 2MB-аас бага байх ёстой. PNG буюу transparent background-тэй
              зураг илүү зохимжтой.
            </p>

            <button onClick={savePartner} style={saveButton}>
              Хамтрагч хадгалах
            </button>
          </div>

          <div style={listBox}>
            <div style={listHeader}>
              <div>
                <h2 style={boxTitle}>Хамтрагчид</h2>
                <p style={hint}>Нийт {partners.length} хамтрагч байна</p>
              </div>
            </div>

            {partners.length === 0 && (
              <div style={emptyBox}>
                Одоогоор хамтрагч байгууллага нэмэгдээгүй байна.
              </div>
            )}

            {partners.map((partner) => (
              <div key={partner.id} style={partnerCard}>
                <div style={logoBox}>
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    style={partnerLogo}
                  />
                </div>

                <div style={partnerInfo}>
                  <h3 style={partnerName}>{partner.name}</h3>

                  {partner.website && (
                    <p style={meta}>{partner.website}</p>
                  )}

                  <span
                    style={
                      partner.active === false ? inactiveBadge : activeBadge
                    }
                  >
                    {partner.active === false ? "Идэвхгүй" : "Идэвхтэй"}
                  </span>
                </div>

                <div style={actions}>
                  <button
                    onClick={() => togglePartner(partner.id)}
                    style={statusButton}
                  >
                    {partner.active === false ? "ON" : "OFF"}
                  </button>

                  <button
                    onClick={() => deletePartner(partner.id)}
                    style={deleteButton}
                  >
                    Устгах
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

const page = {
  background: "#050505",
  color: "#fff",
  minHeight: "100vh",
  padding: 60,
  fontFamily: "Arial, sans-serif",
};

const container = {
  maxWidth: 1400,
  margin: "0 auto",
};

const backLink = {
  color: "#999",
  textDecoration: "none",
  display: "inline-block",
  marginBottom: 22,
};

const titleStyle = {
  fontSize: 48,
  margin: "0 0 30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "420px 1fr",
  gap: 30,
};

const formBox = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: 24,
};

const listBox = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: 24,
};

const boxTitle = {
  margin: 0,
  fontSize: 22,
};

const listHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 18,
};

const label = {
  display: "block",
  marginTop: 16,
  marginBottom: 8,
  color: "#aaa",
  fontSize: 13,
  textTransform: "uppercase",
};

const inputStyle = {
  width: "100%",
  padding: 13,
  background: "#0b0b0b",
  border: "1px solid #333",
  color: "#fff",
  boxSizing: "border-box",
  fontSize: 14,
};

const previewBox = {
  marginTop: 18,
  border: "1px solid #222",
  padding: 14,
  background: "#080808",
};

const previewLogo = {
  width: "100%",
  maxHeight: 180,
  objectFit: "contain",
  background: "#000",
  display: "block",
};

const hint = {
  color: "#777",
  fontSize: 13,
  lineHeight: 1.5,
  marginTop: 12,
};

const saveButton = {
  width: "100%",
  marginTop: 20,
  padding: 14,
  background: "#d71919",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const emptyBox = {
  color: "#777",
  border: "1px solid #222",
  padding: 20,
  marginTop: 18,
};

const partnerCard = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  padding: 15,
  border: "1px solid #222",
  marginBottom: 15,
  background: "#080808",
};

const logoBox = {
  width: 160,
  height: 80,
  background: "#000",
  border: "1px solid #222",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const partnerLogo = {
  maxWidth: "90%",
  maxHeight: "70%",
  objectFit: "contain",
};

const partnerInfo = {
  flex: 1,
};

const partnerName = {
  margin: "0 0 8px",
  fontSize: 20,
};

const meta = {
  color: "#888",
  fontSize: 13,
  margin: "4px 0",
};

const activeBadge = {
  display: "inline-block",
  marginTop: 8,
  background: "#0e3b18",
  color: "#7ee787",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
};

const inactiveBadge = {
  display: "inline-block",
  marginTop: 8,
  background: "#222",
  color: "#aaa",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
};

const actions = {
  marginLeft: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const statusButton = {
  padding: "8px 12px",
  background: "#333",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const deleteButton = {
  padding: "8px 12px",
  background: "#8b0000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};
