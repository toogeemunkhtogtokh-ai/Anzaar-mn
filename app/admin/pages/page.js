"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const defaultPages = [
  {
    id: "about",
    title: "Бидний тухай",
    slug: "about",
    content:
      "Anzaar.mn бол нийгэм, эдийн засаг, эрх зүй, боловсрол, сэтгэл зүй, спорт, соёлын чиглэлээр мэдээ, нийтлэл хүргэх платформ юм.",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "contact",
    title: "Холбоо барих",
    slug: "contact",
    content:
      "Anzaar.mn редакцтай холбогдох мэдээлэл энд байрлана.",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "advertising",
    title: "Зар сурталчилгаа байршуулах",
    slug: "advertising",
    content:
      "Anzaar.mn сайтад зар сурталчилгаа байршуулах нөхцөл, боломжуудын талаарх мэдээлэл энд байрлана.",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "editorial-policy",
    title: "Редакцийн бодлого",
    slug: "editorial-policy",
    content:
      "Anzaar.mn редакцийн баримтлах бодлого, нийтлэлийн зарчим энд байрлана.",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "privacy-policy",
    title: "Нууцлалын бодлого",
    slug: "privacy-policy",
    content:
      "Хэрэглэгчийн мэдээлэл, нууцлалтай холбоотой бодлого энд байрлана.",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "terms",
    title: "Үйлчилгээний нөхцөл",
    slug: "terms",
    content:
      "Anzaar.mn сайтыг ашиглах үйлчилгээний нөхцөл энд байрлана.",
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function AdminPagesPage() {
  const [pages, setPages] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    active: true,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("anzaarPages")) || null;

    if (saved && Array.isArray(saved)) {
      setPages(saved);
    } else {
      localStorage.setItem("anzaarPages", JSON.stringify(defaultPages));
      setPages(defaultPages);
    }
  }, []);

  const savePages = (items) => {
    localStorage.setItem("anzaarPages", JSON.stringify(items));
    setPages(items);
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      slug: "",
      content: "",
      active: true,
    });
  };

  const makeSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u0400-\u04ff\s-]/gi, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (value) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: prev.slug ? prev.slug : makeSlug(value),
    }));
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      alert("Хуудасны гарчиг оруулна уу.");
      return;
    }

    if (!form.slug.trim()) {
      alert("Slug оруулна уу.");
      return;
    }

    if (!form.content.trim()) {
      alert("Хуудасны агуулга оруулна уу.");
      return;
    }

    const normalizedSlug = makeSlug(form.slug);

    const slugExists = pages.some(
      (page) =>
        page.slug === normalizedSlug &&
        String(page.id) !== String(editingId)
    );

    if (slugExists) {
      alert("Энэ slug аль хэдийн ашиглагдаж байна.");
      return;
    }

    if (editingId) {
      const updated = pages.map((page) =>
        String(page.id) === String(editingId)
          ? {
              ...page,
              title: form.title.trim(),
              slug: normalizedSlug,
              content: form.content.trim(),
              active: form.active,
              updatedAt: new Date().toISOString(),
            }
          : page
      );

      savePages(updated);
      resetForm();
      alert("Хуудас амжилттай шинэчлэгдлээ.");
      return;
    }

    const newPage = {
      id: Date.now(),
      title: form.title.trim(),
      slug: normalizedSlug,
      content: form.content.trim(),
      active: form.active,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    savePages([newPage, ...pages]);
    resetForm();
    alert("Хуудас амжилттай нэмэгдлээ.");
  };

  const handleEdit = (page) => {
    setEditingId(page.id);
    setForm({
      title: page.title || "",
      slug: page.slug || "",
      content: page.content || "",
      active: page.active !== false,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleActive = (id) => {
    const updated = pages.map((page) =>
      String(page.id) === String(id)
        ? {
            ...page,
            active: page.active === false ? true : false,
            updatedAt: new Date().toISOString(),
          }
        : page
    );

    savePages(updated);
  };

  const handleDelete = (id) => {
    const confirmed = confirm("Энэ хуудсыг устгах уу?");
    if (!confirmed) return;

    const updated = pages.filter(
      (page) => String(page.id) !== String(id)
    );

    savePages(updated);

    if (String(editingId) === String(id)) {
      resetForm();
    }
  };

  const resetDefaultPages = () => {
    const confirmed = confirm(
      "Үндсэн хуудсуудыг сэргээх үү? Одоогийн өөрчлөлтүүд солигдож магадгүй."
    );

    if (!confirmed) return;

    savePages(defaultPages);
    resetForm();
  };

  const filteredPages = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return pages;

    return pages.filter((page) => {
      return (
        page.title?.toLowerCase().includes(keyword) ||
        page.slug?.toLowerCase().includes(keyword) ||
        page.content?.toLowerCase().includes(keyword)
      );
    });
  }, [pages, search]);

  const activeCount = pages.filter((page) => page.active !== false).length;
  const inactiveCount = pages.filter((page) => page.active === false).length;

  return (
    <main style={pageStyle}>
      <div style={container}>
        <Link href="/admin" style={backLink}>
          ← Хяналтын самбар руу буцах
        </Link>

        <div style={topHeader}>
          <div>
            <h1 style={titleStyle}>Хуудас удирдлага</h1>
            <p style={desc}>
              Нийт {pages.length} хуудас байна. Идэвхтэй: {activeCount},
              идэвхгүй: {inactiveCount}
            </p>
          </div>

          <button onClick={resetDefaultPages} style={resetButton}>
            Үндсэн хуудсууд сэргээх
          </button>
        </div>

        <div style={layout}>
          <section style={formBox}>
            <h2 style={boxTitle}>
              {editingId ? "Хуудас засах" : "Шинэ хуудас"}
            </h2>

            <label style={label}>Гарчиг</label>
            <input
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Жишээ: Бидний тухай"
              style={input}
            />

            <label style={label}>Slug</label>
            <input
              value={form.slug}
              onChange={(e) =>
                setForm({
                  ...form,
                  slug: makeSlug(e.target.value),
                })
              }
              placeholder="about"
              style={input}
            />

            <p style={hint}>
              Public URL:{" "}
              <span style={{ color: "#fff" }}>/page/{form.slug || "slug"}</span>
            </p>

            <label style={label}>Агуулга</label>
            <textarea
              value={form.content}
              onChange={(e) =>
                setForm({
                  ...form,
                  content: e.target.value,
                })
              }
              placeholder="Хуудасны агуулга..."
              style={textarea}
            />

            <label style={checkboxBox}>
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) =>
                  setForm({
                    ...form,
                    active: e.target.checked,
                  })
                }
                style={checkboxInput}
              />
              <span>Идэвхтэй хуудас</span>
            </label>

            <div style={formActions}>
              <button onClick={handleSave} style={saveButton}>
                {editingId ? "Шинэчлэх" : "Хадгалах"}
              </button>

              {editingId && (
                <button onClick={resetForm} style={cancelButton}>
                  Болих
                </button>
              )}
            </div>
          </section>

          <section style={listBox}>
            <div style={listHeader}>
              <div>
                <h2 style={boxTitle}>Хуудсууд</h2>
                <p style={hint}>Static content pages</p>
              </div>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Гарчиг, slug, агуулгаар хайх..."
              style={searchInput}
            />

            {filteredPages.length === 0 ? (
              <div style={emptyBox}>Хуудас олдсонгүй.</div>
            ) : (
              <div style={pageList}>
                {filteredPages.map((page) => (
                  <div key={page.id} style={pageCard}>
                    <div style={pageInfo}>
                      <h3 style={pageTitle}>{page.title}</h3>

                      <div style={metaRow}>
                        <code style={codeText}>/page/{page.slug}</code>

                        <span
                          style={
                            page.active === false
                              ? inactiveBadge
                              : activeBadge
                          }
                        >
                          {page.active === false ? "Идэвхгүй" : "Идэвхтэй"}
                        </span>
                      </div>

                      <p style={excerpt}>
                        {page.content || "Агуулга оруулаагүй байна."}
                      </p>
                    </div>

                    <div style={actions}>
                      <Link href={`/page/${page.slug}`} style={viewLink}>
                        Үзэх
                      </Link>

                      <button
                        onClick={() => handleEdit(page)}
                        style={editButton}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => toggleActive(page.id)}
                        style={statusButton}
                      >
                        {page.active === false ? "ON" : "OFF"}
                      </button>

                      <button
                        onClick={() => handleDelete(page.id)}
                        style={deleteButton}
                      >
                        Устгах
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

const pageStyle = {
  background: "#050505",
  color: "#fff",
  minHeight: "100vh",
  padding: 60,
  fontFamily: "Arial, sans-serif",
};

const container = {
  maxWidth: 1400,
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

const resetButton = {
  background: "#222",
  color: "#fff",
  border: "1px solid #444",
  padding: "12px 18px",
  cursor: "pointer",
};

const layout = {
  display: "grid",
  gridTemplateColumns: "420px 1fr",
  gap: 30,
};

const formBox = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: 24,
  alignSelf: "start",
};

const listBox = {
  background: "linear-gradient(145deg,#111,#080808)",
  border: "1px solid #222",
  padding: 24,
};

const boxTitle = {
  margin: 0,
  fontSize: 22,
};

const label = {
  display: "block",
  marginTop: 16,
  marginBottom: 8,
  color: "#aaa",
  fontSize: 13,
  textTransform: "uppercase",
};

const input = {
  width: "100%",
  padding: 13,
  background: "#0b0b0b",
  border: "1px solid #333",
  color: "#fff",
  boxSizing: "border-box",
  fontSize: 14,
};

const textarea = {
  ...input,
  minHeight: 260,
  lineHeight: 1.7,
};

const hint = {
  color: "#777",
  fontSize: 13,
  lineHeight: 1.5,
  marginTop: 12,
};

const checkboxBox = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  background: "#0b0b0b",
  border: "1px solid #222",
  padding: 14,
  marginTop: 16,
  color: "#fff",
  fontSize: 14,
};

const checkboxInput = {
  width: 18,
  height: 18,
};

const formActions = {
  display: "flex",
  gap: 10,
  marginTop: 20,
};

const saveButton = {
  flex: 1,
  padding: 14,
  background: "#d71919",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
};

const cancelButton = {
  padding: "14px 18px",
  background: "#222",
  color: "#fff",
  border: "1px solid #444",
  cursor: "pointer",
};

const listHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 18,
};

const searchInput = {
  width: "100%",
  padding: 14,
  background: "#0b0b0b",
  border: "1px solid #333",
  color: "#fff",
  boxSizing: "border-box",
  fontSize: 14,
  marginBottom: 18,
};

const emptyBox = {
  color: "#777",
  border: "1px solid #222",
  padding: 20,
};

const pageList = {
  display: "grid",
  gap: 14,
};

const pageCard = {
  display: "flex",
  gap: 18,
  justifyContent: "space-between",
  border: "1px solid #222",
  background: "#080808",
  padding: 18,
};

const pageInfo = {
  flex: 1,
};

const pageTitle = {
  margin: "0 0 10px",
  fontSize: 20,
};

const metaRow = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
  marginBottom: 10,
};

const codeText = {
  background: "#000",
  border: "1px solid #222",
  color: "#aaa",
  padding: "5px 8px",
};

const excerpt = {
  color: "#777",
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
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

const actions = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const viewLink = {
  color: "#fff",
  textDecoration: "none",
  border: "1px solid #333",
  padding: "8px 12px",
  textAlign: "center",
};

const editButton = {
  background: "#222",
  color: "#fff",
  border: "1px solid #444",
  padding: "8px 12px",
  cursor: "pointer",
};

const statusButton = {
  background: "#333",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
};

const deleteButton = {
  background: "#8b0000",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
};
