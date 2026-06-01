export default function NewPostPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#fff",
        padding: "60px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <a
  href="/admin"
  style={{
    color: "#aaa",
    textDecoration: "none",
    display: "inline-block",
    marginBottom: "30px",
    fontSize: "18px",
  }}
>
  ← Хяналтын самбар руу буцах
</a>
        <h1 style={{ fontSize: "48px", marginBottom: "18px" }}>
          Шинэ нийтлэл нэмэх
        </h1>

        <p style={{ color: "#888", marginBottom: "40px" }}>
          Anzaar.mn редакцийн шинэ нийтлэл
        </p>

        <div style={{ display: "grid", gap: "22px" }}>
          <input placeholder="Нийтлэлийн гарчиг" style={inputStyle} />

          <select style={inputStyle}>
            <option>Ангилал сонгох</option>
            <option>Нийгэм</option>
            <option>Эдийн засаг</option>
            <option>Эрх зүй</option>
            <option>Эрүүл мэнд</option>
            <option>Боловсрол</option>
            <option>Сэтгэл зүй</option>
            <option>Спорт</option>
            <option>Соёл</option>
          </select>

          <input placeholder="Зургийн URL" style={inputStyle} />

          <textarea
            rows="18"
            placeholder="Нийтлэлийн агуулга..."
            style={inputStyle}
          />

          <button style={buttonStyle}>
            Нийтлэх
          </button>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px",
  background: "#111",
  border: "1px solid #222",
  color: "#fff",
  fontSize: "18px",
};

const buttonStyle = {
  background: "#d71919",
  color: "#fff",
  border: "none",
  padding: "18px",
  fontSize: "18px",
  cursor: "pointer",
};
