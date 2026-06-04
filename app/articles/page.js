"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { articles } from "../../lib/articles";
import { mockArticles } from "../../lib/mockContent";

const defaultCategories = [
  { name: "Нийгэм", slug: "niigem", active: true, showInMenu: true },
  { name: "Эдийн засаг", slug: "ediinzasag", active: true, showInMenu: true },
  { name: "Эрх зүй", slug: "erhzui", active: true, showInMenu: true },
  { name: "Эрүүл мэнд", slug: "eruulmend", active: true, showInMenu: true },
  { name: "Боловсрол", slug: "bolovsrol", active: true, showInMenu: true },
  { name: "Сэтгэл зүй", slug: "setgelzui", active: true, showInMenu: true },
  { name: "Спорт", slug: "sport", active: true, showInMenu: true },
  { name: "Соёл", slug: "soyol", active: true, showInMenu: true },
];

export default function ArticlesPage() {
  const [allArticles, setAllArticles] = useState(articles);
  const [siteCategories, setSiteCategories] = useState([]);
  const [sitePages, setSitePages] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(30);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

    const savedCategories =
      JSON.parse(localStorage.getItem("anzaarCategories")) || [];

    const savedPages =
      JSON.parse(localStorage.getItem("anzaarPages")) || [];

    const savedSettings =
      JSON.parse(localStorage.getItem("anzaarSettings")) || null;

    setAllArticles(mockArticles([...savedArticles, ...articles]));
    setSiteCategories(savedCategories);
    setSitePages(savedPages);

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

  const categorySource =
    siteCategories.length > 0 ? siteCategories : defaultCategories;

  const navCategories = categorySource
    .filter((category) => category.active !== false)
    .filter((category) => category.showInMenu !== false)
    .map((category) => ({
      name: category.name,
      href: `/category/${category.slug}`,
      slug: category.slug,
    }));

  const nav = [
    {
      name: "Нүүр",
      href: "/",
      slug: "home",
    },
    ...navCategories,
  ];

  const activePages = sitePages.filter((page) => page.active !== false);

  const publishedArticles = allArticles.filter(
    (item) => (item.status || "published") === "published"
  );

  const filteredArticles = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return publishedArticles.filter((item) => {
      const matchesSearch =
        !keyword ||
        item.title?.toLowerCase().includes(keyword) ||
        item.excerpt?.toLowerCase().includes(keyword) ||
        item.content?.toLowerCase().includes(keyword) ||
        item.label?.toLowerCase().includes(keyword) ||
        item.category?.toLowerCase().includes(keyword);

      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [publishedArticles, search, categoryFilter]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const hasMore = visibleCount < filteredArticles.length;

  const getCategoryName = (slug) => {
    return (
      categorySource.find((category) => category.slug === slug)?.name ||
      "Ангилал"
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
            {nav.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                style={{
                  textDecoration: "none",
                  color: "#aaa",
                  paddingBottom: 8,
                }}
              >
                {item.name}
              </Link>
            ))}
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
          <div style={{ display: "inline-block" }}>
            <h1
              style={{
                fontSize: isMobile ? 38 : 46,
                margin: 0,
                lineHeight: 1.05,
              }}
            >
              Бүх мэдээ
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
              fontSize: isMobile ? 15 : 18,
              marginBottom: 0,
              marginTop: 24,
              fontFamily: "Arial",
            }}
          >
            Нийт {filteredArticles.length} мэдээ байна.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 240px",
            gap: 12,
            marginBottom: 30,
          }}
        >
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(30);
            }}
            placeholder="Мэдээ хайх..."
            style={{
              width: "100%",
              padding: 14,
              background: "#0b0b0b",
              border: "1px solid rgba(255,255,255,.14)",
              color: "#fff",
              boxSizing: "border-box",
              fontFamily: "Arial",
              fontSize: 14,
              outline: "none",
            }}
          />

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setVisibleCount(30);
            }}
            style={{
              width: "100%",
              padding: 14,
              background: "#0b0b0b",
              border: "1px solid rgba(255,255,255,.14)",
              color: "#fff",
              boxSizing: "border-box",
              fontFamily: "Arial",
              fontSize: 14,
              outline: "none",
            }}
          >
            <option value="all">Бүх ангилал</option>

            {categorySource
              .filter((category) => category.active !== false)
              .map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        {visibleArticles.length > 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fill, minmax(320px, 360px))",
                gap: isMobile ? 18 : 24,
                justifyContent: "start",
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
                      minHeight: isMobile ? "auto" : 340,
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
                        {item.label || getCategoryName(item.category)}
                      </div>

                      <h2
                        style={{
                          fontSize: isMobile ? 21 : 22,
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
              padding: 28,
            }}
          >
            Мэдээ олдсонгүй.
          </div>
        )}
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
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(2, minmax(160px, auto))",
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
