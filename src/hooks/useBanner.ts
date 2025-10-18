"use client";

import { useState, useEffect, useRef } from "react";

export const useBanner = (length: number, delay = 5000) => {
  const [current, setCurrent] = useState(0);
  const dragStart = useRef(0);
  const dragEnd = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, delay);
    return () => clearInterval(timer);
  }, [length, delay]);

  const handlePrev = () =>
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));

  const handleNext = () => setCurrent((prev) => (prev + 1) % length);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragStart.current = "clientX" in e ? e.clientX : e.touches[0].clientX;
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    dragEnd.current = "clientX" in e ? e.clientX : e.changedTouches[0].clientX;
    if (dragStart.current - dragEnd.current > 50) handleNext();
    if (dragEnd.current - dragStart.current > 50) handlePrev();
  };

  return {
    current,
    setCurrent,
    handlePrev,
    handleNext,
    handleDragStart,
    handleDragEnd,
  };
};
