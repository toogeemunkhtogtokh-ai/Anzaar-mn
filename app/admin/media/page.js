"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MediaPage() {
  const [mediaItems, setMediaItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarMedia")) || [];

    setMediaItems(saved);
  }, []);

  const saveMedia = (items) => {
    localStorage.setItem("anzaarMedia", JSON.stringify(items));
    setMediaItems(items);
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Зөвхөн зураг файл оруулна уу.");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} зураг 2MB-аас их байна.`);
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const newImage = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          url: reader.result,
          uploadedAt: new Date().toISOString(),
        };

        const current =
          JSON.parse(localStorage.getItem("anzaarMedia")) || [];

        saveMedia([newImage, ...current]);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (id) => {
    const confirmed = confirm("Энэ зургийг устгах уу?");
    if (!confirmed) return;

    const updated = mediaItems.filter((item) => item.id !== id);
    saveMedia(updated);

    if (selectedImage?.id === id) {
      setSelectedImage(null);
    }
  };

  const copyImage = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Зургийн data амжилттай хууллаа.");
    } catch {
      alert("Хуулахад алдаа гарлаа.");
    }
  };

  const formatSize = (size) => {
    if (!size) return "0 KB";
    return `${Math.round(size / 1024)} KB`;
  };

  return (
    <main style={page}>
      <section style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <div style={header}>
          <div>
            <h1 style={title}>Медиа сан</h1>
            <p style={desc}>
              Нийтлэл, баннер, хамтрагчийн зураг хадгалах хэсэг
            </p>
          </div>

          <label style={uploadButton}>
            + Зураг нэмэх
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <div style={statsGrid}>
          <div style={statCard}>
            <p style={statLabel}>Нийт зураг</p>
            <h2 style={statValue}>{mediaItems.length}</h2>
          </div>

          <div style={statCard}>
            <p style={statLabel}>Storage</p>
            <h2 style={statValue}>LocalStorage</h2>
          </div>
        </div>

        {mediaItems.length === 0 ? (
          <div style={emptyBox}>
            <h2>Одоогоор зураг алга</h2>
            <p style={desc}>
              “Зураг нэмэх” товч дээр дарж медиа сангаа үүсгээрэй.
            </p>
          </div>
        ) : (
          <div style={layout}>
            <section style={gallery}>
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  style={
                    selectedImage?.id === item.id
                      ? selectedCard
                      : imageCard
                  }
                  onClick={() => setSelectedImage(item)}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    style={thumb}
                  />

                  <div style={imageInfo}>
                    <strong style={imageName}>{item.name}</strong>
                    <span style={imageMeta}>
                      {formatSize(item.size)}
                    </span>
                  </div>
                </div>
              ))}
            </section>

            <aside style={sidePanel}>
              {selectedImage ? (
                <>
                  <h3 style={sideTitle}>Зургийн мэдээлэл</h3>

                  <img
                    src={selectedImage.url}
                    alt={selectedImage.name}
                    style={previewImage}
                  />

                  <p style={infoText}>
                    <strong>Нэр:</strong> {selectedImage.name}
                  </p>

                  <p style={infoText}>
                    <strong>Хэмжээ:</strong>{" "}
                    {formatSize(selectedImage.size)}
                  </p>

                  <p style={infoText}>
                    <strong>Төрөл:</strong> {selectedImage.type}
                  </p>

                  <button
                    onClick={() => copyImage(selectedImage.url)}
                    style={secondaryButton}
                  >
                    Copy image data
                  </button>

                  <button
                    onClick={() => handleDelete(selectedImage.id)}
                    style={dangerButton}
                  >
                    Устгах
                  </button>
                </>
              ) : (
                <p style={desc}>
                  Зүүн талаас зураг сонговол мэдээлэл нь энд харагдана.
                </p>
              )}
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

const page = {
  background: "#050505",
  color: "#fff",
  minHeight: "100vh",
  padding: "60px",
  fontFamily: "Arial, sans-serif",
};

const container = {
  maxWidth: "1280px",
  margin: "0 auto",
};

const backLink = {
  color: "#aaa",
  textDecoration: "none",
  display: "inline-block",
  marginBottom: "30px",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "24px",
  marginBottom: "30px",
};

const title = {
  fontSize: "46px",
  margin: "0 0 10px",
};

const desc = {
  color: "#888",
  lineHeight: 1.6,
};

const uploadButton = {
  background: "#d71919",
  color: "#fff",
  padding: "14px 22px",
  cursor: "pointer",
  fontWeight: 700,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "18px",
  marginBottom: "28px",
};

const statCard = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: "22px",
};

const statLabel = {
  color: "#aaa",
  margin: 0,
};

const statValue = {
  margin: "8px 0 0",
};

const emptyBox = {
  border: "1px solid #222",
  background: "#0d0d0d",
  padding: "40px",
};

const layout = {
  display: "grid",
  gridTemplateColumns: "1fr 360px",
  gap: "24px",
};

const gallery = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "18px",
};

const imageCard = {
  background: "#0d0d0d",
  border: "1px solid #222",
  padding: "12px",
  cursor: "pointer",
};

const selectedCard = {
  ...imageCard,
  border: "1px solid #d71919",
};

const thumb = {
  width: "100%",
  height: "140px",
  objectFit: "cover",
  display: "block",
};

const imageInfo = {
  marginTop: "10px",
};

const imageName = {
  display: "block",
  fontSize: "13px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const imageMeta = {
  display: "block",
  color: "#777",
  marginTop: "6px",
  fontSize: "12px",
};

const sidePanel = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: "22px",
  alignSelf: "start",
};

const sideTitle = {
  marginTop: 0,
};

const previewImage = {
  width: "100%",
  maxHeight: "260px",
  objectFit: "cover",
  marginBottom: "18px",
};

const infoText = {
  color: "#bbb",
  fontSize: "14px",
  lineHeight: 1.6,
};

const secondaryButton = {
  width: "100%",
  background: "#222",
  color: "#fff",
  border: "1px solid #444",
  padding: "12px",
  cursor: "pointer",
  marginTop: "12px",
};

const dangerButton = {
  width: "100%",
  background: "#7f1d1d",
  color: "#fff",
  border: "1px solid #991b1b",
  padding: "12px",
  cursor: "pointer",
  marginTop: "12px",
};
