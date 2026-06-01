export default function AdminPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        padding: "60px 40px",
        fontFamily: "'Times New Roman', serif"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}
      >
        <h1
          style={{
            fontSize: "54px",
            marginBottom: "20px"
          }}
        >
          Anzaar Admin
        </h1>

        <p
          style={{
            color: "#888",
            marginBottom: "50px"
          }}
        >
          Шинэ нийтлэл оруулах хэсэг
        </p>

        <div
          style={{
            display: "grid",
            gap: "24px"
          }}
        >
          <input
            placeholder="Гарчиг"
            style={inputStyle}
          />

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

          <input
            placeholder="Зургийн URL"
            style={inputStyle}
          />

          <textarea
            placeholder="Нийтлэлийн агуулга..."
            rows="12"
            style={inputStyle}
          />

          <button
            style={{
              background: "#b30000",
              color: "#fff",
              border: "none",
              padding: "18px",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
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
  border: "1px solid #333",
  color: "#fff",
  fontSize: "18px"
};
