import Image from "next/image";
export default function Home() {
  const nav = [
    "Нүүр",
    "Нийгэм",
    "Эдийн засаг",
    "Эрх зүй",
    "Эрүүл мэнд",
    "Боловсрол",
    "Сэтгэл зүй",
    "Спорт",
    "Соёл"
  ];

  const featured = [
    ["Эдийн засаг", "Инфляцын өсөлт: Бодит орлого юу хэлж байна вэ?", "2026.06.17"],
    ["Эрх зүй", "Шинэ эрх зүйн хууль батлагдлаа: Иргэд бидэнд ямар өөрчлөлт гарах вэ?", "2026.06.16"],
    ["Эрүүл мэнд", "Өглөөний 30 минут таны амьдралыг өөрчилж чадна", "2026.06.15"]
  ];

  const previous = [
    ["Нийгэм", "Агаарын бохирдол буурахгүй байгаагийн 5 шалтгаан", "2026.06.14"],
    ["Эдийн засаг", "Монголын хөрөнгийн зах зээл: 2026 оны тойм", "2026.06.14"],
    ["Боловсрол", "Сурагчдын унших чадвар яагаад буурч байна вэ?", "2026.06.13"],
    ["Соёл", "Соёл урлаг нийгмийн сэтгэл зүйд хэрхэн нөлөөлдөг вэ?", "2026.06.13"],
    ["Эрх зүй", "Шүүхийн шинэчлэл: Иргэдэд үзүүлэх нөлөө", "2026.06.12"],
    ["Спорт", "Монголын спортын шинэ үе", "2026.06.11"]
  ];

  const cardStyle = {
    border: "1px solid rgba(255,255,255,.1)",
    background: "linear-gradient(180deg,#111,#050505)",
    padding: 22
  };

  return (
    <main style={{
      background:"#000",
      color:"#fff",
      minHeight:"100vh",
      fontFamily:"Georgia, serif"
    }}>
      <header style={{
        borderBottom:"1px solid rgba(255,255,255,.1)",
        padding:"28px 48px"
      }}>
        <div style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          gap:30
        }}>
          <div>
            <div style={{
              fontSize:34,
              fontWeight:700,
              color:"#fff"
            }}>
<Image
  src="/anzaar-logo-horizontal.png"
  alt="Anzaar.mn Logo"
  width={560}
  height={140}
