"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function AdminArticlesPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = () => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    setPosts(saved);
  };

  const savePosts = (updatedPosts) => {
    localStorage.setItem("anzaarArticles", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleDelete = (id) => {
    const confirmed = confirm("Энэ нийтлэлийг устгах уу?");
    if (!confirmed) return;

    const updated = posts.filter(
      (post) => String(post.id) !== String(id)
    );

    savePosts(updated);
  };

  const handleFeatured = (id) => {
    const updated = posts.map((post) => {
      if (String(post.id) === String(id)) {
        return {
          ...post,
          featured: true,
          updatedAt: new Date().toISOString(),
        };
      }

      return {
        ...post,
        featured: false,
        updatedAt: new Date().toISOString(),
      };
    });

    savePosts(updated);
  };

  const handleWide = (id) => {
    const updated = posts.map((post) => {
      if (String(post.id) === String(id)) {
        return {
          ...post,
          wide: true,
          updatedAt: new Date().toISOString(),
        };
      }

      return {
        ...post,
        wide: false,
        updatedAt: new Date().toISOString(),
      };
    });

    savePosts(updated);
  };

  const toggleStatus = (id) => {
    const updated = posts.map((post) =>
      String(post.id) === String(id)
        ? {
            ...post,
            status: post.status === "draft" ? "published" : "draft",
            updatedAt: new Date().toISOString(),
          }
        : post
    );

    savePosts(updated);
  };

  const filteredPosts = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return posts.filter((post) => {
      const matchesSearch =
        !keyword ||
        post.title?.toLowerCase().includes(keyword) ||
        post.excerpt?.toLowerCase().includes(keyword) ||
        post.content?.toLowerCase().includes(keyword) ||
        post.label?.toLowerCase().includes(keyword) ||
        post.category?.toLowerCase().includes(keyword);

      const matchesCategory =
        categoryFilter === "all" || post.category === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (post.status || "published") === statusFilter;

      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "featured" && post.featured) ||
        (typeFilter === "wide" && post.wide) ||
        (typeFilter === "normal" && !post.featured && !post.wide);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesType
      );
    });
  }, [posts, search, categoryFilter, statusFilter, typeFilter]);

  const categoryCounts = posts.reduce((acc, post) => {
    const key = post.category || "unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const totalPublished = posts.filter(
    (post) => (post.status || "published") === "published"
  ).length;

  const totalDraft = posts.filter(
    (post) => post.status === "draft"
  ).length;

  const totalFeatured = posts.filter((post) => post.featured).length;
  const totalWide = posts.filter((post) => post.wide).length;

  return (
    <main style={page}>
      <div style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <div style={topHeader}>
          <div>
            <h1 style={titleStyle}>Нийтлэл удирдлага</h1>
            <p style={desc}>
              Нийт {posts.length} нийтлэл байна. Нийтлэгдсэн:{" "}
              {totalPublished}, ноорог: {totalDraft}
            </p>
          </div>

          <Link href="/admin/new-post" style={{ textDecoration: "none" }}>
            <button style={redButton}>+ Шинэ нийтлэл</button>
          </Link>
        </div>

        <div style={statsGrid}>
          <Stat label="Бүх нийтлэл" value={posts.length} />
          <Stat label="Нийтлэгдсэн" value={totalPublished} />
          <Stat label="Ноорог" value={totalDraft} />
          <Stat label="Онцлох" value={totalFeatured} />
          <Stat label="Wide" value={totalWide} />
        </div>

        <section style={card}>
          <div style={filters}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Гарчиг, ангилал, агуулгаар хайх..."
              style={searchInput}
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={selectInput}
            >
              <option value="all">Бүх ангилал</option>
              <option value="niigem">Нийгэм ({categoryCounts.niigem || 0})</option>
              <option value="ediinzasag">
                Эдийн засаг ({categoryCounts.ediinzasag || 0})
              </option>
              <option value="erhzui">Эрх зүй ({categoryCounts.erhzui || 0})</option>
              <option value="eruulmend">
                Эрүүл мэнд ({categoryCounts.eruulmend || 0})
              </option>
              <option value="bolovsrol">
                Боловсрол ({categoryCounts.bolovsrol || 0})
              </option>
              <option value="setgelzui">
                Сэтгэл зүй ({categoryCounts.setgelzui || 0})
              </option>
              <option value="sport">Спорт ({categoryCounts.sport || 0})</option>
              <option value="soyol">Соёл ({categoryCounts.soyol || 0})</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={selectInput}
            >
              <option value="all">Бүх төлөв</option>
              <option value="published">Нийтлэгдсэн</option>
              <option value="draft">Ноорог</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={selectInput}
            >
              <option value="all">Бүх төрөл</option>
              <option value="featured">Онцлох</option>
              <option value="wide">Wide</option>
              <option value="normal">Энгийн</option>
            </select>
          </div>

          <div style={tableWrap}>
            <table style={table}>
              <thead>
                <tr style={tableHead}>
                  <th style={th}>Зураг</th>
                  <th style={th}>Гарчиг</th>
                  <th style={th}>Ангилал</th>
                  <th style={th}>Огноо</th>
                  <th style={th}>Төлөв</th>
                  <th style={th}>Төрөл</th>
                  <th style={th}>Үйлдэл</th>
                </tr>
              </thead>

              <tbody>
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={emptyTd}>
                      Нийтлэл олдсонгүй.
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} style={row}>
                      <td style={cell}>
                        <div
                          style={{
                            ...thumb,
                            backgroundImage: `url(${post.image || "/hero-main.png"})`,
                          }}
                        />
                      </td>

                      <td style={titleCell}>
                        <div style={postTitle}>{post.title}</div>
                        <div style={postExcerpt}>
                          {post.excerpt || post.content || ""}
                        </div>
                      </td>

                      <td style={cell}>
                        <span style={categoryText}>
                          {post.label || getLabel(post.category)}
                        </span>
                      </td>

                      <td style={cell}>{post.date || "Огноо"}</td>

                      <td style={cell}>
                        <button
                          onClick={() => toggleStatus(post.id)}
                          style={
                            post.status === "draft"
                              ? draftBadgeButton
                              : publishedBadgeButton
                          }
                        >
                          {post.status === "draft" ? "Ноорог" : "Нийтлэгдсэн"}
                        </button>
                      </td>

                      <td style={cell}>
                        <div style={badgeGroup}>
                          {post.featured && (
                            <span style={featuredBadge}>Онцлох</span>
                          )}

                          {post.wide && <span style={wideBadge}>Wide</span>}

                          {!post.featured && !post.wide && (
                            <span style={normalBadge}>Энгийн</span>
                          )}
                        </div>
                      </td>

                      <td style={cell}>
                        <div style={actionGroup}>
                          <Link href={`/article/${post.id}`} style={viewLink}>
                            Үзэх
                          </Link>

                          <Link
                            href={`/admin/edit/${post.id}`}
                            style={editLink}
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleFeatured(post.id)}
                            style={smallButton}
                          >
                            Онцлох
                          </button>

                          <button
                            onClick={() => handleWide(post.id)}
                            style={smallButtonBlue}
                          >
                            Wide
                          </button>

                          <button
                            onClick={() => handleDelete(post.id)}
                            style={deleteButton}
                          >
                            Устгах
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div style={statCard}>
      <p style={statLabel}>{label}</p>
      <h3 style={statValue}>{value}</h3>
    </div>
  );
}

