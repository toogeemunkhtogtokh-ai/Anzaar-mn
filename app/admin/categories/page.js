"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { articles } from "../../../lib/articles";

const defaultCategories = [
  {
    id: "niigem",
    name: "Нийгэм",
    slug: "niigem",
    active: true,
    showInMenu: true,
  },
  {
    id: "ediinzasag",
    name: "Эдийн засаг",
    slug: "ediinzasag",
    active: true,
    showInMenu: true,
  },
  {
    id: "erhzui",
    name: "Эрх зүй",
    slug: "erhzui",
    active: true,
    showInMenu: true,
  },
  {
    id: "eruulmend",
    name: "Эрүүл мэнд",
    slug: "eruulmend",
    active: true,
    showInMenu: true,
  },
  {
    id: "bolovsrol",
    name: "Боловсрол",
    slug: "bolovsrol",
    active: true,
    showInMenu: true,
  },
  {
    id: "setgelzui",
    name: "Сэтгэл зүй",
    slug: "setgelzui",
    active: true,
    showInMenu: true,
  },
  {
    id: "sport",
    name: "Спорт",
    slug: "sport",
    active: true,
    showInMenu: true,
  },
  {
    id: "soyol",
    name: "Соёл",
    slug: "soyol",
    active: true,
    showInMenu: true,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(defaultCategories);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedCategories =
      JSON.parse(localStorage.getItem("anzaarCategories")) || null;

    const savedArticles =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    if (savedCategories && Array.isArray(savedCategories)) {
      const merged = defaultCategories.map((category) => {
        const saved = savedCategories.find(
          (item) => item.id === category.id
        );

        return saved ? { ...category, ...saved } : category;
      });

      setCategories(merged);
    } else {
      localStorage.setItem(
        "anzaarCategories",
        JSON.stringify(defaultCategories)
      );

      setCategories(defaultCategories);
    }

    setPosts([...savedArticles, ...articles]);
  }, []);

  const saveCategories = (updatedCategories) => {
    localStorage.setItem(
      "anzaarCategories",
      JSON.stringify(updatedCategories)
    );

    setCategories(updatedCategories);
  };

  const toggleActive = (id) => {
    const updated = categories.map((category) =>
      category.id === id
        ? {
            ...category,
            active: !category.active,
            updatedAt: new Date().toISOString(),
          }
        : category
    );

    saveCategories(updated);
  };

  const toggleMenu = (id) => {
    const updated = categories.map((category) =>
      category.id === id
        ? {
            ...category,
            showInMenu: !category.showInMenu,
            updatedAt: new Date().toISOString(),
          }
        : category
    );

    saveCategories(updated);
  };

  const resetCategories = () => {
    const confirmed = confirm(
      "Ангиллын тохиргоог үндсэн төлөв рүү буцаах уу?"
    );

    if (!confirmed) return;

    saveCategories(defaultCategories);
  };

  const counts = useMemo(() => {
    return posts.reduce((acc, post) => {
      const key = post.category || "unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [posts]);

  const activeCount = categories.filter((category) => category.active).length;
  const menuCount = categories.filter((category) => category.showInMenu).length;

  return (
    <main style={page}>
      <div style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <div style={topHeader}>
          <div>
            <h1 style={titleStyle}>Ангилал удирдлага</h1>
            <p style={desc}>
              Нийт {categories.length} ангилал байна. Идэвхтэй: {activeCount},
              menu дээр харагдах: {menuCount}
            </p>
          </div>

          <button onClick={resetCategories} style={resetButton}>
            Үндсэн төлөв сэргээх
          </button>
        </div>

        <div style={noticeBox}>
          Энэ хувилбарт шинэ ангилал нэмэхгүй. Одоогийн 8 үндсэн ангиллын
          идэвхтэй эсэх болон menu дээр харагдах эсэхийг удирдана.
        </div>

        <section style={card}>
          <table style={table}>
            <thead>
              <tr style={tableHead}>
                <th style={th}>Ангилал</th>
                <th style={th}>Slug</th>
                <th style={th}>Мэдээний тоо</th>
                <th style={th}>Active</th>
                <th style={th}>Menu</th>
                <th style={th}>Хуудас</th>
                <th style={th}>Үйлдэл</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category.id} style={row}>
                  <td style={nameCell}>
                    <div style={categoryName}>{category.name}</div>
                  </td>

                  <td style={cell}>
                    <code style={codeText}>{category.slug}</code>
                  </td>

                  <td style={cell}>{counts[category.slug] || 0}</td>

                  <td style={cell}>
                    <span
                      style={
                        category.active ? activeBadge : inactiveBadge
                      }
                    >
                      {category.active ? "Идэвхтэй" : "Идэвхгүй"}
                    </span>
                  </td>

                  <td style={cell}>
                    <span
                      style={
                        category.showInMenu ? menuBadge : hiddenBadge
                      }
                    >
                      {category.showInMenu ? "Menu дээр" : "Нуусан"}
                    </span>
                  </td>

                  <td style={cell}>
                    <Link
                      href={`/category/${category.slug}`}
                      style={viewLink}
                    >
                      Үзэх
                    </Link>
                  </td>

                  <td style={cell}>
                    <div style={actions}>
                      <button
                        onClick={() => toggleActive(category.id)}
                        style={statusButton}
                      >
                        {category.active ? "OFF" : "ON"}
                      </button>

                      <button
                        onClick={() => toggleMenu(category.id)}
                        style={menuButton}
                      >
                        {category.showInMenu ? "Menu hide" : "Menu show"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}

const page = {
  background: "#050505",
  color: "#fff",
  minHeight: "100vh",
  padding: 60,
  fontFamily: "Arial, sans-serif",
};

const container = {
  maxWidth: 1280,
  margin: "0 auto",
};

const backLink = {
  color: "#999",
  textDecoration: "none",
  display: "inline-block",
  marginBottom: 22,
};

const topHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 24,
  marginBottom: 24,
};

const titleStyle = {
  fontSize: 48,
  margin: "0 0 12px",
};

const desc = {
  color: "#888",
  margin: 0,
};

const resetButton = {
  background: "#222",
  color: "#fff",
  border: "1px solid #444",
  padding: "12px 18px",
  cursor: "pointer",
};

const noticeBox = {
  background: "#0d0d0d",
  border: "1px solid #222",
  color: "#aaa",
  padding: 16,
  marginBottom: 22,
  fontSize: 14,
  lineHeight: 1.6,
};

const card = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: 24,
  overflowX: "auto",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
  minWidth: 920,
};

const tableHead = {
  color: "#aaa",
  textAlign: "left",
  borderBottom: "1px solid #222",
};

const th = {
  padding: "12px 10px",
};

const row = {
  borderBottom: "1px solid #222",
};

const cell = {
  padding: "16px 10px",
  verticalAlign: "middle",
};

const nameCell = {
  padding: "16px 10px",
  minWidth: 180,
};

const categoryName = {
  fontWeight: 700,
  fontSize: 16,
};

const codeText = {
  background: "#080808",
  border: "1px solid #222",
  color: "#aaa",
  padding: "5px 8px",
};

const activeBadge = {
  background: "#0e3b18",
  color: "#7ee787",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
};

const inactiveBadge = {
  background: "#222",
  color: "#aaa",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
};

const menuBadge = {
  background: "#082f49",
  color: "#38bdf8",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
};

const hiddenBadge = {
  background: "#3a2d08",
  color: "#facc15",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
};

const viewLink = {
  color: "#fff",
  textDecoration: "none",
  border: "1px solid #333",
  padding: "7px 10px",
};

const actions = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const statusButton = {
  background: "#333",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
};

const menuButton = {
  background: "#082f49",
  color: "#38bdf8",
  border: "1px solid #164e63",
  padding: "8px 12px",
  cursor: "pointer",
};
