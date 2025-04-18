import React from "react";
import Card2 from "./Card2";

const MapsCard = () => {
    const cards = [
        {
          slug: "bind",
          imageUrl:
            "https://www.zleague.gg/theportal/wp-content/uploads/2023/06/A-photo-of-Bind-1024x576.png.webp",
        },
        {
          slug: "haven",
          imageUrl:
            "https://www.zleague.gg/theportal/wp-content/uploads/2023/06/A-photo-of-the-Valorant-Map-Haven-1024x576.png.webp",
        },
        {
          slug: "ascent",
          imageUrl:
            "https://www.zleague.gg/theportal/wp-content/uploads/2023/06/A-photo-of-the-Valorant-Map-Ascent-1024x576.png.webp",
        },
        {
          slug: "icebox",
          imageUrl:
            "https://www.zleague.gg/theportal/wp-content/uploads/2023/06/A-photo-of-the-Valorant-Map-Icebox-1024x576.png.webp",
        },
        {
          slug: "breeze",
          imageUrl:
            "https://www.zleague.gg/theportal/wp-content/uploads/2023/06/A-photo-of-Breeze-1024x576.png.webp",
        },
        {
          slug: "fracture",
          imageUrl:
            "https://www.zleague.gg/theportal/wp-content/uploads/2023/06/A-photo-of-Fracture-1024x576.png.webp",
        },
        {
          slug: "pearl",
          imageUrl:
            "https://www.zleague.gg/theportal/wp-content/uploads/2023/06/A-photo-of-Pearl-1024x576.png.webp",
        },
        {
          slug: "lotus",
          imageUrl:
            "https://www.zleague.gg/theportal/wp-content/uploads/2023/06/A-photo-of-Lotus-1024x576.png.webp",
        },
        {
          slug: "split",
          imageUrl:
            "https://www.zleague.gg/theportal/wp-content/uploads/2023/06/A-photo-of-Split-1024x576.jpg.webp",
        }
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => (
                <Card2 key={card.slug} slug={card.slug} imageUrl={card.imageUrl} />
            ))}
        </div>
    );
}

export default MapsCard;