"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const defaultPages = [
  {
    id: "about",
    title: "Бидний тухай",
    slug: "about",
    content:
      "Anzaar.mn бол нийгэм, эдийн засаг, эрх зүй, боловсрол, сэтгэл зүй, спорт, соёлын чиглэлээр мэдээ, нийтлэл хүргэх платформ юм.",
    active: true,
  },
  {
    id: "contact",
    title: "Холбоо барих",
    slug: "contact",
    content: "Anzaar.mn редакцтай холбогдох мэдээлэл энд байрлана.",
    active: true,
  },
  {
    id: "advertising",
    title: "Зар сурталчилгаа байршуулах",
    slug: "advertising",
    content:
      "Anzaar.mn сайтад зар сурталчилгаа байршуулах нөхцөл, боломжуудын талаарх мэдээлэл энд байрлана.",
    active: true,
  },
  {
    id: "editorial-policy",
    title: "Редакцийн бодлого",
    slug: "editorial-policy",
    content:
      "Anzaar.mn редакцийн баримтлах бодлого, нийтлэлийн зарчим энд байрлана.",
    active: true,
  },
  {
    id: "privacy-policy",
    title: "Нууцлалын бодлого",
    slug: "privacy-policy",
    content:
      "Хэрэглэгчийн мэдээлэл, нууцлалтай холбоотой бодлого энд байрлана.",
    active: true,
  },
  {
    id: "terms",
    title: "Үйлчилгээний нөхцөл",
    slug: "terms",
    content: "Anzaar.mn сайтыг ашиглах үйлчилгээний нөхцөл энд байрлана.",
    active: true,
  },
];

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

export default function StaticPage({ params }) {
  const [pageData, setPageData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [siteCategories, setSiteCategories] = useState([]);
  const [settings, setSettings] = useState({
  siteName: "Anzaar.mn",
  slogan: "Өнөөдрийг анзаарч маргаашийг бүтээе.",
  copyright: "© 2026 Anzaar.mn. Бүх эрх хуулиар хамгаалагдсан.",
});

  useEffect(() => {
    const savedPages =
      JSON.parse(localStorage.getItem("anzaarPages")) || defaultPages;

    const savedCategories =
      JSON.parse(localStorage.getItem("anzaarCategories")) || [];

    const savedSettings =
  JSON.parse(localStorage.getItem("anzaarSettings")) || null;

    const found = savedPages.find(
      (page) => String(page.slug) === String(params.slug)
    );

    setPageData(found || null);
    setSiteCategories(savedCategories);
    setLoaded(true);
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
  }, [params.slug]);

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

  const renderContent = () => {
    if (!loaded) {
      return (
        <div style={messageBox}>
          Уншиж байна...
        </div>
      );
    }

    if (!pageData) {
      return (
        <div style={messageBox}>
          <h1 style={messageTitle}>Хуудас олдсонгүй</h1>
          <p style={messageText}>
            Таны хайсан хуудас байхгүй эсвэл устгагдсан байна.
          </p>

          <Link href="/" style={redLink}>
            Нүүр хуудас руу буцах
          </Link>
        </div>
      );
    }

    if (pageData.active === false) {
      return (
        <div style={messageBox}>
          <h1 style={messageTitle}>Энэ хуудас идэвхгүй байна</h1>
          <p style={messageText}>
            Уг хуудас одоогоор нийтэд харагдахгүй төлөвтэй байна.
          </p>

          <Link href="/" style={redLink}>
            Нүүр хуудас руу буцах
          </Link>
        </div>
      );
    }

    return (
      <>
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
                fontSize: isMobile ? 38 : 52,
                margin: 0,
                lineHeight: 1.05,
              }}
            >
              {pageData.title}
            </h1>

            <div
              style={{
                width: isMobile ? "100%" : "72%",
                height: 2,
                background: "#e11212",
                marginTop: 12,
              }}
            />
          </div>

          <p
            style={{
              color: "#888",
              fontSize: isMobile ? 13 : 14,
              marginTop: 20,
              marginBottom: 0,
              fontFamily: "Arial",
            }}
          >
            /page/{pageData.slug}
          </p>
        </div>

        <article
          style={{
            color: "#ddd",
            fontSize: isMobile ? 18 : 21,
            lineHeight: 1.85,
            whiteSpace: "pre-line",
            maxWidth: 860,
          }}
        >
          {pageData.content}
        </article>
      </>
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
            {nav.map((item, index) => {
              return (
                <Link
                  key={item.slug}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: index === 0 ? "#fff" : "#aaa",
                    borderBottom:
                      index === 0 ? "2px solid #e11212" : "none",
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
          maxWidth: 1180,
          margin: "0 auto",
          padding: isMobile ? "36px 16px 64px" : "58px 24px 90px",
          boxSizing: "border-box",
        }}
      >
        {renderContent()}
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
        {settings.copyright}
      </footer>
    </main>
  );
}

const messageBox = {
  border: "1px solid rgba(255,255,255,.1)",
  background: "linear-gradient(180deg,#111,#050505)",
  padding: 32,
  color: "#aaa",
  fontFamily: "Arial",
  lineHeight: 1.7,
};

const messageTitle = {
  color: "#fff",
  margin: "0 0 12px",
  fontSize: 32,
};

const messageText = {
  color: "#aaa",
  marginBottom: 22,
};

const redLink = {
  display: "inline-block",
  background: "#d71919",
  color: "#fff",
  textDecoration: "none",
  padding: "12px 18px",
  fontFamily: "Arial",
  fontWeight: 700,
};
