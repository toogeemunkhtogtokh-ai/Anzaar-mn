"use client";

import Link from "next/link";
import { useState } from "react";

export default function NewPostPage() {
  const [form, setForm] = useState({
    title: "",
    seoTitle: "",
    excerpt: "",
    category: "",
    image: "",
    content: "",
    tags: "",
    author: "Anzaar.mn редакц",
    status: "published",
    featured: false,
  });

  const [imageName, setImageName] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Зөвхөн зураг файл оруулна уу.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Зургийн хэмжээ 2MB-аас бага байх шаардлагатай.");
      return;
    }

    setImageName(file.name);

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 80);
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.title.trim()) {
    alert("Нийтлэлийн гарчиг оруулна уу.");
    return;
  }

  if (!form.category) {
    alert("Ангилал сонгоно уу.");
    return;
  }

  if (!form.content.trim()) {
    alert("Нийтлэлийн агуулга оруулна уу.");
    return;
  }

  const existing =
    JSON.parse(localStorage.getItem("anzaarArticles")) || [];
    const newArticle = {
      id: Date.now(),
      slug: generateSlug(form.title),
      title: form.title,
      seoTitle: form.seoTitle || form.title,
      excerpt: form.excerpt,
      category: form.category,
      label: getLabel(form.category),
      date: new Date().toISOString().slice(0, 10).replaceAll("-", "."),
      image: form.image || "/feature-1.png",
      imageName,
      content: form.content,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      author: form.author || "Anzaar.mn редакц",
      status: form.status,
      featured: form.featured,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedArticles = form.featured
      ? existing.map((article) => ({
          ...article,
          featured: false,
        }))
      : existing;

    localStorage.setItem(
      "anzaarArticles",
      JSON.stringify([newArticle, ...updatedArticles])
    );

    alert("Нийтлэл амжилттай хадгалагдлаа");
    window.location.href = "/admin";
  };

  return (
    <main style={page}>
      <section style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <div style={topHeader}>
          <div>
            <h1 style={title}>Шинэ нийтлэл нэмэх</h1>
            <p style={desc}>Anzaar.mn редакцийн CMS нийтлэл үүсгэх хэсэг</p>
          </div>

          <button type="submit" form="new-post-form" style={topButton}>
            Нийтлэх
          </button>
        </div>

        <form id="new-post-form" onSubmit={handleSubmit} style={layout}>
          <section style={mainColumn}>
            <div style={card}>
              <label style={label}>Нийтлэлийн гарчиг</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Жишээ: Эдийн засгийн өөрчлөлт иргэдэд хэрхэн нөлөөлөх вэ?"
                style={inputStyle}
                required
              />

              <label style={label}>SEO гарчиг</label>
              <input
                name="seoTitle"
                value={form.seoTitle}
                onChange={handleChange}
                placeholder="Хоосон үлдээвэл үндсэн гарчиг ашиглагдана"
                style={inputStyle}
              />

              <label style={label}>Богино тайлбар</label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows="4"
                placeholder="Homepage болон article detail дээр харагдах богино тайлбар..."
                style={textareaSmall}
              />

              <label style={label}>Нийтлэлийн агуулга</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows="18"
                placeholder="Нийтлэлийн үндсэн агуулга..."
                style={textareaStyle}
                required
              />
            </div>

            <div style={previewBox}>
              <p style={previewLabel}>Live Preview</p>

              {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  style={previewImage}
                />
              )}

              <p style={previewCategory}>
                {getLabel(form.category) || "Ангилал"}
              </p>

              <h2 style={previewTitle}>
                {form.title || "Нийтлэлийн гарчиг энд харагдана"}
              </h2>

              <p style={previewExcerpt}>
                {form.excerpt ||
                  "Богино тайлбар энд харагдана. Энэ хэсэг homepage болон article page дээр ашиглагдана."}
              </p>

              <div style={previewMeta}>
                <span>{form.author || "Anzaar.mn редакц"}</span>
                <span>•</span>
                <span>{new Date().toISOString().slice(0, 10).replaceAll("-", ".")}</span>
                <span>•</span>
                <span>{form.status === "published" ? "Нийтлэгдсэн" : "Ноорог"}</span>
              </div>

              {form.featured && (
                <p style={featuredPreview}>★ Онцлох мэдээ</p>
              )}

              <p style={previewContent}>
                {form.content || "Нийтлэлийн эхний агуулга энд харагдана."}
              </p>
            </div>
          </section>

          <aside style={sideColumn}>
            <div style={card}>
              <h3 style={sideTitle}>Нийтлэлийн тохиргоо</h3>

              <label style={label}>Ангилал</label>
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

              <label style={label}>Төлөв</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="published">Нийтлэх</option>
                <option value="draft">Ноорог</option>
              </select>

              <label style={checkboxBox}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  style={checkboxInput}
                />
                <span>Онцлох мэдээ болгох</span>
              </label>

              <label style={label}>Author</label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Anzaar.mn редакц"
                style={inputStyle}
              />

              <label style={label}>Tags</label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="нийгэм, эдийн засаг, бодлого"
                style={inputStyle}
              />

              <p style={hint}>
                Tags-ийг таслалаар тусгаарлаж бичнэ.
              </p>
            </div>

            <div style={card}>
              <h3 style={sideTitle}>Cover image</h3>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={inputStyle}
              />

              {imageName && (
                <p style={hint}>Файл: {imageName}</p>
              )}

              {form.image && (
                <img
                  src={form.image}
                  alt="cover preview"
                  style={sideImage}
                />
              )}

              <p style={hint}>
                Зургийн хэмжээ 2MB-аас бага байвал browser localStorage-д найдвартай хадгалагдана.
              </p>
            </div>

            <button type="submit" form="new-post-form" style={buttonStyle}>
              Нийтлэх
            </button>
          </aside>
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
  maxWidth: "1280px",
  margin: "0 auto",
};

