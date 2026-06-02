"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function EditPage({ params }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    const found = saved.find(
      (item) => item.id === Number(params.id)
    );

    setArticle(found);
  }, [params.id]);

  const handleSave = () => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    const updated = saved.map((item) => {
      if (item.id === article.id) {
        return article;
      }

      if (article.featured) {
        return {
          ...item,
          featured: false,
        };
      }

      return item;
    });

    localStorage.setItem(
      "anzaarArticles",
      JSON.stringify(updated)
    );

    alert("Нийтлэл амжилттай шинэчлэгдлээ");
    window.location.href = "/admin";
  };

  if (!article) {
    return (
      <main style={page}>
        <p>Уншиж байна...</p>
      </main>
    );
  }

  return (
    <main style={page}>
      <section style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <h1 style={title}>Нийтлэл засах</h1>

        <input
          value={article.title || ""}
          onChange={(e) =>
            setArticle({ ...article, title: e.target.value })
          }
          placeholder="Нийтлэлийн гарчиг"
          style={input}
        />

        <label style={checkboxBox}>
          <input
            type="checkbox"
            checked={article.featured || false}
            onChange={(e) =>
              setArticle({
                ...article,
                featured: e.target.checked,
              })
            }
            style={checkboxInput}
          />
          <span>Онцлох мэдээ болгох</span>
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onloadend = () => {
              setArticle({
                ...article,
                image: reader.result,
              });
            };

            reader.readAsDataURL(file);
          }}
          style={input}
        />

        {article.image && (
          <div style={previewBox}>
            <p style={previewLabel}>Preview</p>
            <img
              src={article.image}
              alt="preview"
              style={{
                width: "100%",
                maxHeight: "320px",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <textarea
          value={article.content || ""}
          onChange={(e) =>
            setArticle({ ...article, content: e.target.value })
          }
          placeholder="Нийтлэлийн агуулга"
          style={textarea}
        />

        <button onClick={handleSave} style={button}>
          Хадгалах
        </button>
      </section>
    </main>
  );
}

const page = {
  minHeight: "100vh",
  background: "#050505",
  color: "#fff",
  padding: "60px",
  fontFamily: "Arial, sans-serif",
};

const container = {
  maxWidth: "1000px",
  margin: "0 auto",
};

const backLink = {
  color: "#aaa",
  textDecoration: "none",
  display: "inline-block",
  marginBottom: "30px",
  fontSize: "18px",
};

const title = {
  fontSize: "48px",
  marginBottom: "30px",
};

const input = {
  width: "100%",
  padding: "18px",
  marginBottom: "22px",
  background: "#111",
  border: "1px solid #222",
  color: "#fff",
  fontSize: "18px",
};

const checkboxBox = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "#111",
  border: "1px solid #222",
  padding: "18px",
  marginBottom: "22px",
  color: "#fff",
  fontSize: "18px",
};

const checkboxInput = {
  width: "18px",
  height: "18px",
};

const previewBox = {
  border: "1px solid #222",
  background: "#0d0d0d",
  padding: "28px",
  marginBottom: "22px",
};

const previewLabel = {
  color: "#777",
  textTransform: "uppercase",
  fontSize: "12px",
  letterSpacing: "1px",
};

const textarea = {
  width: "100%",
  height: "320px",
  padding: "18px",
  marginBottom: "22px",
  background: "#111",
  border: "1px solid #222",
  color: "#fff",
  fontSize: "18px",
};

const button = {
  background: "#e11",
  color: "#fff",
  border: "none",
  padding: "16px 28px",
  cursor: "pointer",
  fontSize: "18px",
};
