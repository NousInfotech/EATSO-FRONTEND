"use client";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const socialIcons = [
    { icon: <FaFacebookF />, link: "#" },
    { icon: <FaTwitter />, link: "#" },
    { icon: <FaInstagram />, link: "#" },
    { icon: <FaYoutube />, link: "#" },
  ];

  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-foreground text-background mt-12 md:mt-16 animate-slide-in-up">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {socialIcons.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-foreground transition transform hover:scale-110 text-lg"
            >
              {item.icon}
            </Link>
          ))}
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap lg:flex-row flex-col items-center md:justify-center gap-4 md:gap-6 text-sm text-background">
          <Link href="#" className="hover:text-primary transition">
            • Privacy Policy
          </Link>

          <Link href="#" className="hover:text-primary transition">
            • Terms & Conditions
          </Link>

          <span>&copy; {currentYear} Cloud Kitchen</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
