"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { articles } from "../lib/articles";

export default function Home() {
  const [allArticles, setAllArticles] = useState(articles);
  const [banners, setBanners] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const savedArticles =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    const savedBanners =
      JSON.parse(localStorage.getItem("anzaarBanners")) || [];

    const savedPartners =
      JSON.parse(localStorage.getItem("anzaarPartners")) || [];

    setAllArticles([...savedArticles, ...articles]);
    setBanners(savedBanners);
    setPartners(savedPartners);
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

  const fallbackArticle = {
    id: "fallback",
    title: "Харагдаж байгаа бүхэн үнэн биш",
    excerpt: "Нийгмийн мэдээллийн орчин бидний бодлыг хэрхэн чиглүүлж байна вэ?",
    label: "Нийгэм",
    date: "2026.06.18",
    image: "/hero-main.png",
  };

  const safeArticles = allArticles.length > 0 ? allArticles : [fallbackArticle];

  const getArticle = (index) => {
    return safeArticles[index % safeArticles.length] || fallbackArticle;
  };

  const heroArticle =
    safeArticles.find((article) => article.featured === true) ||
    safeArticles[0] ||
    fallbackArticle;

  const topBanner =
    banners.find((b) => b.position === "top" && b.active) ||
    banners.find((b) => b.position === "inline" && b.active);

  const inlineBanner = banners.find((b) => b.position === "inline" && b.active);
  const activePartners = partners.filter((partner) => partner.active !== false);

  const previousArticles =
    safeArticles.length >= 6
      ? safeArticles.slice(0, 8)
      : [
          ...safeArticles,
          ...safeArticles,
          ...safeArticles,
          ...safeArticles,
        ].slice(0, 8);

  const cardStyle = {
    border: "1px solid rgba(255,255,255,.1)",
    background: "linear-gradient(180deg,#111,#050505)",
  };

  const renderBanner = (
    banner,
    fallbackText,
    fallbackSize,
    imageHeight = "100%"
  ) => {
    if (banner) {
      return (
        <a
          href={banner.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={banner.image}
            alt={banner.title}
            style={{
              width: "100%",
              height: imageHeight,
              objectFit: "cover",
              display: "block",
            }}
          />
        </a>
      );
    }

    return (
      <div
        style={{
          height: "100%",
          minHeight: imageHeight === "90px" ? 76 : 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "#666",
          padding: 18,
        }}
      >
        <div>
          <div
            style={{
              color: "#fff",
              fontSize: 18,
              fontFamily: "Arial",
              fontWeight: 700,
              textTransform: "uppercase",
              lineHeight: 1.5,
            }}
          >
            {fallbackText}
          </div>

          <div
            style={{
              marginTop: 8,
              color: "#d0d0d0",
              fontFamily: "Arial",
              fontSize: 12,
            }}
          >
            {fallbackSize}
          </div>
        </div>
      </div>
    );
  };

  const MiniVisualCard = ({ item, height = 190 }) => {
    return (
      <Link
        href={`/article/${item?.id || ""}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
        }}
      >
        <article
          style={{
            ...cardStyle,
            height,
            padding: 0,
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${item?.image || "/hero-main.png"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "rgba(0,0,0,0.4)",
              backgroundBlendMode: "multiply",
            }}
          />
        </article>
      </Link>
    );
  };

  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
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
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 30,
          }}
        >
          <Link href="/" style={{ display: "block" }}>
            <Image
              src="/anzaar-logo-horizontal.png"
              alt="Anzaar.mn Logo"
              width={260}
              height={69}
              style={{
                width: "240px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Link>

          <nav
            style={{
              display: "flex",
              gap: 22,
              fontSize: 13,
              fontFamily: "Arial",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {nav.map((item, i) => {
              const href =
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

              return (
                <Link
                  key={item}
                  href={href}
                  style={{
                    textDecoration: "none",
                    color: i === 0 ? "#fff" : "#aaa",
                    borderBottom: i === 0 ? "2px solid #e11212" : "none",
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
          maxWidth: 1240,
          margin: "0 auto",
          padding: "28px 24px 42px",
        }}
      >
        <div
          style={{
            width: "760px",
            maxWidth: "100%",
            height: 76,
            margin: "0 0 34px auto",
            ...cardStyle,
            padding: 0,
            overflow: "hidden",
          }}
        >
          {renderBanner(
            topBanner,
            "Энд таны сурталчилгаа байрлана",
            "Top banner · 760 × 90",
            "90px"
          )}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "200px 1fr 200px",
            gap: 32,
            alignItems: "stretch",
          }}
        >
          <aside
            style={{
              display: "grid",
              gridTemplateRows: "repeat(3, 1fr)",
              gap: 28,
            }}
          >
            <MiniVisualCard item={getArticle(1)} height={190} />
            <MiniVisualCard item={getArticle(2)} height={190} />
            <MiniVisualCard item={getArticle(3)} height={190} />
          </aside>

          <section
            style={{
              display: "grid",
              gridTemplateRows: "190px 1fr",
              gap: 28,
            }}
          >
            <Link
              href={`/article/${getArticle(4)?.id || ""}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <article
                style={{
                  ...cardStyle,
                  height: 190,
                  padding: 0,
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundImage: `url(${getArticle(4)?.image || "/hero-main.png"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "rgba(0,0,0,0.45)",
                  backgroundBlendMode: "multiply",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <div style={{ padding: 22 }}>
                  <div
                    style={{
                      color: "#e11212",
                      fontSize: 12,
                      fontFamily: "Arial",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {getArticle(4)?.label || "Нийгэм"}
                  </div>

                  <h3
                    style={{
                      fontSize: 28,
                      lineHeight: 1.2,
                      margin: "8px 0 0",
                    }}
                  >
                    {getArticle(4)?.title || "Онцлох мэдээ"}
                  </h3>
                </div>
              </article>
            </Link>

            <Link
              href={`/article/${heroArticle?.id || ""}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <article
                style={{
                  ...cardStyle,
                  height: 420,
                  padding: 22,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  backgroundImage: `url(${heroArticle?.image || "/hero-main.png"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "rgba(0,0,0,0.58)",
                  backgroundBlendMode: "multiply",
                  cursor: "pointer",
                }}
              >
                <div style={{ marginBottom: 18 }}>
                  <h1
                    style={{
                      fontSize: 28,
                      margin: 0,
                      color: "#fff",
                    }}
                  >
                    Өнөөдрийн онцлох
                  </h1>

                  <div
                    style={{
                      width: 150,
                      height: 2,
                      background: "#e11212",
                      marginTop: 12,
                    }}
                  />
                </div>

                <div
                  style={{
                    color: "#e11212",
                    fontSize: 13,
                    fontFamily: "Arial",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {heroArticle?.label || "Нийгэм"}
                </div>

                <h2
                  style={{
                    fontSize: 44,
                    lineHeight: 1.05,
                    maxWidth: 760,
                    margin: "14px 0 10px",
                  }}
                >
                  {heroArticle?.title || "Харагдаж байгаа бүхэн үнэн биш"}
                </h2>

                <p
                  style={{
                    fontSize: 17,
                    color: "#ccc",
                    maxWidth: 680,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {heroArticle?.excerpt ||
                    "Нийгмийн мэдээллийн орчин бидний бодлыг хэрхэн чиглүүлж байна вэ?"}
                </p>

                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#999",
                    fontSize: 14,
                    fontFamily: "Arial",
                  }}
                >
                  <span>{heroArticle?.date || "2026.06.18"}</span>
                  <span style={{ color: "#fff" }}>Унших →</span>
                </div>
              </article>
            </Link>
          </section>

          <aside
            style={{
              display: "grid",
              gridTemplateRows: "repeat(3, 1fr)",
              gap: 28,
            }}
          >
            <MiniVisualCard item={getArticle(5)} height={190} />
            <MiniVisualCard item={getArticle(6)} height={190} />
            <MiniVisualCard item={getArticle(7)} height={190} />
          </aside>
        </div>

        <section
          style={{
            marginTop: 34,
            ...cardStyle,
            height: 96,
            padding: 0,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,.12)",
          }}
        >
          {renderBanner(
            inlineBanner,
            "Энд таны сурталчилгаа байрлана",
            "Full width banner · 1200 × 120",
            "120px"
          )}
        </section>

        <section style={{ marginTop: 36 }}>
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              gap: 9,
              marginBottom: 28,
            }}
          >
            <h2
              style={{
                fontSize: 20,
                margin: 0,
                fontFamily: "Arial",
                textTransform: "uppercase",
                letterSpacing: ".02em",
              }}
            >
              Өмнөх мэдээнүүд
            </h2>

            <span
              style={{
                width: 120,
                height: 2,
                background: "#e11212",
                display: "block",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "28px 52px",
            }}
          >
            {previousArticles.map((item, index) => (
              <Link
                key={`${item.id}-${index}`}
                href={`/article/${item.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <article
                  style={{
                    display: "grid",
                    gridTemplateColumns: "190px 1fr",
                    gap: 22,
                    alignItems: "center",
                    minHeight: 110,
                  }}
                >
                  <div
                    style={{
                      height: 110,
                      backgroundImage: `url(${item.image || "/hero-main.png"})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "rgba(255,255,255,.35)",
                      backgroundBlendMode: "multiply",
                      border: "1px solid rgba(255,255,255,.08)",
                    }}
                  />

                  <div>
                    <div
                      style={{
                        color: "#e11212",
                        fontSize: 12,
                        fontFamily: "Arial",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label || "Нийгэм"}
                    </div>

                    <h3
                      style={{
                        margin: "8px 0 8px",
                        fontSize: 19,
                        lineHeight: 1.35,
                      }}
                    >
                      {item.title}
                    </h3>

                    <small
                      style={{
                        color: "#777",
                        fontFamily: "Arial",
                        fontSize: 12,
                      }}
                    >
                      {item.date || "2026.06.18"}
                    </small>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: 52,
            borderTop: "1px solid rgba(255,255,255,.1)",
            borderBottom: "1px solid rgba(255,255,255,.1)",
            padding: "28px 0",
          }}
        >
          <div
            style={{
              color: "#aaa",
              fontSize: 13,
              fontFamily: "Arial",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Хамтрагч байгууллагууд
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 14,
            }}
          >
            {activePartners.length > 0
              ? activePartners.slice(0, 8).map((partner) => (
                  <a
                    key={partner.id}
                    href={partner.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      border: "1px solid rgba(255,255,255,.1)",
                      padding: "18px 12px",
                      minHeight: 90,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      textDecoration: "none",
                      color: "#fff",
                      background: "rgba(255,255,255,.02)",
                    }}
                  >
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        style={{
                          maxWidth: "100%",
                          maxHeight: 56,
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          color: "#777",
                          fontSize: 12,
                          fontFamily: "Arial",
                          textTransform: "uppercase",
                        }}
                      >
                        {partner.name}
                      </span>
                    )}
                  </a>
                ))
              : [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      border: "1px solid rgba(255,255,255,.1)",
                      padding: "24px 12px",
                      textAlign: "center",
                      color: "#777",
                      fontSize: 12,
                      fontFamily: "Arial",
                      textTransform: "uppercase",
                    }}
                  >
                    Энд хамтрагч байгууллагын нэр байрлана
                  </div>
                ))}
          </div>
        </section>
      </section>

      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,.1)",
          padding: "34px 48px",
          color: "#666",
          fontFamily: "Arial",
          fontSize: 13,
        }}
      >
        © 2026 Anzaar.mn. Бүх эрх хуулиар хамгаалагдсан.
      </footer>
    </main>
  );
}
