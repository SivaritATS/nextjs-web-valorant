"use client";

import React from 'react';
import Link from 'next/link';

export default function Card({ imageUrl, altText, slug }) {
  return (
    <Link href={`/character/${slug}`}>
      <div className="relative w-[300px] h-[440px] bg-[#0F1923] rounded-xl shadow-md overflow-hidden group cursor-pointer">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={imageUrl}
          alt={altText}
        />
      </div>
    </Link>
  );
}
