"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    setPosts(saved);
  }, []);

  const savePosts = (updatedPosts) => {
    localStorage.setItem("anzaarArticles", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleDelete = (id) => {
    const confirmed = confirm("Энэ нийтлэлийг устгах уу?");
    if (!confirmed) return;

    const updated = posts.filter((post) => post.id !== id);
    savePosts(updated);
  };

  const handleFeatured = (id) => {
    const updated = posts.map((post) => ({
      ...post,
      featured: post.id === id,
    }));

    savePosts(updated);
  };

  const filteredPosts = useMemo(() => {
    const keyword = search.toLowerCase();

    return posts.filter((post) => {
      return (
        post.title?.toLowerCase().includes(keyword) ||
        post.label?.toLowerCase().includes(keyword) ||
        post.category?.toLowerCase().includes(keyword)
      );
    });
  }, [posts, search]);

  const totalViews = posts.reduce(
    (sum, post) => sum + Number(post.views || 0),
    0
  );

  const featuredPost = posts.find((post) => post.featured);

  const categoryCounts = posts.reduce((acc, post) => {
    const label = post.label || "Ангилалгүй";
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  const menuItems = [
    "Хяналтын самбар",
    "Нийтлэл",
    "Ангилал",
    "Хуудас",
    "Сэтгэгдэл",
    "Медиа",
    "Баннер",
    "Хамтрагч",
    "Хэрэглэгч",
    "Тохиргоо",
  ];

  return (
    <main style={page}>
      <aside style={sidebar}>
        <img
          src="/anzaar-logo-horizontal.png"
          alt="Anzaar.mn"
          style={logoImage}
        />

        {menuItems.map((item, i) => (
          <div key={item} style={i === 0 ? activeMenu : menu}>
            {item}
          </div>
        ))}

        <div style={logoutText}>Гарах</div>
      </aside>

      <section style={content}>
        <h2 style={title}>Хяналтын самбар</h2>

        <div style={statsGrid}>
          <Stat label="Нийт нийтлэл" value={posts.length} color="#e22" />
          <Stat label="Нийт хандалт" value={totalViews} color="#7b61ff" />
          <Stat
            label="Онцлох нийтлэл"
            value={featuredPost ? "1" : "0"}
            color="#facc15"
          />
          <Stat
            label="Ангилал"
            value={Object.keys(categoryCounts).length}
            color="#c7962b"
          />
        </div>

        <div style={mainGrid}>
          <section style={card}>
            <div style={sectionHead}>
              <div>
                <h3 style={{ margin: 0 }}>Сүүлийн нийтлэл</h3>
                <p style={mutedText}>
                  Нийт {filteredPosts.length} нийтлэл харагдаж байна
                </p>
              </div>

              <Link href="/admin/new-post" style={{ textDecoration: "none" }}>
                <button style={redButton}>Нийтлэл нэмэх</button>
              </Link>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Нийтлэл хайх..."
              style={searchInput}
            />

            <table style={table}>
              <thead>
                <tr style={tableHead}>
                  <th>Гарчиг</th>
                  <th>Ангилал</th>
                  <th>Огноо</th>
                  <th>Хандалт</th>
                  <th>Төлөв</th>
                  <th>Үйлдэл</th>
                </tr>
              </thead>

              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} style={row}>
                    <td style={titleCell}>{post.title}</td>

                    <td style={{ ...cell, color: "#ff3333" }}>
                      {post.label}
                    </td>

                    <td style={cell}>{post.date}</td>

                    <td style={cell}>{post.views || 0}</td>

                    <td style={cell}>
                      <span style={post.featured ? featuredStatus : status}>
                        {post.featured ? "Онцлох" : "Нийтлэгдсэн"}
                      </span>
                    </td>

                    <td style={cell}>
                      <Link href={`/article/${post.id}`} style={viewLink}>
                        👁
                      </Link>

                      <Link href={`/admin/edit/${post.id}`} style={editLink}>
                        EDIT
                      </Link>

                      <button
                        onClick={() => handleFeatured(post.id)}
                        style={featuredButton}
                      >
                        {post.featured ? "★ Онцлох" : "☆ Онцлох"}
                      </button>

                      <button
                        onClick={() => handleDelete(post.id)}
                        style={deleteButton}
                      >
                        🗑
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <aside>
            <div style={box}>
              <h3 style={{ marginBottom: 18 }}>Түргэн үйлдэл</h3>

              <Link href="/admin/new-post" style={boxItem}>
                ＋ Нийтлэл нэмэх
              </Link>

              <p style={boxItem}>▧ Баннер нэмэх</p>
              <p style={boxItem}>♙ Хамтрагч нэмэх</p>
              <p style={boxItem}>▢ Хуудас нэмэх</p>
            </div>

            <Box
              title="Нийтлэлийн ангилал"
              items={
                Object.keys(categoryCounts).length > 0
                  ? Object.entries(categoryCounts).map(
                      ([label, count]) => `${label} — ${count}`
                    )
                  : ["Одоогоор нийтлэл алга"]
              }
            />

            <Box
              title="Онцлох нийтлэл"
              items={[
                featuredPost
                  ? featuredPost.title
                  : "Одоогоор онцлох нийтлэл сонгоогүй байна",
              ]}
            />
          </aside>
        </div>

        <div style={bottomGrid}>
          <Box
            title="Хамгийн их хандалттай нийтлэл"
            items={
              posts.length > 0
                ? [...posts]
                    .sort((a, b) => Number(b.views || 0) - Number(a.views || 0))
                    .slice(0, 5)
                    .map(
                      (post, index) =>
                        `${index + 1}. ${post.title} — ${post.views || 0}`
                    )
                : ["Одоогоор нийтлэл алга"]
            }
          />

          <Box
            title="Системийн мэдээлэл"
            items={[
              "CMS хувилбар — LocalStorage 1.0",
              "Frontend — Next.js",
              "Storage — Browser LocalStorage",
            ]}
          />
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value, color }) {
  return (
    <div style={statCard}>
      <div style={{ ...iconBox, color }}>▣</div>
      <div>
        <p style={small}>{label}</p>
        <h3 style={statValue}>{value}</h3>
        <p style={{ color: "#45d96b", fontSize: 13 }}>
          Шууд шинэчлэгдэнэ
        </p>
      </div>
    </div>
  );
}

function Box({ title, items }) {
  return (
    <div style={box}>
      <h3 style={{ marginBottom: 18 }}>{title}</h3>
      {items.map((item) => (
        <p key={item} style={boxItem}>
          {item}
        </p>
      ))}
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#050505",
  color: "#fff",
  display: "flex",
  fontFamily: "Arial, sans-serif",
};

const sidebar = {
  width: 280,
  padding: "28px 24px",
  borderRight: "1px solid #222",
  display: "flex",
  flexDirection: "column",
  gap: 14,
};

const logoImage = {
  width: "150px",
  marginBottom: "28px",
};

const logoutText = {
  marginTop: "auto",
  color: "#aaa",
};

const menu = {
  padding: "14px 16px",
  color: "#bbb",
  borderRadius: 8,
};

const activeMenu = {
  ...menu,
  color: "#ff3333",
  background: "#171717",
};

const content = {
  flex: 1,
  padding: "36px 32px",
};

const title = {
  fontSize: 28,
  marginBottom: 28,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 18,
  marginBottom: 22,
};

const statCard = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  borderRadius: 8,
  padding: 24,
  display: "flex",
  gap: 20,
  alignItems: "center",
};

const iconBox = {
  width: 58,
  height: 58,
  background: "#1b1b1b",
  display: "grid",
  placeItems: "center",
  borderRadius: 8,
  fontSize: 26,
};

const small = {
  color: "#bbb",
  margin: 0,
};

const statValue = {
  fontSize: 30,
  margin: "6px 0",
};

const mainGrid = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: 18,
};

const card = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  borderRadius: 8,
  padding: 22,
};

