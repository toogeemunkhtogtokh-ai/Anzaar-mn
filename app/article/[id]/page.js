import { articles } from "../../../lib/articles";
import Link from "next/link";

export default function DynamicArticle({ params }) {
  
  const article = articles.find((item) => item.id === Number(params.id));
if (!article) {
  return (
    <main style={{ background: "#000", color: "#fff", minHeight: "100vh", padding: 40 }}>
      Нийтлэл олдсонгүй
    </main>
  );
}
  return (
    <main style={{
      background:"#000",
      color:"#fff",
      minHeight:"100vh",
      fontFamily:"Times New Roman, serif"
    }}>
      <section style={{
        maxWidth:900,
        margin:"0 auto",
        padding:"80px 24px"
      }}>

        <Link href="/" style={{
          color:"#888",
          textDecoration:"none"
        }}>
          ← Нүүр хуудас
        </Link>

        <div style={{
          color:"#e11212",
          marginTop:30,
          fontFamily:"Arial"
        }}>
          {article.label}
        </div>

        <h1 style={{
          fontSize:56,
          lineHeight:1.08
        }}>
          {article.title}
        </h1>

        <img
          src={article.image}
          style={{
            width:"100%",
            marginTop:32
          }}
        />

      </section>
    </main>
  );
}
