"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { articles } from "../lib/articles";

export default function Home() {
  const [allArticles, setAllArticles] = useState(articles);
const [banners, setBanners] = useState([]);
const [partners, setPartners] = useState([]);
const [searchQuery, setSearchQuery] = useState("");
const [isMobile, setIsMobile] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
  const [siteCategories, setSiteCategories] = useState([]);
  const [sitePages, setSitePages] = useState([]);
  const [settings, setSettings] = useState({
  siteName: "Anzaar.mn",
  slogan: "Өнөөдрийг анзаарч маргаашийг бүтээе.",
  copyright: "© 2026 Anzaar.mn. Бүх эрх хуулиар хамгаалагдсан.",
  facebook: "",
  email: "",
  phone: "",
});

  useEffect(() => {
  const savedArticles =
    JSON.parse(localStorage.getItem("anzaarArticles")) || [];

  const savedBanners =
    JSON.parse(localStorage.getItem("anzaarBanners")) || [];

  const savedPartners =
    JSON.parse(localStorage.getItem("anzaarPartners")) || [];

    const savedPages =
  JSON.parse(localStorage.getItem("anzaarPages")) || [];

    const savedSettings =
  JSON.parse(localStorage.getItem("anzaarSettings")) || null;

    const savedCategories =
  JSON.parse(localStorage.getItem("anzaarCategories")) || [];

  setAllArticles([...savedArticles, ...articles]);
  setBanners(savedBanners);
  setPartners(savedPartners);
    setSitePages(savedPages);
    setSiteCategories(savedCategories);
    
    if (savedSettings) {
  setSettings((prev) => ({
    ...prev,
    ...savedSettings,
  }));
}

  const checkMobile = () => {
  setIsMobile(window.innerWidth <= 1024);
};

  checkMobile();
  window.addEventListener("resize", checkMobile);

  return () => {
    window.removeEventListener("resize", checkMobile);
  };
}, []);

  const defaultNavCategories = [
  { name: "Нийгэм", slug: "niigem" },
  { name: "Эдийн засаг", slug: "ediinzasag" },
  { name: "Эрх зүй", slug: "erhzui" },
  { name: "Эрүүл мэнд", slug: "eruulmend" },
  { name: "Боловсрол", slug: "bolovsrol" },
  { name: "Сэтгэл зүй", slug: "setgelzui" },
  { name: "Спорт", slug: "sport" },
  { name: "Соёл", slug: "soyol" },
];

const navCategories =
  siteCategories.length > 0
    ? siteCategories
        .filter((category) => category.active !== false)
        .filter((category) => category.showInMenu !== false)
        .map((category) => ({
          name: category.name,
          slug: category.slug,
        }))
    : defaultNavCategories;

const nav = [
  {
    name: "Нүүр",
    href: "/",
  },
  ...navCategories.map((category) => ({
    name: category.name,
    href: `/category/${category.slug}`,
  })),
];

  const fallbackArticle = {
    id: "fallback",
    title: "Харагдаж байгаа бүхэн үнэн биш",
    excerpt: "Нийгмийн мэдээллийн орчин бидний бодлыг хэрхэн чиглүүлж байна вэ?",
    label: "Нийгэм",
    date: "2026.06.18",
    image: "/hero-main.png",
  };

  const filteredArticles = allArticles.filter((article) => {
  const query = searchQuery.toLowerCase().trim();

  if (!query) return true;

  return (
    article.title?.toLowerCase().includes(query) ||
    article.label?.toLowerCase().includes(query) ||
    article.category?.toLowerCase().includes(query) ||
    article.content?.toLowerCase().includes(query) ||
    article.excerpt?.toLowerCase().includes(query)
  );
});
  const safeArticles =
  filteredArticles.length > 0 ? filteredArticles : [fallbackArticle];

  const heroArticle =
  safeArticles.find((article) => article.featured === true) ||
  safeArticles[0] ||
  fallbackArticle;

const articlesWithoutHero = safeArticles.filter(
  (article) => String(article.id) !== String(heroArticle.id)
);

const wideArticle =
  articlesWithoutHero.find((article) => article.wide === true) ||
  articlesWithoutHero[3] ||
  articlesWithoutHero[0] ||
  fallbackArticle;

const displayArticles = articlesWithoutHero.filter(
  (article) => String(article.id) !== String(wideArticle.id)
);

const getArticle = (index) => {
  const list = displayArticles.length > 0 ? displayArticles : safeArticles;
  return list[index % list.length] || fallbackArticle;
};

  const topBanner =
    banners.find((b) => b.position === "top" && b.active) ||
    banners.find((b) => b.position === "inline" && b.active);

  const inlineBanner = banners.find((b) => b.position === "inline" && b.active);
  const activePartners = partners.filter((partner) => partner.active !== false);
const activePages = sitePages.filter((page) => page.active !== false);
  
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
    objectFit: "contain",
    objectPosition: "center center",
    display: "block",
    background: "#000",
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
    height,
    padding: 0,
    overflow: "hidden",
    cursor: "pointer",
    position: "relative",
    backgroundImage: `url(${item?.image || "/hero-main.png"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#111",
  }}
>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.82) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 14,
            zIndex: 2,
          }}
        >
          <div
            style={{
              color: "#e11212",
              fontSize: 11,
              fontFamily: "Arial",
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 7,
            }}
          >
            {item?.label || "Нийгэм"}
          </div>

       <h3
  style={{
    margin: 0,
    color: "#fff",
    fontSize: 16,
    lineHeight: 1.25,
    fontWeight: 700,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }}
>
  {item?.title || "Онцлох мэдээ"}
</h3>
  <small
  style={{
    display: "block",
    marginTop: 8,
    color: "#aaa",
    fontSize: 11,
    fontFamily: "Arial",
  }}
>
  {item?.date || "2026.06.18"}
</small>
        </div>
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
    fontSize: isMobile ? 13 : 13,
    fontFamily: "Arial",
    textTransform: "uppercase",
    whiteSpace: isMobile ? "normal" : "nowrap",
    width: isMobile ? "100%" : "auto",
    paddingTop: isMobile ? 10 : 0,
    paddingBottom: isMobile ? 8 : 0,
    borderTop: isMobile ? "1px solid rgba(255,255,255,.08)" : "none",
  }}
>
            {nav.map((item, i) => {
  return (
    <Link
      key={item.name}
      href={item.href}
      style={{
        textDecoration: "none",
        color: i === 0 ? "#fff" : "#aaa",
        borderBottom: i === 0 ? "2px solid #e11212" : "none",
        paddingBottom: 8,
      }}
    >
      {item.name}
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
    padding: isMobile ? "22px 16px 36px" : "28px 24px 42px",
    width: "100%",
    boxSizing: "border-box",
  }}
>
        <div
  style={{
    width: isMobile ? "100%" : "46%",
    minWidth: isMobile ? "0" : 420,
    maxWidth: "100%",
    boxSizing: "border-box",
    margin: "0 auto 28px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    border: "1px solid rgba(255,255,255,.12)",
    background: "#0f0f0f",
    padding: "11px 14px",
  }}
>
 <span
  style={{
    width: 18,
    height: 18,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  }}
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="11"
      cy="11"
      r="7"
      stroke="#fff"
      strokeWidth="2"
    />
    <path
      d="M16.5 16.5L21 21"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
</span>

  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Гарчиг, ангилал, түлхүүр үгээр хайх..."
    style={{
      width: "100%",
      minWidth: 0,
      border: "none",
      outline: "none",
      background: "transparent",
      color: "#fff",
      fontSize: 14,
      fontFamily: "Arial",
    }}
  />

  {searchQuery && (
    <button
      onClick={() => setSearchQuery("")}
      style={{
        border: "none",
        background: "transparent",
        color: "#aaa",
        cursor: "pointer",
        fontSize: 18,
        fontFamily: "Arial",
        lineHeight: 1,
        padding: "0 2px",
      }}
    >
      ×
    </button>
  )}
</div>
<div
  style={{
    width: "100%",
    height: 90,
    margin: "0 0 34px 0",
    ...cardStyle,
    padding: 0,
    overflow: "hidden",
  }}
>
  {renderBanner(
    topBanner,
    "Энд таны сурталчилгаа байрлана",
    "Top banner · 1200 × 90",
    "90px"
  )}
</div>

        <div
  style={{
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "200px 1fr 200px",
    gap: isMobile ? 18 : 32,
    alignItems: "stretch",
    width: "100%",
  }}
>
          <aside
  style={{
    display: "grid",
    gridTemplateRows: isMobile ? "none" : "repeat(3, 1fr)",
    gridTemplateColumns: isMobile ? "1fr" : "none",
    gap: isMobile ? 18 : 28,
    order: isMobile ? 2 : 1,
  }}
>
           <MiniVisualCard item={getArticle(0)} height={isMobile ? 180 : 190} />
<MiniVisualCard item={getArticle(1)} height={isMobile ? 180 : 190} />
<MiniVisualCard item={getArticle(2)} height={isMobile ? 180 : 190} />
</aside>

<section
  style={{
    display: "grid",
    gridTemplateRows: isMobile ? "180px auto" : "190px 1fr",
    gap: isMobile ? 18 : 28,
    order: isMobile ? 1 : 2,
  }}
>
            <Link
  href={`/article/${wideArticle?.id || ""}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
  <article
  style={{
    height: 190,
    background: "#111",
    padding: 0,
    overflow: "hidden",
    cursor: "pointer",
    backgroundImage: `url(${wideArticle?.image || "/hero-main.png"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  }}
>
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.78) 100%)",
      zIndex: 1,
    }}
  />

  <div
    style={{
      position: "absolute",
      left: 22,
      right: 22,
      bottom: 20,
      zIndex: 2,
    }}
  >
    <div
      style={{
        color: "#e11212",
        fontSize: 12,
        fontFamily: "Arial",
        fontWeight: 700,
        textTransform: "uppercase",
        marginBottom: 8,
      }}
    >
      {wideArticle?.label || "Нийгэм"}
    </div>

   <h3
  style={{
    fontSize: 26,
    lineHeight: 1.18,
    margin: 0,
    color: "#fff",
    textShadow: "0 3px 16px rgba(0,0,0,.75)",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }}
>
      {wideArticle?.title || "Онцлох мэдээ"}
    </h3>
      <small
  style={{
    display: "block",
    marginTop: 10,
    color: "#aaa",
    fontSize: 12,
    fontFamily: "Arial",
    textShadow: "0 2px 10px rgba(0,0,0,.75)",
  }}
>
  {wideArticle?.date || "2026.06.18"}
</small>
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
    height: isMobile ? 320 : 420,
    background: "#111",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundImage: `url(${heroArticle?.image || "/hero-main.png"})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  }}
>
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.48) 42%, rgba(0,0,0,0.9) 100%)",
      zIndex: 1,
    }}
  />

  <div
    style={{
      position: "relative",
      zIndex: 2,
      padding: 26,
    }}
  >
   <div style={{ marginBottom: 18 }}>
  <div
    style={{
      display: "inline-block",
      fontFamily: "Arial",
      fontSize: 13,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".04em",
      color: "#fff",
    }}
  >
    Өнөөдрийн онцлох

    <div
      style={{
        width: "100%",
        height: 2,
        background: "#e11212",
        marginTop: 8,
      }}
    />
  </div>
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
        fontSize: 40,
        lineHeight: 1.08,
        maxWidth: 760,
        margin: "12px 0 10px",
        textShadow: "0 3px 18px rgba(0,0,0,.7)",
      }}
    >
      {heroArticle?.title || "Харагдаж байгаа бүхэн үнэн биш"}
    </h2>

    <p
      style={{
        fontSize: 16,
        color: "#d0d0d0",
        maxWidth: 660,
        lineHeight: 1.55,
        margin: 0,
        textShadow: "0 2px 12px rgba(0,0,0,.7)",
      }}
    >
      {heroArticle?.excerpt ||
        "Нийгмийн мэдээллийн орчин бидний бодлыг хэрхэн чиглүүлж байна вэ?"}
    </p>

    <div
      style={{
        marginTop: 18,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#aaa",
        fontSize: 13,
        fontFamily: "Arial",
      }}
    >
      <span>{heroArticle?.date || "2026.06.18"}</span>
      <span style={{ color: "#fff" }}>Унших →</span>
    </div>
  </div>