const backLink = {
  color: "#aaa",
  textDecoration: "none",
  display: "inline-block",
  marginBottom: "30px",
  fontSize: "16px",
};

const topHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "24px",
  marginBottom: "34px",
};

const title = {
  fontSize: "48px",
  margin: "0 0 12px",
};

const desc = {
  color: "#888",
  margin: 0,
};

const layout = {
  display: "grid",
  gridTemplateColumns: "1fr 360px",
  gap: "28px",
};

const mainColumn = {
  display: "grid",
  gap: "24px",
};

const sideColumn = {
  display: "grid",
  gap: "22px",
  alignSelf: "start",
};

const card = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: "24px",
};

const label = {
  display: "block",
  color: "#aaa",
  fontSize: "13px",
  textTransform: "uppercase",
  marginBottom: "10px",
  marginTop: "18px",
};

const inputStyle = {
  width: "100%",
  padding: "16px",
  background: "#0b0b0b",
  border: "1px solid #222",
  color: "#fff",
  fontSize: "16px",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "360px",
  lineHeight: 1.7,
};

const textareaSmall = {
  ...inputStyle,
  minHeight: "110px",
  lineHeight: 1.6,
};

const checkboxBox = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "#0b0b0b",
  border: "1px solid #222",
  padding: "16px",
  color: "#fff",
  fontSize: "16px",
  marginTop: "18px",
};

const checkboxInput = {
  width: "18px",
  height: "18px",
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
  marginBottom: "18px",
};

const previewImage = {
  width: "100%",
  maxHeight: "360px",
  objectFit: "cover",
  marginBottom: "22px",
};

const previewCategory = {
  color: "#e11212",
  fontWeight: 700,
  textTransform: "uppercase",
};

const previewTitle = {
  fontSize: 36,
  lineHeight: 1.15,
  margin: "10px 0",
};

const previewExcerpt = {
  color: "#bbb",
  fontSize: "18px",
  lineHeight: 1.6,
};

const previewMeta = {
  display: "flex",
  gap: "10px",
  color: "#777",
  fontSize: "13px",
  margin: "16px 0",
};

const featuredPreview = {
  color: "#facc15",
  fontWeight: 700,
};

const previewContent = {
  color: "#999",
  lineHeight: 1.7,
  whiteSpace: "pre-line",
};

const sideTitle = {
  margin: 0,
  fontSize: "20px",
};

const sideImage = {
  width: "100%",
  maxHeight: "220px",
  objectFit: "cover",
  marginTop: "18px",
};

const hint = {
  color: "#777",
  fontSize: "13px",
  lineHeight: 1.5,
};

const topButton = {
  background: "#d71919",
  color: "#fff",
  border: "none",
  padding: "14px 22px",
  fontSize: "16px",
  cursor: "pointer",
};

const buttonStyle = {
  background: "#d71919",
  color: "#fff",
  border: "none",
  padding: "18px",
  fontSize: "18px",
  cursor: "pointer",
};
