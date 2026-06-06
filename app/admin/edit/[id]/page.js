"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function EditPage({ params }) {
  const [article, setArticle] = useState(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    if (!params?.id) return;

    const loadArticle = async () => {
      try {
        const res = await fetch(`/api/news/${params.id}`);
        const data = await res.json();

        console.log(data);

        if (data.success) {
          const news = data.article;

          setArticle({
            id: news.id,
            title: news.title,
            seoTitle: news.seo_title,
            excerpt: news.summary,
            content: news.content,
            author: news.author,
            image: news.image,
            tags: news.tags,
            status: news.status,
            featured: news.is_featured === 1,
            wide: news.is_wide === 1,
            category: news.category_id,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadArticle();
  }, [params]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setArticle({
      ...article,
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

    if (file.size > 800 * 1024) {
      alert("Зургийн хэмжээ 800KB-аас бага байх шаардлагатай.");
      return;
    }

    setImageName(file.name);

    const reader = new FileReader();

    reader.onloadend = () => {
      setArticle({
        ...article,
        image: reader.result,
        imageName: file.name,
        updatedAt: new Date().toISOString(),
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!article.title?.trim()) {
      alert("Нийтлэлийн гарчиг оруулна уу.");
      return;
    }

    if (!article.category) {
      alert("Ангилал сонгоно уу.");
      return;
    }

    if (!article.content?.trim()) {
      alert("Нийтлэлийн агуулга оруулна уу.");
      return;
    }

    try {
      const res = await fetch(`/api/news/${article.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      alert("Нийтлэл амжилттай шинэчлэгдлээ");

      window.location.href = "/admin";
    } catch (error) {
      console.error(error);

      alert("Хадгалах үед алдаа гарлаа");
    }
  };

  if (!article) {
    return (
      <main style={page}>
        <section style={container}>
          <p style={{ color: "#aaa" }}>Уншиж байна...</p>

          <Link href="/admin" style={backLink}>
            ← Хяналтын самбар руу буцах
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main style={page}>
      <section style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <div style={topHeader}>
          <div>
            <h1 style={title}>Нийтлэл засах</h1>
            <p style={desc}>Anzaar.mn редакцийн CMS нийтлэл засварлах хэсэг</p>
          </div>

          <button type="submit" form="edit-post-form" style={topButton}>
            Хадгалах
          </button>
        </div>

        <form id="edit-post-form" onSubmit={handleSave} style={layout}>
          <section style={mainColumn}>
            <div style={card}>
              <label style={label}>Нийтлэлийн гарчиг</label>
              <input
                name="title"
                value={article.title || ""}
                onChange={handleChange}
                placeholder="Нийтлэлийн гарчиг"
                style={inputStyle}
                required
              />

              <label style={label}>SEO гарчиг</label>
              <input
                name="seoTitle"
                value={article.seoTitle || ""}
                onChange={handleChange}
                placeholder="Хоосон үлдээвэл үндсэн гарчиг ашиглагдана"
                style={inputStyle}
              />

              <label style={label}>Богино тайлбар</label>
              <textarea
                name="excerpt"
                value={article.excerpt || ""}
                onChange={handleChange}
                rows="4"
                placeholder="Homepage болон article detail дээр харагдах богино тайлбар..."
                style={textareaSmall}
              />

              <label style={label}>Нийтлэлийн агуулга</label>
              <textarea
                name="content"
                value={article.content || ""}
                onChange={handleChange}
                rows="18"
                placeholder="Нийтлэлийн үндсэн агуулга..."
                style={textareaStyle}
                required
              />
            </div>

            <div style={previewBox}>
              <p style={previewLabel}>Live Preview</p>

              {article.image && (
                <img
                  src={article.image}
                  alt="preview"
                  style={previewImage}
                />
              )}

              <p style={previewCategory}>
                {getLabel(article.category) || "Ангилал"}
              </p>

              <h2 style={previewTitle}>
                {article.title || "Нийтлэлийн гарчиг энд харагдана"}
              </h2>

              <p style={previewExcerpt}>
                {article.excerpt ||
                  "Богино тайлбар энд харагдана. Энэ хэсэг homepage болон article page дээр ашиглагдана."}
              </p>

              <div style={previewMeta}>
                <span>{article.author || "Anzaar.mn редакц"}</span>
                <span>•</span>
                <span>{article.date || "Огноо"}</span>
                <span>•</span>
                <span>
                  {article.status === "draft" ? "Ноорог" : "Нийтлэгдсэн"}
                </span>
              </div>

              {article.featured && (
                <p style={featuredPreview}>★ Өнөөдрийн онцлох мэдээ</p>
              )}

              {article.wide && (
                <p style={widePreview}>▰ Wide мэдээ</p>
              )}

              <p style={previewContent}>
                {article.content || "Нийтлэлийн эхний агуулга энд харагдана."}
              </p>
            </div>
          </section>

          <aside style={sideColumn}>
            <div style={card}>
              <h3 style={sideTitle}>Нийтлэлийн тохиргоо</h3>

              <label style={label}>Ангилал</label>
              <select
                name="category"
                value={article.category || ""}
                onChange={handleChange}
                style={inputStyle}
                required
              >
                <option value="">Ангилал сонгох</option>
                <option value="1">Нийгэм</option>
                <option value="2">Эдийн засаг</option>
                <option value="3">Эрх зүй</option>
                <option value="4">Эрүүл мэнд</option>
                <option value="5">Боловсрол</option>
                <option value="6">Сэтгэл зүй</option>
                <option value="7">Спорт</option>
                <option value="8">Соёл</option>
              </select>

              <label style={label}>Төлөв</label>
              <select
                name="status"
                value={article.status || "published"}
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
                  checked={article.featured || false}
                  onChange={handleChange}
                  style={checkboxInput}
                />
                <span>Онцлох мэдээ болгох</span>
              </label>

              <label style={checkboxBox}>
                <input
                  type="checkbox"
                  name="wide"
                  checked={article.wide || false}
                  onChange={handleChange}
                  style={checkboxInput}
                />
                <span>Wide мэдээ болгох</span>
              </label>

              <label style={label}>Author</label>
              <input
                name="author"
                value={article.author || "Anzaar.mn редакц"}
                onChange={handleChange}
                placeholder="Anzaar.mn редакц"
                style={inputStyle}
              />

              <label style={label}>Tags</label>
              <input
                name="tags"
                value={
                  Array.isArray(article.tags)
                    ? article.tags.join(", ")
                    : article.tags || ""
                }
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
                <p style={hint}>Шинэ файл: {imageName}</p>
              )}

              {article.imageName && !imageName && (
                <p style={hint}>Одоогийн файл: {article.imageName}</p>
              )}

              {article.image && (
                <img
                  src={article.image}
                  alt="cover preview"
                  style={sideImage}
                />
              )}

              <p style={hint}>
                Зургийн хэмжээ 800KB-аас бага байвал browser localStorage-д найдвартай хадгалагдана.
              </p>
            </div>

            <button type="submit" form="edit-post-form" style={buttonStyle}>
              Хадгалах
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

const widePreview = {
  color: "#38bdf8",
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
