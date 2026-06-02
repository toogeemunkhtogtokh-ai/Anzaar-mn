import Link from "next/link";

const categories = [
  "Нийгэм",
  "Эдийн засаг",
  "Эрх зүй",
  "Эрүүл мэнд",
  "Боловсрол",
  "Сэтгэл зүй",
  "Спорт",
  "Соёл",
];

const featuredNews = [
  {
    id: 1,
    cat: "Нийгэм",
    title: "Өнөөдрийг анзаарч маргаашийг бүтээе",
    desc: "Нийгэмд болж буй үйл явдлыг энгийн, ойлгомжтой, хариуцлагатайгаар хүргэнэ.",
  },
  {
    id: 2,
    cat: "Эдийн засаг",
    title: "Эдийн засгийн шийдвэр иргэн бүрийн амьдралд нөлөөлдөг",
  },
  {
    id: 3,
    cat: "Эрх зүй",
    title: "Хууль бол зөвхөн мэргэжлийн хүмүүсийн сэдэв биш",
  },
  {
    id: 4,
    cat: "Боловсрол",
    title: "Боловсролын өөрчлөлтийг анзаарах цаг",
  },
  {
    id: 5,
    cat: "Сэтгэл зүй",
    title: "Сэтгэл зүй бол өдөр тутмын амьдралын нэг хэсэг",
  },
];

const oldNews = [
  ["Эрүүл мэнд", "Эрүүл амьдралын дадал жижиг зүйлээс эхэлдэг"],
  ["Спорт", "Монголын спортын ирээдүйг дэмжих орчин хэрэгтэй"],
  ["Соёл", "Соёл бол үндэстний дархлаа юм"],
  ["Нийгэм", "Хотын амьдралын жижиг асуудал том дохио өгдөг"],
  ["Эдийн засаг", "Жижиг бизнесүүд эдийн засгийн амьсгал болдог"],
];

export default function Home() {
  const hero = featuredNews[0];
  const sideNews = featuredNews.slice(1);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,.08)",
          padding: "22px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
          }}
        >
          <Link
            href="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            <span style={{ color: "#e11212" }}>Anzaar</span>.mn
          </Link>

          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              fontSize: 14,
            }}
          >
            {categories.map((item) => (
              <Link
                key={item}
                href={`/category/${encodeURIComponent(item)}`}
                style={{
                  color: "#ddd",
                  textDecoration: "none",
                }}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <section
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "34px 20px 0",
        }}
      >
        {/* HERO + 4 NEWS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr .95fr",
            gap: 22,
          }}
        >
          {/* HERO */}
          <Link
            href={`/article/${hero.id}`}
            style={{
              minHeight: 430,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              textDecoration: "none",
              color: "#fff",
              background:
                "linear-gradient(180deg, rgba(255,255,255,.06), rgba(0,0,0,.92)), radial-gradient(circle at top right, #333, #080808)",
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            <div
              style={{
                color: "#e11212",
                fontSize: 13,
                fontWeight: 800,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {hero.cat}
            </div>

            <h1
              style={{
                fontSize: 42,
                lineHeight: 1.08,
                margin: 0,
                maxWidth: 680,
              }}
            >
              {hero.title}
            </h1>

            <p
              style={{
                marginTop: 16,
                color: "#cfcfcf",
                fontSize: 17,
                lineHeight: 1.55,
                maxWidth: 620,
              }}
            >
              {hero.desc}
            </p>
          </Link>

          {/* SIDE 4 NEWS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {sideNews.map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.id}`}
                style={{
                  minHeight: 205,
                  padding: 18,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  textDecoration: "none",
                  color: "#fff",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.9)), radial-gradient(circle,#333,#090909)",
                  border: "1px solid rgba(255,255,255,.1)",
                }}
              >
                <div
                  style={{
                    color: "#e11212",
                    fontSize: 12,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {item.cat}
                </div>

                <h2
                  style={{
                    fontSize: 18,
                    lineHeight: 1.35,
                    margin: 0,
                  }}
                >
                  {item.title}
                </h2>
              </Link>
            ))}
          </div>
        </div>

        {/* INLINE BANNER */}
        <div
          style={{
            margin: "28px 0 34px",
            height: 110,
            border: "1px solid rgba(255,255,255,.12)",
            background:
              "linear-gradient(90deg, rgba(225,18,18,.22), rgba(255,255,255,.04))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#aaa",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Энд таны сурталчилгаа байрлана
        </div>

        {/* OLD NEWS */}
        <section>
          <h2
            style={{
              fontSize: 26,
              margin: "0 0 10px",
              borderLeft: "5px solid #e11212",
              paddingLeft: 12,
            }}
          >
            Өмнөх мэдээ
          </h2>

          <div>
            {oldNews.map(([cat, title], index) => (
              <Link
                key={index}
                href={`/article/${index + 10}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "92px 1fr",
                  gap: 16,
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(255,255,255,.08)",
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    height: 70,
                    background: "radial-gradient(circle,#444,#090909)",
                    border: "1px solid rgba(255,255,255,.08)",
                  }}
                />

                <div>
                  <div
                    style={{
                      color: "#e11212",
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {cat}
                  </div>

                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 17,
                      lineHeight: 1.35,
                    }}
                  >
                    {title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PARTNERS */}
        <section
          style={{
            marginTop: 44,
            padding: "28px 0",
            borderTop: "1px solid rgba(255,255,255,.08)",
          }}
        >
          <h2
            style={{
              fontSize: 22,
              marginBottom: 18,
            }}
          >
            Хамтрагч байгууллагууд
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
            }}
          >
            {["НССДС", "Anzaar Media", "Give TV", "UbZoog.mn"].map((p) => (
              <div
                key={p}
                style={{
                  height: 76,
                  border: "1px solid rgba(255,255,255,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#bbb",
                  background: "rgba(255,255,255,.03)",
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: 40,
          padding: "28px 20px",
          borderTop: "1px solid rgba(255,255,255,.08)",
          color: "#888",
          textAlign: "center",
          fontSize: 14,
        }}
      >
        © 2026 Anzaar.mn — Өнөөдрийг анзаарч маргаашийг бүтээе
      </footer>
    </main>
  );
}
