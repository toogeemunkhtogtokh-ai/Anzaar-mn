import Link from "next/link";

export default function CategoryPage({ params }) {
  const names = {
    niigem: "Нийгэм",
    ediinzasag: "Эдийн засаг",
    erhzui: "Эрх зүй",
    eruulmend: "Эрүүл мэнд",
    bolovsrol: "Боловсрол",
    setgelzui: "Сэтгэл зүй",
    sport: "Спорт",
    soyol: "Соёл"
  };

  const title = names[params.id] || "Ангилал";

  return (
    <main style={{
      background:"#000",
      color:"#fff",
      minHeight:"100vh",
      fontFamily:"'Times New Roman', serif"
    }}>
      <section style={{
        maxWidth:1100,
        margin:"0 auto",
        padding:"80px 24px"
      }}>
        <Link href="/" style={{
          color:"#888",
          textDecoration:"none",
          fontFamily:"Arial"
        }}>
          ← Нүүр хуудас
        </Link>

        <h1 style={{
          fontSize:56,
          marginTop:40
        }}>
          {title}
        </h1>

        <p style={{
          color:"#aaa",
          fontSize:20
        }}>
          Энэ ангиллын мэдээнүүд энд харагдана.
        </p>
      </section>
    </main>
  );
}
