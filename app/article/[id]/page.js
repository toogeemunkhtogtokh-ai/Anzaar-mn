"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { articles } from "../../../lib/articles";

export default function DynamicArticle({ params }) {
  const [article, setArticle] = useState(null);
const [relatedArticles, setRelatedArticles] = useState([]);
const [latestArticles, setLatestArticles] = useState([]);
const [comments, setComments] = useState([]);
const [commentName, setCommentName] = useState("");
const [commentText, setCommentText] = useState("");
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

  const latest = allArticles
    .filter((item) => String(item.id) !== String(found.id))
    .slice(0, 4);

  setRelatedArticles(sameCategory.length > 0 ? sameCategory : latest.slice(0, 3));
  setLatestArticles(latest);
      const savedComments =
  JSON.parse(localStorage.getItem(`anzaarComments-${params.id}`)) || [];

setComments(savedComments);
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
const shareArticle = (platform) => {
  const url = window.location.href;
  const text = article?.title || "Anzaar.mn";

  if (platform === "facebook") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (platform === "x") {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (platform === "copy") {
    navigator.clipboard.writeText(url);
    alert("Линк хууллаа");
  }
};
const addComment = () => {
  if (!commentText.trim()) return;

  const newComment = {
    id: Date.now(),
    name: commentName.trim() || "Зочин",
    text: commentText.trim(),
    date: new Date().toLocaleDateString("mn-MN"),
  };

  const updatedComments = [newComment, ...comments];

  setComments(updatedComments);
  localStorage.setItem(
    `anzaarComments-${params.id}`,
    JSON.stringify(updatedComments)
  );

  setCommentName("");
  setCommentText("");
};
  
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
    margin: isMobile ? "0 auto" : "0 auto",
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
    width: "100%",
    maxWidth: isMobile ? "100%" : 1040,
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
      maxHeight: isMobile ? 300 : 520,
      objectFit: "cover",
      display: "block",
    }}
  />
