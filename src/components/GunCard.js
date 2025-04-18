import React from "react";
import guns from "../data/Guns.json";

const GunCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#0F1923]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {guns.map((gun, index) => (
          <div
            key={index}
            className="card bg-white w-80 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition"
          >
            <figure>
              <img src={gun.image} alt={gun.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-black uppercase font-bold">
                {gun.name}
                <div className="badge badge-accent text-white font-bold">{gun.type}</div>
              </h2>
              <p className="text-black mb-2">{gun.description}</p>
              <div className="card-actions justify-end text-black">
                <div className="badge badge-outline font-bold">
                  ราคา: {gun.price} เครดิต
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GunCard;
