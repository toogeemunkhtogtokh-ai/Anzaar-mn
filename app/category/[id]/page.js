import { articles } from "../../../lib/articles";
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
  const filtered = articles.filter((item) => item.category === params.id);

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
          marginTop:40,
          marginBottom:16
        }}>
          {title}
        </h1>

        <p style={{
          color:"#aaa",
          fontSize:20,
          marginBottom:44
        }}>
          Энэ ангиллын мэдээнүүд
        </p>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:24
        }}>
          {filtered.length > 0 ? filtered.map((item) => (
            <Link
              key={item.id}
              href={`/article/${item.id}`}
              style={{
                textDecoration:"none",
                color:"inherit"
              }}
            >
              <article style={{
                border:"1px solid rgba(255,255,255,.12)",
                background:"linear-gradient(180deg,#111,#050505)",
                padding:22,
                minHeight:390
              }}>
                <div style={{
                  height:170,
                  backgroundImage:`url(${item.image})`,
                  backgroundSize:"cover",
                  backgroundPosition:"center",
                  border:"1px solid rgba(255,255,255,.08)",
                  marginBottom:22
                }} />

                <div style={{
                  color:"#e11212",
                  fontFamily:"Arial",
                  fontSize:12,
                  fontWeight:700,
                  textTransform:"uppercase"
                }}>
                  {item.label}
                </div>

                <h2 style={{
                  fontSize:28,
                  lineHeight:1.25,
                  marginTop:14
                }}>
                  {item.title}
                </h2>

                <div style={{
                  color:"#777",
                  fontFamily:"Arial",
                  fontSize:13,
                  marginTop:24
                }}>
                  {item.date}
                </div>
              </article>
            </Link>
          )) : (
            <div style={{
              color:"#777",
              fontFamily:"Arial",
              border:"1px solid rgba(255,255,255,.1)",
              padding:28
            }}>
              Энэ ангилалд одоогоор мэдээ нэмэгдээгүй байна.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
