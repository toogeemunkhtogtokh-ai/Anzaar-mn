export default function ArticlePage() {
  return (
    <main style={{
      background:"#000",
      color:"#fff",
      minHeight:"100vh",
      fontFamily:"'Times New Roman', serif"
    }}>
      <section style={{
        maxWidth:900,
        margin:"0 auto",
        padding:"80px 24px"
      }}>
        <div style={{
          color:"#e11212",
          fontFamily:"Arial",
          fontSize:13,
          fontWeight:700,
          textTransform:"uppercase",
          marginBottom:18
        }}>
          Нийгэм
        </div>

        <h1 style={{
          fontSize:56,
          lineHeight:1.08,
          margin:"0 0 18px"
        }}>
          Харагдаж байгаа бүхэн үнэн биш
        </h1>

        <div style={{
          color:"#888",
          fontFamily:"Arial",
          fontSize:14,
          marginBottom:36
        }}>
          2026.06.18 · Anzaar.mn
        </div>

        <div style={{
          height:420,
          border:"1px solid rgba(255,255,255,.12)",
          backgroundImage:"url('/hero-main.png')",
          backgroundSize:"cover",
          backgroundPosition:"center",
          marginBottom:44
        }} />

        <article style={{
          fontSize:21,
          lineHeight:1.85,
          color:"#ddd"
        }}>
          <p>
            Нийгмийн мэдээллийн орчин бидний бодол, хандлага, шийдвэр гаргалтад
            өдөр бүр нөлөөлж байна.
          </p>

          <p>
            Бид харж байгаа зүйлээ бодит үнэн гэж хүлээж авах хандлагатай.
            Гэвч дэлгэц дээр харагдаж буй мэдээлэл бүр бүрэн үнэн байдаггүй.
          </p>

          <p>
            Тиймээс мэдээллийг зөвхөн хурдан унших биш, эх сурвалж, нөхцөл,
            зорилго, агуулгын цаад санааг хамтад нь анзаарах шаардлагатай.
          </p>
        </article>
      </section>
    </main>
  );
}