</article>
            </Link>
          </section>

          <aside
  style={{
    display: "grid",
    gridTemplateRows: isMobile ? "none" : "repeat(3, 1fr)",
    gridTemplateColumns: isMobile ? "1fr" : "none",
    gap: isMobile ? 18 : 28,
    order: isMobile ? 3 : 3,
  }}
>
<MiniVisualCard item={getArticle(4)} height={isMobile ? 180 : 190} />
<MiniVisualCard item={getArticle(5)} height={isMobile ? 180 : 190} />
<MiniVisualCard item={getArticle(6)} height={isMobile ? 180 : 190} />
          </aside>
        </div>

       <section
  style={{
    marginTop: 34,
    height: 120,
    padding: 0,
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,.12)",
    background: "#000",
  }}
>
          {renderBanner(
            inlineBanner,
            "Энд таны сурталчилгаа байрлана",
            "Full width banner · 1200 × 120",
            "120px"
          )}
        </section>

        <section style={{ marginTop: isMobile ? 28 : 36 }}>
          <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: isMobile ? 12 : 20,
    marginBottom: isMobile ? 22 : 28,
    borderBottom: "1px solid rgba(255,255,255,.1)",
    paddingBottom: 14,
  }}
>
  <div>
    <h2
  style={{
    fontSize: isMobile ? 24 : 28,
    margin: 0,
    fontFamily: "'Times New Roman', serif",
    lineHeight: 1.1,
    whiteSpace: "nowrap",
  }}
