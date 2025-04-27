"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import characters from "@/data/characters.json";
import Image from "next/image";

export default function CharacterPage() {
  const { slug } = useParams();
  const character = characters.find((c) => c.slug === slug);
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);

  if (!character) {
    return (
      <div className="text-center mt-10 text-white">
        <h1 className="text-2xl font-bold">ไม่พบตัวละคร</h1>
      </div>
    );
  }

  const activeSkill = character.skills[activeSkillIndex];

  return (
    <div className="bg-[#0F1923] text-gray-300 min-h-screen px-8 py-5">
      <div className="flex flex-col lg:flex-row gap-0">
        {/* รูปด้านซ้าย */}
        <div className="lg:w-1/2 w-full flex justify-center">
          <Image
            src={character.image}
            alt={character.name}
            width={352}
            height={616}
            className="object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* ข้อมูล + Role + Skill ด้านขวา */}
        <div className="lg:w-1/2 w-full flex flex-col gap-[30px] justify-center">
          <div>
            <h1 className="text-5xl font-bold italic text-red-500 mb-4 uppercase">
              {character.name}
            </h1>
            <p className="text-lg leading-relaxed mb-4">
              {character.description}
            </p>
            <div className="inline-flex items-center gap-5 border border-red-500 px-4 py-2 rounded bg-red-900/10 mb-6">
              <Image
                src={character.roleIcon}
                alt={character.role}
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-red-400 font-semibold">
                {character.roleTH}
              </span>
              <span className="text-white font-bold uppercase">( {character.role} )</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-15 items-start">

            {/* วิดีโอ */}
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg border border-white/10">
              {activeSkill.media.endsWith(".mp4") ? (
                <video
                  key={activeSkill.media}
                  src={activeSkill.media}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[300px] object-cover"
                />
              ) : (
                <Image
                  src={activeSkill.media}
                  alt={activeSkill.name}
                  width={480}
                  height={300}
                  className="w-full object-cover"
                />
              )}
            </div>

            {/* skill */}
            <div className="w-full md:w-1/3 flex flex-col gap-5">
              {character.skills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSkillIndex(index)}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all hover:scale-120 duration-700 ${
                    index === activeSkillIndex
                      ? "border border-pink-500 bg-pink-800/20 shadow-md"
                      : "border border-transparent hover:border-pink-400"
                  }`}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="text-sm font-semibold">{skill.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