/>
            </div>

          <nav style={{
            display:"flex",
            gap:24,
            fontSize:14,
            fontFamily:"Arial",
            textTransform:"uppercase",
            whiteSpace:"nowrap"
          }}>
            {nav.map((item, i) => (
              <span key={item} style={{
                color:i===0 ? "#fff" : "#aaa",
                borderBottom:i===0 ? "2px solid #e11212" : "none",
                paddingBottom:8
              }}>
                {item}
              </span>
            ))}
          </nav>
        </div>
      </header>

      <section style={{
        maxWidth:1240,
        margin:"0 auto",
        padding:"42px 24px"
      }}>
        <div style={{
          display:"grid",
          gridTemplateColumns:"1fr 320px",
          gap:28
        }}>
          <div>
            <div style={{
              display:"flex",
              alignItems:"center",
              gap:12,
              marginBottom:20
            }}>
              <span style={{
                width:34,
                height:2,
                background:"#e11212",
                display:"block"
              }} />
              <h1 style={{
                fontSize:42,
                margin:0
              }}>
                Өнөөдрийн онцлох
              </h1>
            </div>

            <article style={{
              ...cardStyle,
              minHeight:430,
              display:"flex",
              flexDirection:"column",
              justifyContent:"flex-end",
              background:"linear-gradient(180deg,rgba(20,20,20,.2),#050505), radial-gradient(circle at 70% 30%, #333, #050505 55%)"
            }}>
              <div style={{
                color:"#e11212",
                fontSize:13,
                fontFamily:"Arial",
                fontWeight:700,
                textTransform:"uppercase"
              }}>
                Нийгэм
              </div>
              <h2 style={{
                fontSize:52,
                lineHeight:1.05,
                maxWidth:720,
                margin:"14px 0"
              }}>
                Харагдаж байгаа бүхэн үнэн биш
              </h2>
              <p style={{
                fontSize:20,
                color:"#ccc",
                maxWidth:650,
                lineHeight:1.6,
                margin:0
              }}>
                Нийгмийн мэдээллийн орчин бидний бодлыг хэрхэн чиглүүлж байна вэ?
              </p>
              <div style={{
                marginTop:22,
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                color:"#999",
                fontSize:14,
                fontFamily:"Arial"
              }}>
                <span>2026.06.18</span>
                <span style={{color:"#fff"}}>Унших →</span>
              </div>
            </article>
          </div>

          <aside style={{
            ...cardStyle,
            minHeight:560,
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            textAlign:"center"
          }}>
            <div>
              <div style={{
                color:"#fff",
                fontSize:24,
                fontFamily:"Arial",
                fontWeight:700,
                textTransform:"uppercase",
                lineHeight:1.5
              }}>
                Энд таны сурталчилгаа байрлана
              </div>
              <div style={{
                marginTop:16,
                color:"#777",
                fontFamily:"Arial",
                fontSize:13
              }}>
                Premium banner · 300 × 600
              </div>
            </div>
          </aside>
        </div>

        <section style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
          gap:22,
          marginTop:28
        }}>
          {featured.map(([cat,title,date]) => (
            <article key={title} style={cardStyle}>
              <div style={{
                height:160,
                marginBottom:20,
                background:"radial-gradient(circle at center,#333,#0a0a0a)",
                border:"1px solid rgba(255,255,255,.08)"
              }} />
              <div style={{
                color:"#e11212",
                fontSize:12,
                fontFamily:"Arial",
                fontWeight:700,
                textTransform:"uppercase"
              }}>
                {cat}
              </div>
              <h3 style={{
                fontSize:22,
                lineHeight:1.35,
                minHeight:88
              }}>
                {title}
              </h3>
              <small style={{
                color:"#777",
                fontFamily:"Arial"
              }}>
                {date}
              </small>
            </article>
          ))}
        </section>

        <section style={{
          marginTop:32,
          ...cardStyle,
          minHeight:130,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          textAlign:"center"
        }}>
          <div>
            <div style={{
              color:"#fff",
              fontSize:22,
              fontFamily:"Arial",
              fontWeight:700,
              textTransform:"uppercase",
              letterSpacing:2
            }}>
              Энд таны сурталчилгаа байрлана
            </div>
            <div style={{
              marginTop:10,
              color:"#777",
              fontFamily:"Arial",
              fontSize:13
            }}>
              Inline banner · 1200 × 150
            </div>
          </div>
        </section>

        <section style={{
          marginTop:50
        }}>
          <div style={{
            display:"flex",
            alignItems:"center",
            gap:12,
            marginBottom:24
          }}>
            <span style={{
              width:34,
              height:2,
              background:"#e11212",
              display:"block"
            }} />
            <h2 style={{
              fontSize:34,
              margin:0
            }}>
              Өмнөх мэдээнүүд
            </h2>
          </div>

          <div style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            gap:"0 40px"
          }}>
            {previous.map(([cat,title,date]) => (
              <article key={title} style={{
                display:"grid",
                gridTemplateColumns:"92px 1fr",
                gap:16,
                padding:"18px 0",
                borderBottom:"1px solid rgba(255,255,255,.08)"
              }}>
                <div style={{
                  height:70,
                  background:"radial-gradient(circle,#444,#090909)",
                  border:"1px solid rgba(255,255,255,.08)"
                }} />
                <div>
                  <div style={{
                    color:"#e11212",
                    fontSize:12,
                    fontFamily:"Arial",
                    fontWeight:700,
                    textTransform:"uppercase"
                  }}>
                    {cat}
                  </div>
                  <div style={{
                    marginTop:6,
                    fontSize:17,
                    lineHeight:1.35
                  }}>
                    {title}
                  </div>
                  <small style={{
                    display:"block",
                    marginTop:8,
                    color:"#777",
                    fontFamily:"Arial"
                  }}>
                    {date}
                  </small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={{
          marginTop:52,
          borderTop:"1px solid rgba(255,255,255,.1)",
          borderBottom:"1px solid rgba(255,255,255,.1)",
          padding:"28px 0"
        }}>
          <div style={{
            color:"#aaa",
            fontSize:13,
            fontFamily:"Arial",
            textTransform:"uppercase",
            marginBottom:18
          }}>
            Хамтрагч байгууллагууд
          </div>
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(4,1fr)",
            gap:14
          }}>
            {[1,2,3,4].map((i)=>(
              <div key={i} style={{
                border:"1px solid rgba(255,255,255,.1)",
                padding:"24px 12px",
                textAlign:"center",
                color:"#777",
                fontSize:12,
                fontFamily:"Arial",
                textTransform:"uppercase"
              }}>
                Энд хамтрагч байгууллагын нэр байрлана
              </div>
            ))}
          </div>
        </section>
      </section>

      <footer style={{
        borderTop:"1px solid rgba(255,255,255,.1)",
        padding:"34px 48px",
        color:"#666",
        fontFamily:"Arial",
        fontSize:13
      }}>
        © 2026 Anzaar.mn. Бүх эрх хуулиар хамгаалагдсан.
      </footer>
    </main>
  );
}