</div>

        <div
  style={{
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "680px 280px",
    gap: isMobile ? 34 : 48,
    alignItems: "start",
    marginTop: isMobile ? 34 : 48,
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
                
                <aside
  style={{
    display: isMobile ? "none" : "block",
    borderLeft: "1px solid rgba(255,255,255,.08)",
    paddingLeft: 26,
  }}
>
  <div
    style={{
      marginBottom: 22,
    }}
  >
    <h3
      style={{
        fontSize: 22,
        margin: 0,
        lineHeight: 1.2,
      }}
    >
      Сүүлд нэмэгдсэн
    </h3>

    <div
      style={{
        width: 90,
        height: 2,
        background: "#e11212",
        marginTop: 10,
      }}
    />
  </div>

  <div
    style={{
      display: "grid",
      gap: 18,
    }}
  >
    {latestArticles.slice(0, 4).map((item) => (
      <Link
        key={item.id}
        href={`/article/${item.id}`}
        style={{
          display: "grid",
          gridTemplateColumns: "86px 1fr",
          gap: 12,
          color: "#fff",
          textDecoration: "none",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          paddingBottom: 14,
        }}
      >
        <div
          style={{
            height: 62,
            backgroundImage: `url(${item.image || "/hero-main.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div>
          <div
            style={{
              color: "#e11212",
              fontFamily: "Arial",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 5,
            }}
          >
            {item.label || "Нийгэм"}
          </div>

          <div
            style={{
              fontSize: 15,
              lineHeight: 1.25,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.title}
          </div>

          <small
            style={{
              display: "block",
              marginTop: 5,
              color: "#777",
              fontFamily: "Arial",
              fontSize: 11,
            }}
          >
            {item.date}
          </small>
        </div>
      </Link>
    ))}
  </div>

  <div
    style={{
      marginTop: 26,
      height: 220,
      border: "1px solid rgba(255,255,255,.1)",
      background: "linear-gradient(180deg,#111,#050505)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: 18,
      color: "#777",
      fontFamily: "Arial",
      fontSize: 12,
      textTransform: "uppercase",
      lineHeight: 1.5,
    }}
  >
    Энд таны сурталчилгаа байрлана
  </div>
</aside>
        </div>
<div
  style={{
    marginTop: 26,
    borderTop: "1px solid rgba(255,255,255,.08)",
    paddingTop: 22,
  }}
>
 
  <div
  style={{
    display: "flex",
    gap: 10,
    alignItems: "center",
  }}
>
  <button
    onClick={() => shareArticle("facebook")}
    title="Facebook дээр хуваалцах"
    style={{
      width: 38,
      height: 38,
      border: "1px solid rgba(255,255,255,.16)",
      background: "#111",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial",
      fontSize: 18,
      fontWeight: 700,
    }}
  >
    f
  </button>

  <button
    onClick={() => shareArticle("x")}
    title="X дээр хуваалцах"
    style={{
      width: 38,
      height: 38,
      border: "1px solid rgba(255,255,255,.16)",
      background: "#111",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial",
      fontSize: 16,
      fontWeight: 700,
    }}
  >
    X
  </button>

  <button
    onClick={() => shareArticle("copy")}
    title="Линк хуулах"
    style={{
      width: 38,
      height: 38,
      border: "1px solid rgba(255,255,255,.16)",
      background: "#111",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10.9 5.03"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11a5 5 0 0 0-7.07 0L4.81 13.12a5 5 0 0 0 7.07 7.07l1.22-1.22"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
</div>
</div>
<section
  style={{
    marginTop: 48,
    borderTop: "1px solid rgba(255,255,255,.1)",
    paddingTop: 32,
  }}
>
  <div
    style={{
      display: "inline-block",
      marginBottom: 22,
    }}
  >
    <h2
      style={{
        fontSize: isMobile ? 24 : 30,
        margin: 0,
        lineHeight: 1.15,
      }}
    >
      Сэтгэгдэл
    </h2>

    <div
      style={{
        width: "100%",
        height: 2,
        background: "#e11212",
        marginTop: 9,
      }}
    />
  </div>

  <div
    style={{
      display: "grid",
      gap: 12,
      marginBottom: 28,
    }}
  >
    <input
      type="text"
      value={commentName}
      onChange={(e) => setCommentName(e.target.value)}
      placeholder="Таны нэр"
      style={{
        width: "100%",
        boxSizing: "border-box",
        border: "1px solid rgba(255,255,255,.12)",
        background: "#0f0f0f",
        color: "#fff",
        padding: "12px 14px",
        fontFamily: "Arial",
        fontSize: 14,
        outline: "none",
      }}
    />

    <textarea
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
      placeholder="Сэтгэгдлээ бичнэ үү..."
      rows={4}
      style={{
        width: "100%",
        boxSizing: "border-box",
        border: "1px solid rgba(255,255,255,.12)",
        background: "#0f0f0f",
        color: "#fff",
        padding: "12px 14px",
        fontFamily: "Arial",
        fontSize: 14,
        lineHeight: 1.5,
        outline: "none",
        resize: "vertical",
      }}
    />

    <button
      onClick={addComment}
      style={{
        justifySelf: "start",
        border: "none",
        background: "#e11212",
        color: "#fff",
        padding: "11px 18px",
        cursor: "pointer",
        fontFamily: "Arial",
        fontSize: 13,
        fontWeight: 700,
        textTransform: "uppercase",
      }}
    >
      Илгээх
    </button>
  </div>

  <div
    style={{
      display: "grid",
      gap: 14,
    }}
>
    {comments.length > 0 ? (
      comments.map((comment) => (
        <div
          key={comment.id}
          style={{
            border: "1px solid rgba(255,255,255,.1)",
            background: "linear-gradient(180deg,#111,#050505)",
            padding: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 14,
              marginBottom: 8,
              fontFamily: "Arial",
            }}
          >
            <strong
              style={{
                color: "#fff",
                fontSize: 13,
              }}
            >
              {comment.name}
            </strong>

            <span
              style={{
                color: "#777",
                fontSize: 12,
              }}
            >
              {comment.date}
            </span>
          </div>

          <p
            style={{
              margin: 0,
              color: "#ccc",
              fontSize: 15,
              lineHeight: 1.6,
              fontFamily: "Arial",
            }}
          >
            {comment.text}
          </p>
        </div>
      ))
    ) : (
      <div
        style={{
          color: "#777",
          fontFamily: "Arial",
          fontSize: 14,
          border: "1px solid rgba(255,255,255,.08)",
          padding: 16,
        }}
      >
        Одоогоор сэтгэгдэл алга.
      </div>
    )}
  </div>
</section>

        {relatedArticles.length > 0 && (
          <section
  style={{
    maxWidth: isMobile ? "100%" : 760,
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
                gap: isMobile ? 14 : 22,
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
    padding: isMobile ? 10 : 18,
    display: isMobile ? "grid" : "block",
    gridTemplateColumns: isMobile ? "120px 1fr" : "none",
    gap: isMobile ? 14 : 0,
    alignItems: isMobile ? "center" : "stretch",
  }}
>
                  <div
  style={{
    height: isMobile ? 86 : 150,
    backgroundImage: `url(${item.image || "/hero-main.png"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: isMobile ? 0 : 16,
  }}
/>

<div>
  <div
    style={{
      color: "#e11212",
      fontFamily: "Arial",
      fontSize: isMobile ? 11 : 12,
      fontWeight: 700,
      textTransform: "uppercase",
    }}
  >
    {item.label}
  </div>

  <h3
    style={{
      fontSize: isMobile ? 18 : 23,
      lineHeight: 1.25,
      margin: isMobile ? "6px 0" : "10px 0",
      display: "-webkit-box",
      WebkitLineClamp: isMobile ? 2 : "unset",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    }}
  >
    {item.title}
  </h3>

  <small
    style={{
      color: "#777",
      fontFamily: "Arial",
      fontSize: isMobile ? 12 : 13,
    }}
  >
    {item.date}
  </small>
</div>
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