function getLabel(category) {
  const labels = {
    niigem: "Нийгэм",
    ediinzasag: "Эдийн засаг",
    erhzui: "Эрх зүй",
    eruulmend: "Эрүүл мэнд",
    bolovsrol: "Боловсрол",
    setgelzui: "Сэтгэл зүй",
    sport: "Спорт",
    soyol: "Соёл",
  };

  return labels[category] || "Ангилалгүй";
}

const page = {
  background: "#050505",
  color: "#fff",
  minHeight: "100vh",
  padding: 60,
  fontFamily: "Arial, sans-serif",
};

const container = {
  maxWidth: 1500,
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
  marginBottom: 28,
};

const titleStyle = {
  fontSize: 48,
  margin: "0 0 12px",
};

const desc = {
  color: "#888",
  margin: 0,
};

const redButton = {
  background: "#d71919",
  color: "#fff",
  border: "none",
  padding: "14px 22px",
  cursor: "pointer",
  fontWeight: 700,
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: 14,
  marginBottom: 22,
};

const statCard = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: 18,
};

const statLabel = {
  color: "#888",
  margin: 0,
  fontSize: 13,
};

const statValue = {
  margin: "8px 0 0",
  fontSize: 28,
};

const card = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: 24,
};

const filters = {
  display: "grid",
  gridTemplateColumns: "1fr 180px 160px 150px",
  gap: 12,
  marginBottom: 22,
};

const searchInput = {
  width: "100%",
  padding: 14,
  background: "#0b0b0b",
  border: "1px solid #333",
  color: "#fff",
  boxSizing: "border-box",
  fontSize: 14,
};

const selectInput = {
  width: "100%",
  padding: 14,
  background: "#0b0b0b",
  border: "1px solid #333",
  color: "#fff",
  boxSizing: "border-box",
  fontSize: 14,
};

const tableWrap = {
  overflowX: "auto",
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
  minWidth: 1150,
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
  padding: "14px 10px",
  verticalAlign: "middle",
};

const titleCell = {
  padding: "14px 10px",
  minWidth: 300,
  verticalAlign: "middle",
};

const thumb = {
  width: 90,
  height: 54,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  border: "1px solid #222",
};

const postTitle = {
  fontWeight: 700,
  marginBottom: 6,
};

const postExcerpt = {
  color: "#777",
  fontSize: 12,
  lineHeight: 1.4,
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

const categoryText = {
  color: "#ff3333",
  fontWeight: 700,
};

const badgeGroup = {
  display: "flex",
  gap: 6,
  flexWrap: "wrap",
};

const featuredBadge = {
  background: "#3a2d08",
  color: "#facc15",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
};

const wideBadge = {
  background: "#082f49",
  color: "#38bdf8",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
};

const normalBadge = {
  background: "#222",
  color: "#aaa",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
};

const publishedBadgeButton = {
  background: "#0e3b18",
  color: "#7ee787",
  border: "none",
  padding: "7px 10px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 12,
};

const draftBadgeButton = {
  background: "#3a2d08",
  color: "#facc15",
  border: "none",
  padding: "7px 10px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 12,
};

const actionGroup = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
};

const viewLink = {
  color: "#fff",
  textDecoration: "none",
  border: "1px solid #333",
  padding: "7px 10px",
};

const editLink = {
  color: "#fff",
  textDecoration: "none",
  border: "1px solid #333",
  padding: "7px 10px",
};

const smallButton = {
  background: "#222",
  color: "#facc15",
  border: "1px solid #444",
  padding: "7px 10px",
  cursor: "pointer",
};

const smallButtonBlue = {
  background: "#082f49",
  color: "#38bdf8",
  border: "1px solid #164e63",
  padding: "7px 10px",
  cursor: "pointer",
};

const deleteButton = {
  background: "#8b0000",
  color: "#fff",
  border: "none",
  padding: "7px 10px",
  cursor: "pointer",
};

const emptyTd = {
  padding: 24,
  color: "#777",
  textAlign: "center",
};