>
  Өмнөх мэдээнүүд
</h2>

    <div
      style={{
        width: 120,
        height: 2,
        background: "#e11212",
        marginTop: 10,
      }}
    />
  </div>

  <Link
  href="/article"
  style={{
    color: "#aaa",
    textDecoration: "none",
    fontSize: isMobile ? 12 : 13,
    fontFamily: "Arial",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  }}
>
  Бүгдийг үзэх →
</Link>
</div>

          <div
  style={{
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: isMobile ? "18px" : "28px 52px",
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
                    gridTemplateColumns: isMobile ? "120px 1fr" : "190px 1fr",
gap: isMobile ? 14 : 22,
minHeight: isMobile ? 96 : 110,
                  }}
                >
                  <div
                    style={{
                      height: isMobile ? 96 : 110,
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
    fontSize: isMobile ? 17 : 19,
    lineHeight: 1.35,
    display: "-webkit-box",
    WebkitLineClamp: 2,
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
    marginTop: isMobile ? 36 : 52,
    borderTop: "1px solid rgba(255,255,255,.1)",
    borderBottom: "1px solid rgba(255,255,255,.1)",
    padding: isMobile ? "22px 0" : "28px 0",
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
    gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
    gap: isMobile ? 12 : 14,
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
  padding: isMobile ? "14px 10px" : "18px 12px",
  minHeight: isMobile ? 72 : 90,
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
    width: "100%",
    height: isMobile ? 80 : 95,
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
  padding: isMobile ? "18px 10px" : "24px 12px",
  minHeight: isMobile ? 72 : "auto",
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
    padding: isMobile ? "34px 24px" : "46px 48px 34px",
    color: "#666",
    fontFamily: "Arial",
    fontSize: 13,
    background: "#000",
  }}
