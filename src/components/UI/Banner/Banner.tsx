"use client";

import Image from "next/image";
import { bannerImages } from "@/lib/data";
import { useBanner } from "@/hooks/useBanner";
import BannerDots from "./BannerDots";

export default function Banner() {
  const { current, setCurrent, handleDragStart, handleDragEnd } = useBanner(
    bannerImages.length
  );

  return (
    <div className="bg-gradient-to-b from-primary from-50% px-5 pb-5 pt-20">
      <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-lg animate-fade-in">
        <div
          className="flex transition-transform duration-300 ease-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {bannerImages.map((img, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0">
              <Image
                width={1080}
                height={720}
                src={img}
                alt={`Banner ${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {/* 
      <BannerControls onPrev={handlePrev} onNext={handleNext} /> */}
        <BannerDots
          count={bannerImages.length}
          current={current}
          onSelect={setCurrent}
        />
      </div>
    </div>
  );
}
