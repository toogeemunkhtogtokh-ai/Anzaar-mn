"use client";

import { useEffect, useState } from "react";

export default function EditPage({ params }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    const found = saved.find(
      (item) => item.id === Number(params.id)
    );

    setArticle(found);
  }, [params.id]);

  const handleSave = () => {
    const saved =
      JSON.parse(localStorage.getItem("anzaarArticles")) || [];

    const updated = saved.map((item) =>
      item.id === article.id ? article : item
    );

    localStorage.setItem(
      "anzaarArticles",
      JSON.stringify(updated)
    );

    alert("Нийтлэл амжилттай шинэчлэгдлээ");
  };

  if (!article) return <div>Уншиж байна...</div>;

  return (
    <main style={{ padding: 40, color: "#fff", background: "#000", minHeight: "100vh" }}>
      <h1>Нийтлэл засах</h1>

      <input
        value={article.title}
        onChange={(e) =>
          setArticle({ ...article, title: e.target.value })
        }
        style={input}
      />

      <textarea
        value={article.content}
        onChange={(e) =>
          setArticle({ ...article, content: e.target.value })
        }
        style={textarea}
      />

      <button onClick={handleSave} style={button}>
        Хадгалах
      </button>
    </main>
  );
}

const input = {
  width: "100%",
  padding: 12,
  marginBottom: 20,
};

const textarea = {
  width: "100%",
  height: 300,
  padding: 12,
  marginBottom: 20,
};

const button = {
  background: "#e11",
  color: "#fff",
  border: "none",
  padding: "12px 24px",
  cursor: "pointer",
};
