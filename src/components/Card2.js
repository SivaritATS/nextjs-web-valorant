"use client";

import React from 'react';
import Link from 'next/link';

export default function Card2({ imageUrl, altText, slug }) {
  return (
    <Link href={`/map/${slug}`}>
      <div className="mt-10 relative w-[250] h-[350px] bg-[#0F1923] rounded-2xl shadow-md overflow-hidden group cursor-pointer mb-10">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={imageUrl}
          alt={altText}
        />
      </div>
    </Link>
  );
}