const sectionHead = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 18,
};

const mutedText = {
  color: "#777",
  fontSize: 13,
  marginTop: 6,
};

const redButton = {
  background: "#d71919",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: 6,
  cursor: "pointer",
};

const searchInput = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  background: "#0d0d0d",
  border: "1px solid #222",
  color: "#fff",
  fontSize: "15px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
};

const cell = {
  padding: "18px 8px",
};

const titleCell = {
  padding: "18px 8px",
  minWidth: "360px",
};

const tableHead = {
  color: "#aaa",
  textAlign: "left",
  borderBottom: "1px solid #222",
};

const row = {
  borderBottom: "1px solid #222",
  height: 58,
};

const status = {
  background: "#0e3b18",
  color: "#7ee787",
  padding: "6px 10px",
  borderRadius: 6,
};

const featuredStatus = {
  background: "#3a2d08",
  color: "#facc15",
  padding: "6px 10px",
  borderRadius: 6,
};

const viewLink = {
  color: "#fff",
  textDecoration: "none",
  marginRight: "8px",
};

const editLink = {
  color: "#fff",
  textDecoration: "none",
  marginRight: "8px",
};

const featuredButton = {
  background: "#222",
  color: "#facc15",
  border: "1px solid #444",
  padding: "6px 10px",
  cursor: "pointer",
  marginRight: "8px",
  fontSize: "13px",
};

const deleteButton = {
  background: "transparent",
  border: "none",
  color: "#fff",
  cursor: "pointer",
  fontSize: "16px",
};

const box = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  borderRadius: 8,
  padding: 22,
  marginBottom: 18,
};

const boxItem = {
  color: "#ddd",
  borderBottom: "1px solid #222",
  paddingBottom: 10,
  textDecoration: "none",
  display: "block",
};

const bottomGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 18,
  marginTop: 18,
};
