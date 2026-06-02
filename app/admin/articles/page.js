"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function AdminArticlesPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredPosts = useMemo(() => {
    const keyword = search.toLowerCase();

    return posts.filter(
      (post) =>
        post.title?.toLowerCase().includes(keyword) ||
        post.label?.toLowerCase().includes(keyword)
    );
  }, [posts, search]);

  return (
    <main
      style={{
        background: "#050505",
        color: "#fff",
        minHeight: "100vh",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Нийтлэлүүд</h1>
          <p style={{ color: "#888" }}>
            Нийт {posts.length} нийтлэл
          </p>
        </div>

        <Link
          href="/admin/new-post"
          style={{
            background: "#d71919",
            color: "#fff",
            padding: "12px 20px",
            textDecoration: "none",
            borderRadius: "6px",
          }}
        >
          + Шинэ нийтлэл
        </Link>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Нийтлэл хайх..."
        style={{
          width: "100%",
          padding: "14px",
          marginBottom: "24px",
          background: "#111",
          border: "1px solid #222",
          color: "#fff",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "1px solid #222",
              color: "#999",
            }}
          >
            <th align="left">Гарчиг</th>
            <th align="left">Ангилал</th>
            <th align="left">Огноо</th>
            <th align="left">Төлөв</th>
            <th align="left">Үйлдэл</th>
          </tr>
        </thead>

        <tbody>
          {filteredPosts.map((post) => (
            <tr
              key={post.id}
              style={{
                borderBottom: "1px solid #222",
              }}
            >
              <td style={{ padding: "16px 0" }}>
                {post.title}
              </td>

              <td>{post.label}</td>

              <td>{post.date}</td>

              <td>
                {post.featured ? (
                  <span
                    style={{
                      background: "#3a2d08",
                      color: "#facc15",
                      padding: "6px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    Онцлох
                  </span>
                ) : (
                  <span
                    style={{
                      background: "#0e3b18",
                      color: "#7ee787",
                      padding: "6px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    Нийтлэгдсэн
                  </span>
                )}
              </td>

              <td>
                <Link
                  href={`/article/${post.id}`}
                  style={{
                    color: "#fff",
                    marginRight: "10px",
                  }}
                >
                  👁
                </Link>

                <Link
                  href={`/admin/edit/${post.id}`}
                  style={{
                    color: "#fff",
                    marginRight: "10px",
                  }}
                >
                  EDIT
                </Link>

                <button
                  onClick={() =>
                    handleFeatured(post.id)
                  }
                  style={{
                    marginRight: "10px",
                    background: "#222",
                    color: "#facc15",
                    border: "1px solid #444",
                    padding: "6px 10px",
                    cursor: "pointer",
                  }}
                >
                  ★
                </button>

                <button
                  onClick={() =>
                    handleDelete(post.id)
                  }
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
