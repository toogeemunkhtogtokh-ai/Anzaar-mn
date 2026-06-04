"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { articles } from "../../../lib/articles";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = () => {
    const savedArticles =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    const allArticles = [...savedArticles, ...articles];

    const collected = [];

    Object.keys(localStorage).forEach((key) => {
      if (!key.startsWith("anzaarComments-")) return;

      const articleId = key.replace("anzaarComments-", "");
      const article = allArticles.find(
        (item) => String(item.id) === String(articleId)
      );

      const storedComments = JSON.parse(localStorage.getItem(key)) || [];

      storedComments.forEach((comment) => {
        collected.push({
          ...comment,
          storageKey: key,
          articleId,
          articleTitle: article?.title || "Мэдээ олдсонгүй",
          articleExists: Boolean(article),
        });
      });
    });

    collected.sort((a, b) => Number(b.id || 0) - Number(a.id || 0));

    setComments(collected);
  };

  const saveCommentsByKey = (storageKey, updatedItems) => {
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    loadComments();
  };

  const toggleComment = (comment) => {
    const stored = JSON.parse(localStorage.getItem(comment.storageKey)) || [];

    const updated = stored.map((item) =>
      item.id === comment.id
        ? {
            ...item,
            active: item.active === false ? true : false,
          }
        : item
    );

    saveCommentsByKey(comment.storageKey, updated);
  };

  const deleteComment = (comment) => {
    const confirmed = confirm("Энэ сэтгэгдлийг устгах уу?");
    if (!confirmed) return;

    const stored = JSON.parse(localStorage.getItem(comment.storageKey)) || [];

    const updated = stored.filter((item) => item.id !== comment.id);

    saveCommentsByKey(comment.storageKey, updated);
  };

  const filteredComments = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return comments;

    return comments.filter((comment) => {
      return (
        comment.name?.toLowerCase().includes(keyword) ||
        comment.text?.toLowerCase().includes(keyword) ||
        comment.articleTitle?.toLowerCase().includes(keyword)
      );
    });
  }, [comments, search]);

  const activeCount = comments.filter(
    (comment) => comment.active !== false
  ).length;

  const inactiveCount = comments.filter(
    (comment) => comment.active === false
  ).length;

  return (
    <main style={page}>
      <div style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <div style={topHeader}>
          <div>
            <h1 style={titleStyle}>Сэтгэгдэл удирдлага</h1>
            <p style={desc}>
              Нийт {comments.length} сэтгэгдэл байна. Идэвхтэй: {activeCount},
              идэвхгүй: {inactiveCount}
            </p>
          </div>

          <button onClick={loadComments} style={refreshButton}>
            Шинэчлэх
          </button>
        </div>

        <div style={card}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Нэр, мэдээний гарчиг, сэтгэгдлээр хайх..."
            style={searchInput}
          />

          {filteredComments.length === 0 ? (
            <div style={emptyBox}>
              Одоогоор сэтгэгдэл алга.
            </div>
          ) : (
            <div style={list}>
              {filteredComments.map((comment) => (
                <div
                  key={`${comment.storageKey}-${comment.id}`}
                  style={commentCard}
                >
                  <div style={commentMain}>
                    <div style={metaRow}>
                      <strong style={nameText}>
                        {comment.name || "Зочин"}
                      </strong>

                      <span
                        style={
                          comment.active === false
                            ? inactiveBadge
                            : activeBadge
                        }
                      >
                        {comment.active === false ? "Идэвхгүй" : "Идэвхтэй"}
                      </span>
                    </div>

                    <p style={commentText}>{comment.text}</p>

                    <div style={articleInfo}>
                      <span>Мэдээ: </span>

                      {comment.articleExists ? (
                        <Link
                          href={`/article/${comment.articleId}`}
                          style={articleLink}
                        >
                          {comment.articleTitle}
                        </Link>
                      ) : (
                        <span style={{ color: "#777" }}>
                          {comment.articleTitle}
                        </span>
                      )}
                    </div>

                    <div style={dateText}>
                      {comment.date || "Огноо байхгүй"}
                    </div>
                  </div>

                  <div style={actions}>
                    <button
                      onClick={() => toggleComment(comment)}
                      style={statusButton}
                    >
                      {comment.active === false ? "ON" : "OFF"}
                    </button>

                    <button
                      onClick={() => deleteComment(comment)}
                      style={deleteButton}
                    >
                      Устгах
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
  marginBottom: 30,
};

const titleStyle = {
  fontSize: 48,
  margin: "0 0 12px",
};

const desc = {
  color: "#888",
  margin: 0,
};

const refreshButton = {
  background: "#222",
  color: "#fff",
  border: "1px solid #444",
  padding: "12px 18px",
  cursor: "pointer",
};

const card = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: 24,
};

const searchInput = {
  width: "100%",
  padding: 14,
  background: "#0b0b0b",
  border: "1px solid #333",
  color: "#fff",
  boxSizing: "border-box",
  fontSize: 14,
  marginBottom: 22,
};

const emptyBox = {
  color: "#777",
  border: "1px solid #222",
  padding: 22,
};

const list = {
  display: "grid",
  gap: 14,
};

const commentCard = {
  display: "flex",
  justifyContent: "space-between",
  gap: 18,
  border: "1px solid #222",
  background: "#080808",
  padding: 18,
};

const commentMain = {
  flex: 1,
};

const metaRow = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 10,
};

const nameText = {
  color: "#fff",
  fontSize: 15,
};

const commentText = {
  color: "#ddd",
  fontSize: 15,
  lineHeight: 1.6,
  margin: "0 0 12px",
};

const articleInfo = {
  color: "#888",
  fontSize: 13,
  marginBottom: 8,
};

const articleLink = {
  color: "#e11212",
  textDecoration: "none",
};

const dateText = {
  color: "#666",
  fontSize: 12,
};

const activeBadge = {
  background: "#0e3b18",
  color: "#7ee787",
  padding: "5px 9px",
  borderRadius: 6,
  fontSize: 12,
};

const inactiveBadge = {
  background: "#222",
  color: "#aaa",
  padding: "5px 9px",
  borderRadius: 6,
  fontSize: 12,
};

const actions = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const statusButton = {
  padding: "8px 12px",
  background: "#333",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const deleteButton = {
  padding: "8px 12px",
  background: "#8b0000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};