>
  <div
    style={{
      maxWidth: 1240,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
      gap: isMobile ? 26 : 60,
      alignItems: "start",
    }}
  >
    <div
      style={{
        textAlign: isMobile ? "center" : "left",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 10,
          fontFamily: "'Times New Roman', serif",
        }}
      >
        {settings.siteName}
      </div>

      <div
        style={{
          color: "#888",
          lineHeight: 1.6,
          maxWidth: isMobile ? "100%" : 420,
        }}
      >
        {settings.slogan}
      </div>
        {(settings.email || settings.phone || settings.facebook) && (
  <div
    style={{
      marginTop: 16,
      display: "grid",
      gap: 6,
      color: "#777",
      fontSize: 13,
    }}
  >
    {settings.email && <div>Email: {settings.email}</div>}

    {settings.phone && <div>Утас: {settings.phone}</div>}

    {settings.facebook && (
      <a
        href={settings.facebook}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#888",
          textDecoration: "none",
        }}
      >
        Facebook
      </a>
    )}
  </div>
)}
    </div>

    {activePages.length > 0 && (
      <nav
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(2, minmax(160px, auto))",
          gap: isMobile ? "12px" : "12px 28px",
          justifyContent: isMobile ? "center" : "end",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        {activePages.map((page) => (
          <Link
            key={page.id}
            href={`/page/${page.slug}`}
            style={{
              color: "#888",
              textDecoration: "none",
              fontSize: 13,
              lineHeight: 1.4,
            }}
          >
            {page.title}
          </Link>
        ))}
      </nav>
    )}
  </div>

  <div
    style={{
      maxWidth: 1240,
      margin: "34px auto 0",
      paddingTop: 20,
      borderTop: "1px solid rgba(255,255,255,.08)",
      color: "#555",
      textAlign: isMobile ? "center" : "left",
    }}
  >
    {settings.copyright}
  </div>
</footer>
    </main>
  );
}
