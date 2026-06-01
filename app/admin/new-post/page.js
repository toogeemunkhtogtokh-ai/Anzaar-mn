"use client";

import Link from "next/link";
import { useState } from "react";

export default function NewPostPage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newArticle = {
      id: Date.now(),
      category: form.category,
      label: getLabel(form.category),
      title: form.title,
      date: new Date().toISOString().slice(0, 10).replaceAll("-", "."),
      image: form.image || "/feature-1.png",
      content: form.content,
    };

    console.log("Шинэ нийтлэл:", newArticle);
    alert("Нийтлэл түр хадгалагдлаа. Дараагийн алхамд database-тэй холбоно.");
  };

  return (
    <main style={page}>
      <section style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <h1 style={title}>Шинэ нийтлэл нэмэх</h1>
        <p style={desc}>Anzaar.mn редакцийн шинэ нийтлэл</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Нийтлэлийн гарчиг"
            style={inputStyle}
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="">Ангилал сонгох</option>
            <option value="niigem">Нийгэм</option>
            <option value="ediinzasag">Эдийн засаг</option>
            <option value="erhzui">Эрх зүй</option>
            <option value="eruulmend">Эрүүл мэнд</option>
            <option value="bolovsrol">Боловсрол</option>
            <option value="setgelzui">Сэтгэл зүй</option>
            <option value="sport">Спорт</option>
            <option value="soyol">Соёл</option>
          </select>

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Зургийн path жишээ: /feature-1.png"
            style={inputStyle}
          />

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="18"
            placeholder="Нийтлэлийн агуулга..."
            style={inputStyle}
            required
          />

          <div style={previewBox}>
            <p style={previewLabel}>Preview</p>
            <h2 style={{ fontSize: 32, marginBottom: 10 }}>
              {form.title || "Нийтлэлийн гарчиг энд харагдана"}
            </h2>
            <p style={{ color: "#e11212", fontWeight: 700 }}>
              {getLabel(form.category) || "Ангилал"}
            </p>
            <p style={{ color: "#999" }}>
              {form.content || "Нийтлэлийн эхний агуулга энд харагдана."}
            </p>
          </div>

          <button type="submit" style={buttonStyle}>
            Нийтлэх
          </button>
        </form>
      </section>
    </main>
  );
}

function getLabel(category) {
  const labels = {
    niigem: "Нийгэм",
    ediinzasag: "Эдийн засаг",
    erhzui: "Эрх зүй",
    eruulmend: "Эрүүл мэнд",
    bolovsrol: "Боловсрол",
    setgelzui: "Сэтгэл зүй",
    sport: "Спорт",
    soyol: "Соёл",
  };

  return labels[category] || "";
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
  marginBottom: "18px",
};

const desc = {
  color: "#888",
  marginBottom: "40px",
};

const formStyle = {
  display: "grid",
  gap: "22px",
};

const inputStyle = {
  width: "100%",
  padding: "18px",
  background: "#111",
  border: "1px solid #222",
  color: "#fff",
  fontSize: "18px",
};

const previewBox = {
  border: "1px solid #222",
  background: "#0d0d0d",
  padding: "28px",
};

const previewLabel = {
  color: "#777",
  textTransform: "uppercase",
  fontSize: "12px",
  letterSpacing: "1px",
};

const buttonStyle = {
  background: "#d71919",
  color: "#fff",
  border: "none",
  padding: "18px",
  fontSize: "18px",
  cursor: "pointer",
};
