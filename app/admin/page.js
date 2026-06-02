"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    setPosts(saved);
  }, []);

  const handleDelete = (id) => {
    const confirmed = confirm("Энэ нийтлэлийг устгах уу?");

    if (!confirmed) return;

    const updated = posts.filter((post) => post.id !== id);

    localStorage.setItem(
      "anzaarArticles",
      JSON.stringify(updated)
    );

    setPosts(updated);
  };

  const handleFeatured = (id) => {
    const updated = posts.map((post) => ({
      ...post,
      featured: post.id === id,
    }));

    localStorage.setItem(
      "anzaarArticles",
      JSON.stringify(updated)
    );

    setPosts(updated);
  };

  return (
    <main style={page}>
      <aside style={sidebar}>
        <img
          src="/anzaar-logo-horizontal.png"
          alt="Anzaar.mn"
          style={{
            width: "150px",
            marginBottom: "28px",
          }}
        />

        {[
          "Хяналтын самбар",
          "Нийтлэлүүд",
          "Ангилал",
          "Хуудаснууд",
          "Сэтгэгдлүүд",
          "Медиа сан",
          "Баннерууд",
          "Хамтрагч байгууллагууд",
          "Хэрэглэгчид",
          "Тохиргоо",
        ].map((item, i) => (
          <div key={item} style={i === 0 ? activeMenu : menu}>
            {item}
          </div>
        ))}

        <div style={{ marginTop: "auto", color: "#aaa" }}>Гарах</div>
      </aside>

      <section style={content}>
        <h2 style={title}>Хяналтын самбар</h2>

        <div style={statsGrid}>
          <Stat label="Нийт нийтлэл" value={posts.length} color="#e22" />
          <Stat label="Нийт хандалт" value="215,430" color="#7b61ff" />
          <Stat label="Сэтгэгдэл" value="342" color="#7b61ff" />
          <Stat label="Бүртгэлтэй гишүүд" value="1,250" color="#c7962b" />
        </div>

        <div style={mainGrid}>
          <section style={card}>
            <div style={sectionHead}>
              <h3>Сүүлийн нийтлэлүүд</h3>

              <Link href="/admin/new-post" style={{ textDecoration: "none" }}>
                <button style={redButton}>Шинэ нийтлэл нэмэх</button>
              </Link>
            </div>

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
                {posts.map((post) => (
                  <tr key={post.id} style={row}>
                    <td style={titleCell}>{post.title}</td>
                    <td style={{ ...cell, color: "#ff3333" }}>
                      {post.label}
                    </td>
                    <td style={cell}>{post.date}</td>
                    <td style={cell}>0</td>
                    <td style={cell}>
                      <span style={status}>
                        {post.featured ? "Онцлох" : "Нийтлэгдсэн"}
                      </span>
                    </td>
                    <td style={cell}>
                      <span style={{ marginRight: "8px" }}>👁</span>

                      <Link
                        href={`/admin/edit/${post.id}`}
                        style={{
                          color: "#fff",
                          textDecoration: "none",
                          marginRight: "8px",
                        }}
                      >
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
              <h3 style={{ marginBottom: 18 }}>Түргэн үйлдлүүд</h3>

              <Link href="/admin/new-post" style={boxItem}>
                ＋ Шинэ нийтлэл нэмэх
              </Link>

              <p style={boxItem}>▧ Баннер нэмэх</p>
              <p style={boxItem}>♙ Хамтрагч нэмэх</p>
              <p style={boxItem}>▢ Хуудас үүсгэх</p>
            </div>

            <Box
              title="Нийтлэлийн ангилал"
              items={[
                "Нийгэм — 28",
                "Эдийн засаг — 24",
                "Эрх зүй — 18",
                "Эрүүл мэнд — 16",
                "Боловсрол — 14",
                "Сэтгэл зүй — 12",
                "Спорт — 8",
                "Соёл — 6",
              ]}
            />

            <Box
              title="Системийн мэдээлэл"
              items={[
                "Системийн хувилбар — 1.0.0",
                "PHP хувилбар — 8.2.12",
                "Сүүлийн нөөцлөлт — 2024.06.15",
              ]}
            />
          </aside>
        </div>

        <div style={bottomGrid}>
          <Box
            title="Хамгийн их хандалттай нийтлэлүүд"
            items={[
              "1. Хүмүүс яагаад худал дүр бүтээдэг вэ? — 1.2K",
              "2. Өглөөний 30 минут — 1.1K",
              "3. Агаарын бохирдол — 986",
              "4. Шинэ эрх зүйн хууль — 856",
              "5. Хөрөнгийн зах зээл — 642",
            ]}
          />

          <Box
            title="Сүүлийн сэтгэгдлүүд"
            items={[
              "Болд: 10 минутын өмнө",
              "Сараа: 25 минутын өмнө",
              "Отгон: 1 цагийн өмнө",
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
        <p style={{ color: "#45d96b", fontSize: 13 }}>+12 энэ 7 хоногт</p>
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

const redButton = {
  background: "#d71919",
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: 6,
  cursor: "pointer",
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
