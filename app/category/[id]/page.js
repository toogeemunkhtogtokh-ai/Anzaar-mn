"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { articles } from "../../../lib/articles";

export default function CategoryPage({ params }) {
  const [allArticles, setAllArticles] = useState(articles);
const [visibleCount, setVisibleCount] = useState(1);
const [isMobile, setIsMobile] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedArticles =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    setAllArticles([...savedArticles, ...articles]);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

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

  const names = {
    niigem: "Нийгэм",
    ediinzasag: "Эдийн засаг",
    erhzui: "Эрх зүй",
    eruulmend: "Эрүүл мэнд",
    bolovsrol: "Боловсрол",
    setgelzui: "Сэтгэл зүй",
    sport: "Спорт",
    soyol: "Соёл",
  };

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

  const title = names[params.id] || "Ангилал";

  const filtered = allArticles.filter((item) => item.category === params.id);
  const visibleArticles = filtered.slice(0, visibleCount);
const hasMore = visibleCount < filtered.length;

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
            {nav.map((item) => {
              const href = getHref(item);
              const active =
                item === title || (item === "Нүүр" && params.id === undefined);

              return (
                <Link
                  key={item}
                  href={href}
                  style={{
                    textDecoration: "none",
                    color: active ? "#fff" : "#aaa",
                    borderBottom: active ? "2px solid #e11212" : "none",
                    paddingBottom: 8,
                  }}
                >
                  {item}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <section
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: isMobile ? "36px 16px 64px" : "58px 24px 90px",
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
            marginBottom: isMobile ? 30 : 44,
            borderBottom: "1px solid rgba(255,255,255,.1)",
            paddingBottom: isMobile ? 22 : 28,
          }}
        >
          <div
            style={{
              display: "inline-block",
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? 42 : 56,
                margin: 0,
                lineHeight: 1.05,
              }}
            >
              {title}
            </h1>

            <div
              style={{
                width: "100%",
                height: 2,
                background: "#e11212",
                marginTop: 12,
              }}
            />
          </div>

          <p
            style={{
              color: "#aaa",
              fontFamily: "Arial",
              fontSize: isMobile ? 14 : 16,
              lineHeight: 1.6,
              margin: "18px 0 0",
            }}
          >
            Энэ ангиллын нийт {filtered.length} мэдээ байна.
          </p>
        </div>

       {filtered.length > 0 ? (
  <>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: isMobile ? 18 : 24,
      }}
    >
      {visibleArticles.map((item) => (
        <Link
          key={item.id}
          href={`/article/${item.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "block",
          }}
        >
          <article
            style={{
              background: "linear-gradient(180deg,#111,#050505)",
              border: "1px solid rgba(255,255,255,.1)",
              minHeight: isMobile ? "auto" : 390,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: isMobile ? 170 : 160,
                backgroundImage: `url(${item.image || "/hero-main.png"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />

            <div
              style={{
                padding: isMobile ? 16 : 20,
              }}
            >
              <div
                style={{
                  color: "#e11212",
                  fontFamily: "Arial",
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {item.label || title}
              </div>

              <h2
                style={{
                  fontSize: isMobile ? 23 : 27,
                  lineHeight: 1.25,
                  margin: "12px 0 10px",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.title}
              </h2>

              <p
                style={{
                  color: "#aaa",
                  fontFamily: "Arial",
                  fontSize: isMobile ? 13 : 14,
                  lineHeight: 1.5,
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.excerpt || item.content || ""}
              </p>

              <div
                style={{
                  color: "#777",
                  fontFamily: "Arial",
                  fontSize: 12,
                  marginTop: 18,
                }}
              >
                {item.date}
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>

    {hasMore && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 34,
        }}
      >
        <button
          onClick={() => setVisibleCount((count) => count + 30)}
          style={{
            border: "1px solid rgba(255,255,255,.14)",
            background: "#111",
            color: "#fff",
            padding: "13px 24px",
            cursor: "pointer",
            fontFamily: "Arial",
            fontSize: 13,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Илүү үзэх
        </button>
      </div>
    )}
  </>
) : (
          <div
            style={{
              color: "#777",
              fontFamily: "Arial",
              border: "1px solid rgba(255,255,255,.1)",
              background: "#080808",
              padding: isMobile ? 20 : 28,
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Энэ ангилалд одоогоор мэдээ нэмэгдээгүй байна.
          </div>
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
