"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const defaultSettings = {
  siteName: "Anzaar.mn",
  slogan: "Өнөөдрийг анзаарч маргаашийг бүтээе.",
  copyright: "© 2026 Anzaar.mn. Бүх эрх хуулиар хамгаалагдсан.",
  facebook: "",
  email: "",
  phone: "",
  seoTitle: "Anzaar.mn — Өнөөдрийг анзаарч маргаашийг бүтээе",
  seoDescription:
    "Anzaar.mn бол нийгэм, эдийн засаг, эрх зүй, эрүүл мэнд, боловсрол, сэтгэл зүй, спорт, соёлын чиглэлээр мэдээ, нийтлэл хүргэх платформ юм.",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [savedAt, setSavedAt] = useState("");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarSettings")) || null;

    if (saved) {
      setSettings({
        ...defaultSettings,
        ...saved,
      });
    } else {
      localStorage.setItem(
        "anzaarSettings",
        JSON.stringify(defaultSettings)
      );

      setSettings(defaultSettings);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (!settings.siteName.trim()) {
      alert("Сайтын нэр оруулна уу.");
      return;
    }

    if (!settings.slogan.trim()) {
      alert("Slogan оруулна уу.");
      return;
    }

    const updated = {
      ...settings,
      siteName: settings.siteName.trim(),
      slogan: settings.slogan.trim(),
      copyright: settings.copyright.trim(),
      facebook: settings.facebook.trim(),
      email: settings.email.trim(),
      phone: settings.phone.trim(),
      seoTitle: settings.seoTitle.trim(),
      seoDescription: settings.seoDescription.trim(),
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("anzaarSettings", JSON.stringify(updated));
      setSettings(updated);
      setSavedAt(new Date().toLocaleString());
      alert("Тохиргоо амжилттай хадгалагдлаа.");
    } catch (error) {
      console.error("Settings save error:", error);
      alert("Тохиргоо хадгалахад алдаа гарлаа.");
    }
  };

  const resetSettings = () => {
    const confirmed = confirm(
      "Тохиргоог үндсэн төлөв рүү буцаах уу?"
    );

    if (!confirmed) return;

    localStorage.setItem(
      "anzaarSettings",
      JSON.stringify(defaultSettings)
    );

    setSettings(defaultSettings);
    setSavedAt(new Date().toLocaleString());

    alert("Үндсэн тохиргоо сэргээгдлээ.");
  };

  return (
    <main style={page}>
      <div style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <div style={topHeader}>
          <div>
            <h1 style={titleStyle}>Сайтын тохиргоо</h1>
            <p style={desc}>
              Anzaar.mn сайтын үндсэн нэр, slogan, footer болон холбоо барих
              мэдээллийг удирдана.
            </p>
          </div>

          <button onClick={resetSettings} style={resetButton}>
            Үндсэн төлөв сэргээх
          </button>
        </div>

        <div style={layout}>
          <section style={formBox}>
            <h2 style={boxTitle}>Үндсэн мэдээлэл</h2>

            <label style={label}>Сайтын нэр</label>
            <input
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              placeholder="Anzaar.mn"
              style={input}
            />

            <label style={label}>Slogan</label>
            <input
              name="slogan"
              value={settings.slogan}
              onChange={handleChange}
              placeholder="Өнөөдрийг анзаарч маргаашийг бүтээе."
              style={input}
            />

            <label style={label}>Copyright text</label>
            <input
              name="copyright"
              value={settings.copyright}
              onChange={handleChange}
              placeholder="© 2026 Anzaar.mn..."
              style={input}
            />

            <h2 style={{ ...boxTitle, marginTop: 34 }}>
              Холбоо барих мэдээлэл
            </h2>

            <label style={label}>Facebook link</label>
            <input
              name="facebook"
              value={settings.facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              style={input}
            />

            <label style={label}>Email</label>
            <input
              name="email"
              value={settings.email}
              onChange={handleChange}
              placeholder="info@anzaar.mn"
              style={input}
            />

            <label style={label}>Phone</label>
            <input
              name="phone"
              value={settings.phone}
              onChange={handleChange}
              placeholder="+976 ..."
              style={input}
            />

            <h2 style={{ ...boxTitle, marginTop: 34 }}>
              SEO үндсэн тохиргоо
            </h2>

            <label style={label}>Default SEO title</label>
            <input
              name="seoTitle"
              value={settings.seoTitle}
              onChange={handleChange}
              placeholder="Anzaar.mn — ..."
              style={input}
            />

            <label style={label}>Default SEO description</label>
            <textarea
              name="seoDescription"
              value={settings.seoDescription}
              onChange={handleChange}
              placeholder="Сайтын үндсэн SEO тайлбар..."
              style={textarea}
            />

            <button onClick={handleSave} style={saveButton}>
              Тохиргоо хадгалах
            </button>

            {savedAt && (
              <p style={hint}>Сүүлд хадгалсан: {savedAt}</p>
            )}
          </section>

          <aside style={previewBox}>
            <h2 style={boxTitle}>Live preview</h2>

            <div style={previewCard}>
              <p style={previewLabel}>Сайтын нэр</p>
              <h3 style={previewSiteName}>
                {settings.siteName || "Anzaar.mn"}
              </h3>

              <p style={previewLabel}>Slogan</p>
              <p style={previewText}>
                {settings.slogan ||
                  "Өнөөдрийг анзаарч маргаашийг бүтээе."}
              </p>

              <p style={previewLabel}>Footer</p>
              <p style={previewText}>
                {settings.copyright ||
                  "© 2026 Anzaar.mn. Бүх эрх хуулиар хамгаалагдсан."}
              </p>

              <p style={previewLabel}>Холбоо барих</p>
              <div style={contactList}>
                {settings.facebook && (
                  <span>Facebook: {settings.facebook}</span>
                )}

                {settings.email && (
                  <span>Email: {settings.email}</span>
                )}

                {settings.phone && (
                  <span>Phone: {settings.phone}</span>
                )}

                {!settings.facebook &&
                  !settings.email &&
                  !settings.phone && (
                    <span style={{ color: "#666" }}>
                      Холбоо барих мэдээлэл оруулаагүй байна.
                    </span>
                  )}
              </div>
            </div>

            <div style={previewCard}>
              <p style={previewLabel}>SEO title</p>
              <h3 style={seoTitle}>
                {settings.seoTitle || "SEO title"}
              </h3>

              <p style={previewLabel}>SEO description</p>
              <p style={previewText}>
                {settings.seoDescription || "SEO description"}
              </p>
            </div>

            <p style={hint}>
              Энэ тохиргоо одоогоор localStorage дээр хадгалагдана. Дараагийн
              алхамд homepage footer, public pages, category/article footer-тэй
              холбож өгнө.
            </p>
          </aside>
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

const topHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 24,
  marginBottom: 28,
};

const titleStyle = {
  fontSize: 48,
  margin: "0 0 12px",
};

const desc = {
  color: "#888",
  margin: 0,
  maxWidth: 720,
  lineHeight: 1.6,
};

const resetButton = {
  background: "#222",
  color: "#fff",
  border: "1px solid #444",
  padding: "12px 18px",
  cursor: "pointer",
};

const layout = {
  display: "grid",
  gridTemplateColumns: "1fr 420px",
  gap: 30,
};

const formBox = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: 24,
};

const previewBox = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: 24,
  alignSelf: "start",
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

const textarea = {
  ...input,
  minHeight: 130,
  lineHeight: 1.7,
};

const saveButton = {
  width: "100%",
  marginTop: 24,
  padding: 15,
  background: "#d71919",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const hint = {
  color: "#777",
  fontSize: 13,
  lineHeight: 1.5,
  marginTop: 16,
};

const previewCard = {
  marginTop: 18,
  border: "1px solid #222",
  background: "#080808",
  padding: 18,
};

const previewLabel = {
  color: "#777",
  fontSize: 12,
  textTransform: "uppercase",
  marginBottom: 6,
  marginTop: 16,
};

const previewSiteName = {
  margin: "0 0 12px",
  fontSize: 28,
  fontFamily: "'Times New Roman', serif",
};

const previewText = {
  color: "#aaa",
  lineHeight: 1.6,
  margin: "0 0 12px",
};

const contactList = {
  display: "grid",
  gap: 8,
  color: "#aaa",
  fontSize: 13,
};

const seoTitle = {
  margin: "0 0 12px",
  fontSize: 18,
};
