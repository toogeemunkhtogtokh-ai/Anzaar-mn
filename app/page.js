"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { articles } from "../lib/articles";

export default function Home() {
  const [allArticles, setAllArticles] = useState(articles);

  const [banners, setBanners] = useState([]);
 useEffect(() => {
  const savedArticles =
    JSON.parse(localStorage.getItem("anzaarArticles")) || [];

  setAllArticles([...savedArticles, ...articles]);

  const savedBanners =
    JSON.parse(localStorage.getItem("anzaarBanners")) || [];

  setBanners(savedBanners);
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
    "Соёл"
  ];

  const heroArticle =
  allArticles.find((article) => article.featured === true) || allArticles[0];

  const topBanner =
  banners.find(
    (b) => b.position === "top" && b.active
  );

const inlineBanner =
  banners.find(
    (b) => b.position === "inline" && b.active
  );

const sidebarBanner =
  banners.find(
    (b) => b.position === "sidebar" && b.active
  );

  const previous = [
    ["Нийгэм", "Агаарын бохирдол буурахгүй байгаагийн 5 шалтгаан", "2026.06.14"],
    ["Эдийн засаг", "Монголын хөрөнгийн зах зээл: 2026 оны тойм", "2026.06.14"],
    ["Боловсрол", "Сурагчдын унших чадвар яагаад буурч байна вэ?", "2026.06.13"],
    ["Соёл", "Соёл урлаг нийгмийн сэтгэл зүйд хэрхэн нөлөөлдөг вэ?", "2026.06.13"],
    ["Эрх зүй", "Шүүхийн шинэчлэл: Иргэдэд үзүүлэх нөлөө", "2026.06.12"],
    ["Спорт", "Монголын спортын шинэ үе", "2026.06.11"]
  ];

  const cardStyle = {
    border: "1px solid rgba(255,255,255,.1)",
    background: "linear-gradient(180deg,#111,#050505)",
    padding: 22
  };

  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "'Times New Roman', serif"
      }}
    >
      <header
  style={{
    borderBottom: "1px solid rgba(255,255,255,.1)",
    padding: "22px 0"
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
      gap: 30
    }}
  >
          <div>
            <Image
              src="/anzaar-logo-horizontal.png"
              alt="Anzaar.mn Logo"
              width={360}
              height={95}
              style={{
                width: "360px",
                height: "auto",
                objectFit: "contain"
              }}
            />
          </div>

          <nav
            style={{
              display: "flex",
              gap: 24,
              fontSize: 14,
              fontFamily: "Arial",
              textTransform: "uppercase",
              whiteSpace: "nowrap"
            }}
          >
            {nav.map((item, i) => {
              const href =
                item === "Нүүр" ? "/" :
                item === "Нийгэм" ? "/category/niigem" :
                item === "Эдийн засаг" ? "/category/ediinzasag" :
                item === "Эрх зүй" ? "/category/erhzui" :
                item === "Эрүүл мэнд" ? "/category/eruulmend" :
                item === "Боловсрол" ? "/category/bolovsrol" :
                item === "Сэтгэл зүй" ? "/category/setgelzui" :
                item === "Спорт" ? "/category/sport" :
                "/category/soyol";

              return (
                <Link
                  key={item}
                  href={href}
                  style={{
                    textDecoration: "none",
                    color: i === 0 ? "#fff" : "#aaa",
                    borderBottom: i === 0 ? "2px solid #e11212" : "none",
                    paddingBottom: 8
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
          padding: "42px 24px"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 28
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 20
              }}
            >
              <span
                style={{
                  width: 34,
                  height: 2,
                  background: "#e11212",
                  display: "block"
                }}
              />
              <h1
                style={{
                  fontSize: 42,
                  margin: 0
                }}
              >
                Өнөөдрийн онцлох
              </h1>
            </div>

            <Link
              href={`/article/${heroArticle?.id || ""}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  ...cardStyle,
                  minHeight: 560,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  backgroundImage: `url(${heroArticle?.image || "/hero-main.png"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "rgba(0,0,0,0.55)",
                  backgroundBlendMode: "multiply",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    color: "#e11212",
                    fontSize: 13,
                    fontFamily: "Arial",
                    fontWeight: 700,
                    textTransform: "uppercase"
                  }}
                >
                  {heroArticle?.label || "Нийгэм"}
                </div>

                <h2
                  style={{
                    fontSize: 52,
                    lineHeight: 1.05,
                    maxWidth: 720,
                    margin: "14px 0"
                  }}
                >
                  {heroArticle?.title || "Харагдаж байгаа бүхэн үнэн биш"}
                </h2>

                <p
                  style={{
                    fontSize: 20,
                    color: "#ccc",
                    maxWidth: 650,
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {heroArticle?.excerpt ||
                    "Нийгмийн мэдээллийн орчин бидний бодлыг хэрхэн чиглүүлж байна вэ?"}
                </p>

                <div
                  style={{
                    marginTop: 22,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#999",
                    fontSize: 14,
                    fontFamily: "Arial"
                  }}
                >
                  <span>{heroArticle?.date || "2026.06.18"}</span>
                  <span style={{ color: "#fff" }}>Унших →</span>
                </div>
              </article>
            </Link>
          </div>

         <aside
  style={{
    ...cardStyle,
    minHeight: 560,
    padding: 0,
    overflow: "hidden"
  }}
>
  {sidebarBanner ? (
    <a
      href={sidebarBanner.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "block",
        width: "100%",
        height: "100%"
      }}
    >
      <img
        src={sidebarBanner.image}
        alt={sidebarBanner.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block"
        }}
      />
    </a>
  ) : (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}
    >
      Энд таны сурталчилгаа байрлана
    </div>
  )}
</aside>
        </div>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 22,
            marginTop: 28
          }}
        >
          {allArticles.slice(1, 4).map((item) => (
            <Link
              key={item.id}
              href={`/article/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <article
                style={{
                  ...cardStyle,
                  minHeight: 360,
                  display: "flex",
                  flexDirection: "column",
                  transition: "all .35s ease",
                  cursor: "pointer"
                }}
              >
                <div
                  style={{
                    height: 190,
                    marginBottom: 24,
                    border: "1px solid rgba(255,255,255,.08)",
                    backgroundImage: `url(${item.image || "/hero-main.png"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                />

                <div
                  style={{
                    color: "#e11212",
                    fontSize: 12,
                    fontFamily: "Arial",
                    fontWeight: 700,
                    textTransform: "uppercase"
                  }}
                >
                  {item.label}
                </div>

                <h3
                  style={{
                    fontSize: 26,
                    lineHeight: 1.28,
                    minHeight: 120,
                    marginTop: 18,
                    marginBottom: 28
                  }}
                >
                  {item.title}
                </h3>

                <small
                  style={{
                    color: "#777",
                    fontFamily: "Arial",
                    marginTop: "auto",
                    display: "block"
                  }}
                >
                  {item.date}
                </small>
              </article>
            </Link>
          ))}
        </section>

       <section
  style={{
    marginTop: 32,
    ...cardStyle,
    minHeight: 130,
    padding: 0,
    overflow: "hidden"
  }}
>
  {inlineBanner ? (
    <a
      href={inlineBanner.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={inlineBanner.image}
        alt={inlineBanner.title}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          display: "block"
        }}
      />
    </a>
  ) : (
    <div
      style={{
        minHeight: 130,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      Энд таны сурталчилгаа байрлана
    </div>
  )}
</section>
          <div>
            <div
              style={{
                color: "#fff",
                fontSize: 22,
                fontFamily: "Arial",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2
              }}
            >
              Энд таны сурталчилгаа байрлана
            </div>
            <div
              style={{
                marginTop: 10,
                color: "#777",
                fontFamily: "Arial",
                fontSize: 13
              }}
            >
              Inline banner · 1200 × 150
            </div>
          </div>
        </section>

              <section style={{ marginTop: 50 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24
            }}
          >
            <span
              style={{
                width: 34,
                height: 2,
                background: "#e11212",
                display: "block"
              }}
            />
            <h2
              style={{
                fontSize: 34,
                margin: 0
              }}
            >
              Өмнөх мэдээнүүд
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 40px"
            }}
          >
            {previous.map(([cat, title, date]) => (
              <Link
                key={title}
                href="/article"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article
                  style={{
                    display: "grid",
                    gridTemplateColumns: "92px 1fr",
                    gap: 16,
                    padding: "18px 0",
                    borderBottom: "1px solid rgba(255,255,255,.08)"
                  }}
                >
                  <div
                    style={{
                      height: 70,
                      background: "radial-gradient(circle,#444,#090909)",
                      border: "1px solid rgba(255,255,255,.08)"
                    }}
                  />
                  <div>
                    <div
                      style={{
                        color: "#e11212",
                        fontSize: 12,
                        fontFamily: "Arial",
                        fontWeight: 700,
                        textTransform: "uppercase"
                      }}
                    >
                      {cat}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        fontSize: 17,
                        lineHeight: 1.35
                      }}
                    >
                      {title}
                    </div>
                    <small
                      style={{
                        display: "block",
                        marginTop: 8,
                        color: "#777",
                        fontFamily: "Arial"
                      }}
                    >
                      {date}
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
            padding: "28px 0"
          }}
        >
          <div
            style={{
              color: "#aaa",
              fontSize: 13,
              fontFamily: "Arial",
              textTransform: "uppercase",
              marginBottom: 18
            }}
          >
            Хамтрагч байгууллагууд
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 14
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  border: "1px solid rgba(255,255,255,.1)",
                  padding: "24px 12px",
                  textAlign: "center",
                  color: "#777",
                  fontSize: 12,
                  fontFamily: "Arial",
                  textTransform: "uppercase"
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
          fontSize: 13
        }}
      >
        © 2026 Anzaar.mn. Бүх эрх хуулиар хамгаалагдсан.
      </footer>
    </main>
  );
}
