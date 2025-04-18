import Link from "next/link";
export default function UpdateNew() {
  const newsList = [
    {
      title: "แพตช์โน้ต VALORANT 10.07",
      img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/1c1776bd1bdd921061a53953d81a393ef69ce633-1920x1080.jpg?auto=format&fit=fill&q=80&w=1184",
      description: "การแก้ไขบั๊กสำหรับเอเจนท์และ UI, มุมมองไทม์ไลน์ใหม่สำหรับคอนโซล และอื่น ๆ อีกมากมาย",
      tags: ["Update", "Fix"],
      slug: "patch-10-07",
    },
    {
      title: "VALORANT Maha Songkran 2025 ความสนุกฉลองสงกรานต์จัดเต็มตลอดเมษายนนี้ ก็มาดิ!",
      img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/10340c95d06d354da1fd2f5d6a2e438f2758134b-3840x2160.jpg?auto=format&fit=fill&q=80&w=1184",
      description: "ชวนวัยรุ่นวาโลลงแข่งทัวร์นาเมนต์ชิงเงิน 250,000 บาท พร้อมตำแหน่งแชมป์แห่งปี!",
      tags: ["Comunity", "New"],
      slug: "valorant-maha-songkran-2025",
    },
    {
      title: "April Fools: เผยโฉม Smite 2",
      img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/2b0e7b3491c9ad54a5f508294d7d8f5c7be78bc9-1920x1080.jpg?auto=format&fit=fill&q=80&w=1184",
      description: "จริงจังไม่จิงโจ้ สกินที่เจ๋งที่สุดกลับมาแล้วและดียิ่งกว่าที่เคย!",
      tags: ["Update", "Fun"],
      slug: "april-fools-smite-2-reveal",
    },
    {
      title: "แพตช์โน้ต VALORANT 10.06",
      img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/f8d663f096bd319dffdc300edcfc2185fa8a41c5-1920x1080.jpg?auto=format&fit=fill&q=80&w=1184",
      description: "กลไกใหม่และบัฟสำหรับ KAY/O รวมถึงการแก้ไขบั๊กอีกมากมาย!",
      tags: ["Update", "Fix"],
      slug: "patch-10-06",
    },
    {
      title: "Masters Toronto: รายละเอียดเกี่ยวกับการจำหน่ายบัตรเข้าชมการแข่งขันสด",
      img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/e9a783f5d8f6a11792ef5eb090d78da605cb1655-1920x1080.jpg?auto=format&fit=max&w=1920",
      description: "เรารู้สึกยินดีเป็นอย่างยิ่งที่จะประกาศให้ทราบว่าบัตรเข้าชม VALORANT Masters Toronto จะวางจำหน่ายตั้งแต่วันที่ 25 มีนาคม เวลา 21:00 น. (ตามเวลาประเทศไทย) เป็นต้นไป",
      tags: ["Esport", "Event"],
      slug: "masters-toronto-2025",
    },
    {
      title: "แพตช์โน้ต VALORANT 10.04",
      img: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/da3deddfcad907ae5e7581848ecfd724208d9b07-1920x1080.jpg?auto=format&fit=fill&q=80&w=1184",
      description: "Duelist ใหม่: Waylay, อัปเดตที่สำคัญสำหรับเอเจนท์ต่าง ๆ, การหมุนเวียนแผนที่ใหม่, อัปเดตสำหรับ Ascent และอื่น ๆ อีกมากมาย",
      tags: ["Update", "New"],
      slug: "patch-10-04",
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 rounded-lg bg-[#0F1923]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsList.map((news, index) => (
          <Link key={index} href={`/Newss/${news.slug}`} className="flex justify-center ">
            <div className="card bg-white w-80 shadow-sm hover:cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition">
              <figure>
                <img src={news.img} alt={news.title} />
              </figure>
              <div className="card-body ">
                <h2 className="card-title ">
                  {news.title}
                  <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>{news.description}</p>
                <div className="card-actions justify-end">
                  {news.tags.map((tag, i) => (
                    <div key={i} className="badge badge-outline text-red-600 font-bold">{tag}</div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
