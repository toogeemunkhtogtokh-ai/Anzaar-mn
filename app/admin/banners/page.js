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
    try {
      localStorage.setItem("anzaarBanners", JSON.stringify(items));
      setBanners(items);
    } catch (error) {
      console.error("Banner save error:", error);

      alert(
        "Баннер хадгалагдсангүй. Зургийн хэмжээ их байх эсвэл browser localStorage дүүрсэн байж магадгүй."
      );
    }
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImage("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Зөвхөн зураг файл оруулна уу.");
      e.target.value = "";
      setImage("");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Зургийн хэмжээ 2MB-аас бага байх шаардлагатай.");
      e.target.value = "";
      setImage("");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.onerror = () => {
      alert("Зураг уншихад алдаа гарлаа. Өөр зураг сонгоно уу.");
      e.target.value = "";
      setImage("");
    };

    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!title.trim()) {
      alert("Баннерын нэр оруулна уу.");
      return;
    }

    if (!image) {
      alert("Баннерын зураг оруулна уу.");
      return;
    }

    const newBanner = {
      id: Date.now(),
      title: title.trim(),
      position,
      url: url.trim(),
      image,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [
      newBanner,
      ...banners.map((banner) =>
        banner.position === position
          ? {
              ...banner,
              active: false,
              updatedAt: new Date().toISOString(),
            }
          : banner
      ),
    ];

    saveBanners(updated);

    setTitle("");
    setPosition("top");
    setUrl("");
    setImage("");

    alert("Баннер амжилттай хадгалагдлаа.");
  };

  const toggleStatus = (id) => {
    const target = banners.find((banner) => banner.id === id);
    if (!target) return;

    const nextActive = !target.active;

    const updated = banners.map((banner) => {
      if (banner.id === id) {
        return {
          ...banner,
          active: nextActive,
          updatedAt: new Date().toISOString(),
        };
      }

      if (nextActive && banner.position === target.position) {
        return {
          ...banner,
          active: false,
          updatedAt: new Date().toISOString(),
        };
      }

      return banner;
    });

    saveBanners(updated);
  };

  const handleDelete = (id) => {
    const confirmed = confirm("Энэ баннерыг устгах уу?");

    if (!confirmed) return;

    const updated = banners.filter((banner) => banner.id !== id);

    saveBanners(updated);
  };

  const getPositionLabel = (value) => {
    if (value === "top") return "Top Banner";
    if (value === "inline") return "Inline Banner";
    return "Banner";
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
            <h2 style={boxTitle}>Шинэ баннер</h2>

            <label style={label}>Баннерын нэр</label>
            <input
              placeholder="Жишээ: Нүүр хуудасны дээд баннер"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={input}
            />

            <label style={label}>Байрлал</label>
            <select
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={input}
            >
              <option value="top">Top Banner</option>
              <option value="inline">Inline Banner</option>
            </select>

            <label style={label}>Холбоос</label>
            <input
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={input}
            />

            <label style={label}>Зураг</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={input}
            />

            {image && (
              <div style={imagePreviewBox}>
                <p style={hint}>Preview</p>
                <img src={image} alt="preview" style={previewImage} />
              </div>
            )}

            <p style={hint}>
              Зургийн хэмжээ 2MB-аас бага байх ёстой. Top banner-д 1200×90,
              Inline banner-д 1200×120 хэмжээтэй зураг тохиромжтой.
            </p>

            <button onClick={handleAdd} style={addButton}>
              Баннер хадгалах
            </button>
          </div>

          <div style={listBox}>
            <div style={listHeader}>
              <div>
                <h2 style={boxTitle}>Баннерууд</h2>
                <p style={hint}>Нийт {banners.length} баннер байна</p>
              </div>
            </div>

            {banners.length === 0 && (
              <div style={emptyBox}>
                Одоогоор баннер нэмэгдээгүй байна.
              </div>
            )}

            {banners.map((banner) => (
              <div key={banner.id} style={bannerCard}>
                <img src={banner.image} alt={banner.title} style={thumb} />

                <div style={bannerInfo}>
                  <h3 style={bannerTitle}>{banner.title}</h3>

                  <p style={meta}>
                    Байрлал: {getPositionLabel(banner.position)}
                  </p>

                  {banner.url && (
                    <p style={meta}>
                      Холбоос: {banner.url}
                    </p>
                  )}

                  <span style={banner.active ? activeBadge : inactiveBadge}>
                    {banner.active ? "Идэвхтэй" : "Идэвхгүй"}
                  </span>
                </div>

                <div style={actions}>
                  <button
                    onClick={() => toggleStatus(banner.id)}
                    style={statusButton}
                  >
                    {banner.active ? "OFF" : "ON"}
                  </button>

                  <button
                    onClick={() => handleDelete(banner.id)}
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
  padding: 13,
  background: "#0b0b0b",
  border: "1px solid #333",
  color: "#fff",
  boxSizing: "border-box",
  fontSize: 14,
};

const imagePreviewBox = {
  marginTop: 18,
  border: "1px solid #222",
  padding: 14,
  background: "#080808",
};

const previewImage = {
  width: "100%",
  maxHeight: 220,
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

const addButton = {
  width: "100%",
  marginTop: 20,
  padding: 14,
  background: "#d71919",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const listHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 18,
};

const emptyBox = {
  color: "#777",
  border: "1px solid #222",
  padding: 20,
  marginTop: 18,
};

const bannerCard = {
  display: "flex",
  gap: 16,
  padding: 15,
  border: "1px solid #222",
  marginBottom: 15,
  background: "#080808",
};

const thumb = {
  width: 160,
  height: 80,
  objectFit: "contain",
  background: "#000",
  border: "1px solid #222",
};

const bannerInfo = {
  flex: 1,
};

const bannerTitle = {
  margin: "0 0 8px",
  fontSize: 18,
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
