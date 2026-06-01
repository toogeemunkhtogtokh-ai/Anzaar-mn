import Link from "next/link";

export default function DynamicArticle({ params }) {
  const articles = {
    1: {
      category: "Нийгэм",
      title: "Харагдаж байгаа бүхэн үнэн биш",
      image: "/hero-main.png"
    },
    2: {
      category: "Эдийн засаг",
      title: "Инфляцын өсөлт: Бодит орлого юу хэлж байна вэ?",
      image: "/feature-1.png"
    },
    3: {
      category: "Эрх зүй",
      title: "Шинэ эрх зүйн хууль батлагдлаа",
      image: "/feature-1.png"
    }
  };

  const article = articles[params.id] || articles[1];

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
          {article.category}
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
