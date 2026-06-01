export default function Home() {
  const categories = [
    "Нийгэм",
    "Эдийн засаг",
    "Эрх зүй",
    "Эрүүл мэнд",
    "Боловсрол",
    "Сэтгэл зүй",
    "Спорт",
    "Соёл"
  ];

  const articles = [
    {
      title: "Өөрчлөлт хаанаас эхэлдэг вэ?",
      date: "2026.06.01"
    },
    {
      title: "Нийгмийн хөдөлгөөн ба ирээдүйн чиглэл",
      date: "2026.05.31"
    },
    {
      title: "Өмнөх шийдвэрүүд өнөөдөр хэрхэн нөлөөлж байна?",
      date: "2026.05.30"
    }
  ];

  return (
    <main style={{
      background:"#000",
      color:"#fff",
      minHeight:"100vh",
      padding:"40px",
      fontFamily:"serif"
    }}>

      <section style={{marginBottom:"80px"}}>
        <h1 style={{
          color:"#ff0000",
          fontSize:"52px"
        }}>
          Anzaar.mn
        </h1>

        <p style={{fontSize:"18px", color:"#ccc"}}>
          Өнөөдрийг анзаарч маргаашийг бүтээе
        </p>
      </section>

      <section style={{marginBottom:"60px"}}>
        <h2 style={{color:"#ff0000"}}>Онцлох нийтлэл</h2>
        <div style={{
          border:"1px solid #222",
          padding:"30px",
          marginTop:"20px"
        }}>
          Ирээдүйг харахын тулд өнөөдрийг анзаарах хэрэгтэй.
        </div>
      </section>

      <section style={{marginBottom:"60px"}}>
        <h2>Өмнөх мэдээнүүд</h2>
        {articles.map((article, i) => (
          <div key={i} style={{
            borderBottom:"1px solid #111",
            padding:"20px 0"
          }}>
            <div>{article.title}</div>
            <small style={{color:"#888"}}>
              {article.date}
            </small>
          </div>
        ))}
      </section>

      <section style={{marginBottom:"60px"}}>
        <h2>Категори</h2>
        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(4,1fr)",
          gap:"15px",
          marginTop:"20px"
        }}>
          {categories.map((cat,i)=>(
            <div key={i} style={{
              border:"1px solid #222",
              padding:"20px",
              textAlign:"center"
            }}>
              {cat}
            </div>
          ))}
        </div>
      </section>

      <section style={{
        border:"1px dashed #ff0000",
        padding:"40px",
        textAlign:"center",
        marginBottom:"60px"
      }}>
        Энд таны сурталчилгаа байрлана
      </section>

      <footer style={{
        borderTop:"1px solid #111",
        paddingTop:"30px",
        color:"#666"
      }}>
        © 2026 Anzaar.mn
      </footer>

    </main>
  );
}
