import Link from "next/link";

export default function AdminPage() {
  const posts = [
    ["Хүмүүс яагаад худал дүр бүтээдэг вэ?", "Сэтгэл зүй", "2024.06.15", "1.2K"],
    ["Шинэ эрх зүйн хууль батлагдлаа", "Эрх зүй", "2024.06.14", "856"],
    ["Өглөөний 30 минут таны амьдралыг өөрчилж чадна", "Эрүүл мэнд", "2024.06.14", "1.8K"],
    ["Монголын хөрөнгийн зах зээл: 2024 оны тойм", "Эдийн засаг", "2024.06.13", "642"],
    ["Сурагчдын унших чадвар яагаад буурч байна вэ?", "Боловсрол", "2024.06.13", "1.1K"],
  ];

  return (
    <main style={page}>
      <aside style={sidebar}>
        <h1 style={logo}>Anzaar.mn</h1>
        <p style={slogan}>Өнөөдрийг анзаарч,<br />маргаашийг бүтээе</p>

        {["Хяналтын самбар", "Нийтлэлүүд", "Ангилал", "Хуудаснууд", "Сэтгэгдлүүд", "Медиа сан", "Баннерууд", "Хамтрагч байгууллагууд", "Хэрэглэгчид", "Тохиргоо"].map((item, i) => (
          <div key={item} style={i === 0 ? activeMenu : menu}>{item}</div>
        ))}

        <div style={{ marginTop: "auto", color: "#aaa" }}>Гарах</div>
      </aside>

      <section style={content}>
        <h2 style={title}>Хяналтын самбар</h2>

        <div style={statsGrid}>
          <Stat label="Нийт нийтлэл" value="128" color="#e22" />
          <Stat label="Нийт хандалт" value="215,430" color="#7b61ff" />
          <Stat label="Сэтгэгдэл" value="342" color="#7b61ff" />
          <Stat label="Бүртгэлтэй гишүүд" value="1,250" color="#c7962b" />
        </div>

        <div style={mainGrid}>
          <section style={card}>
            <div style={sectionHead}>
              <h3>Сүүлийн нийтлэлүүд</h3>
              <button style={redButton}>Шинэ нийтлэл нэмэх</button>
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
                {posts.map((post, i) => (
                  <tr key={i} style={row}>
                    <td>{post[0]}</td>
                    <td style={{ color: "#ff3333" }}>{post[1]}</td>
                    <td>{post[2]}</td>
                    <td>{post[3]}</td>
                    <td><span style={status}>Нийтлэгдсэн</span></td>
                    <td>👁 ✎ 🗑</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <aside>
            <Box title="Түргэн үйлдлүүд" items={["＋ Шинэ нийтлэл нэмэх", "▧ Баннер нэмэх", "♙ Хамтрагч нэмэх", "▢ Хуудас үүсгэх"]} />
            <Box title="Нийтлэлийн ангилал" items={["Нийгэм — 28", "Эдийн засаг — 24", "Эрх зүй — 18", "Эрүүл мэнд — 16", "Боловсрол — 14", "Сэтгэл зүй — 12", "Спорт — 8", "Соёл — 6"]} />
            <Box title="Системийн мэдээлэл" items={["Системийн хувилбар — 1.0.0", "PHP хувилбар — 8.2.12", "Сүүлийн нөөцлөлт — 2024.06.15"]} />
          </aside>
        </div>

        <div style={bottomGrid}>
          <Box title="Хамгийн их хандалттай нийтлэлүүд" items={["1. Хүмүүс яагаад худал дүр бүтээдэг вэ? — 1.2K", "2. Өглөөний 30 минут — 1.1K", "3. Агаарын бохирдол — 986", "4. Шинэ эрх зүйн хууль — 856", "5. Хөрөнгийн зах зээл — 642"]} />
          <Box title="Сүүлийн сэтгэгдлүүд" items={["Болд: 10 минутын өмнө", "Сараа: 25 минутын өмнө", "Отгон: 1 цагийн өмнө"]} />
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
        <p key={item} style={boxItem}>{item}</p>
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

const logo = {
  fontFamily: "'Times New Roman', serif",
  fontSize: 34,
  marginBottom: 10,
};

const slogan = {
  color: "#aaa",
  lineHeight: 1.6,
  marginBottom: 28,
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
};

const bottomGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 18,
  marginTop: 18,
};
