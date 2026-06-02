"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BannerPage() {
  const [banners, setBanners] = useState([]);

  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("top");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarBanners")) || [];

    setBanners(saved);
  }, []);

  const saveBanners = (items) => {
    localStorage.setItem(
      "anzaarBanners",
      JSON.stringify(items)
    );

    setBanners(items);
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!title || !image) {
      alert("Гарчиг болон зураг оруулна уу.");
      return;
    }

    const newBanner = {
      id: Date.now(),
      title,
      position,
      url,
      image,
      active: true,
    };

    const updated = [newBanner, ...banners];

    saveBanners(updated);

    setTitle("");
    setPosition("top");
    setUrl("");
    setImage("");
  };

  const toggleStatus = (id) => {
    const updated = banners.map((banner) =>
      banner.id === id
        ? {
            ...banner,
            active: !banner.active,
          }
        : banner
    );

    saveBanners(updated);
  };

  const handleDelete = (id) => {
    const confirmed = confirm(
      "Энэ баннерыг устгах уу?"
    );

    if (!confirmed) return;

    const updated = banners.filter(
      (banner) => banner.id !== id
    );

    saveBanners(updated);
  };

  return (
    <main style={page}>
      <div style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <h1 style={titleStyle}>Баннер удирдлага</h1>

        <div style={grid}>
          <div style={formBox}>
            <h2>Шинэ баннер</h2>

            <input
              placeholder="Баннерын нэр"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              style={input}
            />

            <select
              value={position}
              onChange={(e) =>
                setPosition(e.target.value)
              }
              style={input}
            >
              <option value="top">
                Top Banner
              </option>

              <option value="inline">
                Inline Banner
              </option>

              <option value="sidebar">
                Sidebar Banner
              </option>
            </select>

            <input
              placeholder="https://..."
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              style={input}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={input}
            />

            {image && (
              <img
                src={image}
                alt=""
                style={{
                  width: "100%",
                  marginTop: 15,
                }}
              />
            )}

            <button
              onClick={handleAdd}
              style={addButton}
            >
              Баннер хадгалах
            </button>
          </div>

          <div style={listBox}>
            <h2>
              Баннерууд ({banners.length})
            </h2>

            {banners.length === 0 && (
              <p style={{ color: "#777" }}>
                Баннер алга
              </p>
            )}

            {banners.map((banner) => (
              <div
                key={banner.id}
                style={bannerCard}
              >
                <img
                  src={banner.image}
                  alt=""
                  style={thumb}
                />

                <div>
                  <h3
                    style={{
                      marginBottom: 6,
                    }}
                  >
                    {banner.title}
                  </h3>

                  <p style={meta}>
                    {banner.position}
                  </p>

                  <p style={meta}>
                    {banner.active
                      ? "Идэвхтэй"
                      : "Идэвхгүй"}
                  </p>
                </div>

                <div
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  <button
                    onClick={() =>
                      toggleStatus(
                        banner.id
                      )
                    }
                    style={statusButton}
                  >
                    {banner.active
                      ? "OFF"
                      : "ON"}
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        banner.id
                      )
                    }
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
};

const titleStyle = {
  fontSize: 48,
  marginTop: 20,
  marginBottom: 30,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "420px 1fr",
  gap: 30,
};

const formBox = {
  background: "#0d0d0d",
  border: "1px solid #222",
  padding: 24,
};

const listBox = {
  background: "#0d0d0d",
  border: "1px solid #222",
  padding: 24,
};

const input = {
  width: "100%",
  padding: 12,
  marginTop: 12,
  background: "#111",
  border: "1px solid #333",
  color: "#fff",
};

const addButton = {
  width: "100%",
  marginTop: 20,
  padding: 14,
  background: "#d71919",
  border: "none",
  color: "#fff",
  cursor: "pointer",
};

const bannerCard = {
  display: "flex",
  gap: 15,
  padding: 15,
  border: "1px solid #222",
  marginBottom: 15,
};

const thumb = {
  width: 140,
  height: 70,
  objectFit: "cover",
};

const meta = {
  color: "#888",
  fontSize: 13,
};

const statusButton = {
  display: "block",
  marginBottom: 8,
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
