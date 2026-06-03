"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { articles } from "../../../lib/articles";

export default function DynamicArticle({ params }) {
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("anzaarArticles")) || [];
    const allArticles = [...saved, ...articles];

    const found = allArticles.find(
      (item) => String(item.id) === String(params.id)
    );

    setArticle(found || null);

    if (found) {
  const sameCategory = allArticles
    .filter(
      (item) =>
        item.category === found.category &&
        String(item.id) !== String(found.id)
    )
    .slice(0, 3);

  const latestArticles = allArticles
    .filter((item) => String(item.id) !== String(found.id))
    .slice(0, 3);

  setRelatedArticles(
    sameCategory.length > 0 ? sameCategory : latestArticles
  );
}

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [params.id]);

  const nav = [
    "Нүүр",
    "Нийгэм",
    "Эдийн засаг",
    "Эрх зүй",
    "Эрүүл мэнд",
    "Боловсрол",
    "Сэтгэл зүй",
    "Спорт",
    "Соёл",
  ];

  const getHref = (item) =>
    item === "Нүүр"
      ? "/"
      : item === "Нийгэм"
      ? "/category/niigem"
      : item === "Эдийн засаг"
      ? "/category/ediinzasag"
      : item === "Эрх зүй"
      ? "/category/erhzui"
      : item === "Эрүүл мэнд"
      ? "/category/eruulmend"
      : item === "Боловсрол"
      ? "/category/bolovsrol"
      : item === "Сэтгэл зүй"
      ? "/category/setgelzui"
      : item === "Спорт"
      ? "/category/sport"
      : "/category/soyol";

  if (!article) {
    return (
      <main
        style={{
          background: "#000",
          color: "#fff",
          minHeight: "100vh",
          padding: 40,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Нийтлэл олдсонгүй</h1>

        <Link
          href="/"
          style={{
            color: "#aaa",
            textDecoration: "none",
            fontSize: 15,
          }}
        >
          ← Нүүр хуудас руу буцах
        </Link>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        fontFamily: "'Times New Roman', serif",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,.1)",
          padding: "18px 0 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: isMobile ? "0 16px" : "0 24px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 18 : 30,
          }}
        >
          <div
            style={{
              width: isMobile ? "100%" : "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link href="/" style={{ display: "block" }}>
              <Image
                src="/anzaar-logo-horizontal.png"
                alt="Anzaar.mn Logo"
                width={260}
                height={69}
                style={{
                  width: isMobile ? "180px" : "240px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </Link>

            {isMobile && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  width: 42,
                  height: 42,
                  border: "1px solid rgba(255,255,255,.15)",
                  background: "#0f0f0f",
                  color: "#fff",
                  fontSize: 22,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {menuOpen ? "×" : "☰"}
              </button>
            )}
          </div>

          <nav
            style={{
              display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 14 : 22,
              fontSize: 13,
              fontFamily: "Arial",
              textTransform: "uppercase",
              whiteSpace: isMobile ? "normal" : "nowrap",
              width: isMobile ? "100%" : "auto",
              paddingTop: isMobile ? 10 : 0,
              paddingBottom: isMobile ? 8 : 0,
              borderTop: isMobile
                ? "1px solid rgba(255,255,255,.08)"
                : "none",
            }}
          >
            {nav.map((item, i) => (
              <Link
                key={item}
                href={getHref(item)}
                style={{
                  textDecoration: "none",
                  color: i === 0 ? "#fff" : "#aaa",
                  borderBottom: i === 0 ? "2px solid #e11212" : "none",
                  paddingBottom: 8,
                }}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <section
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: isMobile ? "34px 18px 60px" : "58px 24px 90px",
          boxSizing: "border-box",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#aaa",
            textDecoration: "none",
            fontFamily: "Arial",
            fontSize: isMobile ? 13 : 14,
          }}
        >
          ← Нүүр хуудас
        </Link>

        <div
          style={{
            marginTop: isMobile ? 28 : 42,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center",
            color: "#999",
            fontFamily: "Arial",
            fontSize: isMobile ? 12 : 13,
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              color: "#e11212",
              fontWeight: 700,
            }}
          >
            {article.label || "Нийгэм"}
          </span>
          <span style={{ color: "#444" }}>•</span>
          <span>{article.date || "2026.06.18"}</span>
          <span style={{ color: "#444" }}>•</span>
          <span>Anzaar.mn</span>
        </div>

        <h1
          style={{
            fontSize: isMobile ? 31 : 64,
            lineHeight: 1.05,
            margin: isMobile ? "18px 0 16px" : "24px 0 20px",
            maxWidth: 900,
          }}
        >
          {article.title}
        </h1>

        <p
          style={{
            maxWidth: 760,
            fontSize: isMobile ? 17 : 23,
            lineHeight: 1.6,
            color: "#bbb",
            margin: isMobile ? "0 0 28px" : "0 0 42px",
          }}
        >
          {article.excerpt ||
            "Нийгмийн мэдээллийн орчин бидний бодлыг хэрхэн чиглүүлж байна вэ?"}
        </p>

        <div
  style={{
    maxWidth: isMobile ? "100%" : 680,
    margin: "0 auto",
    background: "#080808",
    overflow: "hidden",
  }}
>
  <img
    src={article.image || "/hero-main.png"}
    alt={article.title}
    style={{
      width: "100%",
      maxHeight: isMobile ? 300 : 420,
      objectFit: "cover",
      display: "block",
    }}
  />
</div>

        <div
  style={{
    maxWidth: isMobile ? "100%" : 680,
    margin: isMobile ? "34px auto 0" : "48px auto 0",
  }}
>
  
          <article
  style={{
    maxWidth: "100%",
  }}
>
            {(article.content || "")
              .split("\n")
              .filter((paragraph) => paragraph.trim() !== "")
              .map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    fontSize: isMobile ? 17 : 22,
                    lineHeight: isMobile ? 1.75 : 1.85,
                    color: "#ddd",
                    margin: "0 0 28px",
                  }}
                >
                  {paragraph}
                </p>
              ))}
          </article>
        </div>

        {relatedArticles.length > 0 && (
          <section
            style={{
              marginTop: isMobile ? 54 : 80,
              borderTop: "1px solid rgba(255,255,255,.1)",
              paddingTop: isMobile ? 30 : 42,
            }}
          >
            <div
  style={{
    display: "inline-block",
    marginBottom: 28,
  }}
>
  <h2
    style={{
      fontSize: isMobile ? 22 : 28,
      margin: 0,
      lineHeight: 1.15,
    }}
  >
    Холбоотой нийтлэлүүд
  </h2>

  <div
    style={{
      width: "100%",
      height: 2,
      background: "#e11212",
      marginTop: 10,
    }}
  />
</div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
                gap: isMobile ? 18 : 22,
              }}
            >
              {relatedArticles.map((item) => (
                <Link
                  key={item.id}
                  href={`/article/${item.id}`}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,.1)",
                    background: "linear-gradient(180deg,#111,#050505)",
                    padding: isMobile ? 14 : 18,
                  }}
                >
                  <div
                    style={{
                      height: isMobile ? 140 : 150,
                      backgroundImage: `url(${item.image || "/hero-main.png"})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      marginBottom: 16,
                    }}
                  />

                  <div
                    style={{
                      color: "#e11212",
                      fontFamily: "Arial",
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {item.label}
                  </div>

                  <h3
                    style={{
                      fontSize: isMobile ? 22 : 23,
                      lineHeight: 1.25,
                      margin: "10px 0",
                    }}
                  >
                    {item.title}
                  </h3>

                  <small
                    style={{
                      color: "#777",
                      fontFamily: "Arial",
                    }}
                  >
                    {item.date}
                  </small>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>

      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,.1)",
          padding: isMobile ? "28px 24px" : "34px 48px",
          color: "#666",
          fontFamily: "Arial",
          fontSize: 13,
          textAlign: isMobile ? "center" : "left",
        }}
      >
        © 2026 Anzaar.mn. Бүх эрх хуулиар хамгаалагдсан.
      </footer>
    </main>
  );
}
