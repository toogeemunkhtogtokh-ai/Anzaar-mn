"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { articles } from "../../../lib/articles";

export default function DynamicArticle({ params }) {
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    const allArticles = [...saved, ...articles];

    const found = allArticles.find(
      (item) => String(item.id) === String(params.id)
    );

    setArticle(found || null);

    if (found) {
      const related = allArticles
        .filter(
          (item) =>
            item.category === found.category &&
            String(item.id) !== String(found.id)
        )
        .slice(0, 3);

      setRelatedArticles(related);
    }
  }, [params.id]);

  if (!article) {
    return (
      <main style={notFoundPage}>
        <div>
          <h1>Нийтлэл олдсонгүй</h1>
          <Link href="/" style={backLink}>
            ← Нүүр хуудас руу буцах
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={page}>
      <header style={header}>
        <Link href="/" style={logoLink}>
          Anzaar.mn
        </Link>

        <Link href="/" style={homeLink}>
          Нүүр хуудас
        </Link>
      </header>

      <section style={container}>
        <Link href="/" style={backLink}>
          ← Нүүр хуудас
        </Link>

        <div style={metaRow}>
          <span style={categoryLabel}>{article.label}</span>
          <span style={dot}>•</span>
          <span>{article.date}</span>
          <span style={dot}>•</span>
          <span>Anzaar.mn редакц</span>
        </div>

        <h1 style={title}>{article.title}</h1>

        <p style={excerpt}>
          {article.excerpt ||
            "Нийгмийн мэдээллийн орчин бидний бодлыг хэрхэн чиглүүлж байна вэ?"}
        </p>

        <div style={coverWrap}>
          <img
            src={article.image || "/hero-main.png"}
            alt={article.title}
            style={coverImage}
          />
        </div>

        <div style={contentGrid}>
          <aside style={shareBox}>
            <div style={shareTitle}>Хуваалцах</div>
            <button style={shareButton}>Facebook</button>
            <button style={shareButton}>X</button>
            <button style={shareButton}>Copy link</button>
          </aside>

          <article style={articleBody}>
            {article.content
              .split("\n")
              .filter((paragraph) => paragraph.trim() !== "")
              .map((paragraph, index) => (
                <p key={index} style={paragraphStyle}>
                  {paragraph}
                </p>
              ))}
          </article>
        </div>

        {relatedArticles.length > 0 && (
          <section style={relatedSection}>
            <div style={sectionHead}>
              <span style={redLine}></span>
              <h2 style={relatedTitle}>Холбоотой нийтлэлүүд</h2>
            </div>

            <div style={relatedGrid}>
              {relatedArticles.map((item) => (
                <Link
                  key={item.id}
                  href={`/article/${item.id}`}
                  style={relatedCard}
                >
                  <div
                    style={{
                      ...relatedImage,
                      backgroundImage: `url(${item.image || "/hero-main.png"})`,
                    }}
                  />
                  <div style={categoryLabel}>{item.label}</div>
                  <h3 style={relatedCardTitle}>{item.title}</h3>
                  <small style={relatedDate}>{item.date}</small>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

const page = {
  background: "#000",
  color: "#fff",
  minHeight: "100vh",
  fontFamily: "Times New Roman, serif",
};

const notFoundPage = {
  background: "#000",
  color: "#fff",
  minHeight: "100vh",
  padding: 40,
  fontFamily: "Arial, sans-serif",
};

const header = {
  height: "92px",
  padding: "0 64px",
  borderBottom: "1px solid rgba(255,255,255,.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontFamily: "Arial, sans-serif",
};

const logoLink = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "28px",
  fontWeight: 700,
};

const homeLink = {
  color: "#aaa",
  textDecoration: "none",
  fontSize: "15px",
};

const container = {
  maxWidth: "1120px",
  margin: "0 auto",
  padding: "64px 24px 90px",
};

const backLink = {
  color: "#999",
  textDecoration: "none",
  fontFamily: "Arial, sans-serif",
  fontSize: "15px",
};

const metaRow = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  color: "#999",
  fontFamily: "Arial, sans-serif",
  fontSize: "14px",
  marginTop: "36px",
  textTransform: "uppercase",
};

const categoryLabel = {
  color: "#e11212",
  fontFamily: "Arial, sans-serif",
  fontWeight: 700,
  textTransform: "uppercase",
};

const dot = {
  color: "#444",
};

const title = {
  fontSize: "68px",
  lineHeight: 1.05,
  maxWidth: "920px",
  margin: "24px 0 20px",
};

const excerpt = {
  maxWidth: "820px",
  fontSize: "24px",
  lineHeight: 1.6,
  color: "#bbb",
  margin: "0 0 42px",
};

const coverWrap = {
  border: "1px solid rgba(255,255,255,.12)",
  background: "#080808",
};

const coverImage = {
  width: "100%",
  maxHeight: "560px",
  objectFit: "cover",
  display: "block",
};

const contentGrid = {
  display: "grid",
  gridTemplateColumns: "180px 1fr",
  gap: "48px",
  marginTop: "56px",
};

const shareBox = {
  position: "sticky",
  top: "24px",
  alignSelf: "start",
  border: "1px solid rgba(255,255,255,.1)",
  background: "#080808",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const shareTitle = {
  color: "#777",
  fontSize: "13px",
  textTransform: "uppercase",
  marginBottom: "14px",
};

const shareButton = {
  width: "100%",
  display: "block",
  background: "#111",
  color: "#fff",
  border: "1px solid rgba(255,255,255,.12)",
  padding: "12px",
  marginBottom: "10px",
  cursor: "pointer",
  textAlign: "left",
};

const articleBody = {
  maxWidth: "760px",
};

const paragraphStyle = {
  fontSize: "23px",
  lineHeight: 1.85,
  color: "#ddd",
  margin: "0 0 28px",
};

const relatedSection = {
  marginTop: "80px",
  borderTop: "1px solid rgba(255,255,255,.1)",
  paddingTop: "42px",
};

const sectionHead = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "28px",
};

const redLine = {
  width: "34px",
  height: "2px",
  background: "#e11212",
  display: "block",
};

const relatedTitle = {
  fontSize: "34px",
  margin: 0,
};

const relatedGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "22px",
};

const relatedCard = {
  color: "#fff",
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,.1)",
  background: "linear-gradient(180deg,#111,#050505)",
  padding: "20px",
};

const relatedImage = {
  height: "150px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  marginBottom: "18px",
  border: "1px solid rgba(255,255,255,.08)",
};

const relatedCardTitle = {
  fontSize: "24px",
  lineHeight: 1.25,
  minHeight: "90px",
};

const relatedDate = {
  color: "#777",
  fontFamily: "Arial, sans-serif",
};
