"use client";

import Image from "next/image";

export default function Banner2() {
  return (
    <section className="relative">
      <div className="w-full px-4">
        {/* RIGHT */}

        <div className="relative h-full justify-center flex items-center">
          {/* TOP-LEFT PLATE */}
          <div className="relative">
            <Image
              src="/banner-images/1.png"
              alt="food"
              width={200}
              height={260}
              className="animate-float1"
            />
            {/* BUBBLE 1 */}
            <div className="bubble bubble-1">😋 Sooooo Hygenic!</div>
          </div>

          <div className="relative space-y-3">
            {/* TOP-RIGHT PLATE */}
            <Image
              src="/banner-images/2.png"
              alt="food"
              width={200}
              height={260}
              className="animate-float2"
            />

            {/* BOTTOM-CENTER PLATE */}
            <div className="relative">
              <Image
                src="/banner-images/3.png"
                alt="food"
                width={200}
                height={260}
                className="animate-float3"
              />

              {/* BUBBLE 2 */}
              <div className="bubble bubble-2">🥰 Sooooo Delicious!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
