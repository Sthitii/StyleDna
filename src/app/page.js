"use client";

import React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import image1 from "@/assets/sample1.avif";
import hero1 from "@/assets/hero2.jpg";
import hero2 from "@/assets/hero7.jpg";
import hero3 from "@/assets/hero4.jpg";
import Image from "next/image";
import ChatBot from "@/components/shared/chatbot";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/layout/Header";

const Home = () => {

  const products = [
    {
      id: 1,
      name: "Black Long Sleeve A-Line Midi Dress",
      price: "79.00",
      image: image1,
      isNew: true,
      isBestSeller: false,
    },
    {
      id: 2,
      name: "Green Cord Wrap Mini Skirt",
      price: "49.00",
      image: image1,
      isNew: false,
      isBestSeller: true,
    },
    {
      id: 3,
      name: "Black Cord Embroidered Mini Dress",
      price: "79.00",
      image: image1,
      isNew: true,
      isBestSeller: false,
    },
    {
      id: 4,
      name: "Black Cord Button Through Mini Skirt",
      price: "55.00",
      image: image1,
      isNew: false,
      isBestSeller: true,
    },
  ];

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1536 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Announcement Bar */}
      <div className="bg-red-900 text-white text-center py-2">
        USE CODE JOY15 FOR 15% OFF ALMOST EVERYTHING
      </div>
      {/* Navigation */}
      <Header/>
      <div className="relative h-[600px] overflow-hidden">
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all 1"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div className="relative h-[600px] overflow-hidden">
            <div className="flex transition-transform duration-500 h-full">
              <div className="relative w-full h-full">
                <Image
                  src={hero1}
                  alt={`Hero 1`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h1 className="text-6xl font-serif mb-4">15% OFF</h1>
                    <p className="text-2xl mb-8">ALMOST EVERYTHING</p>
                    <Link
                      href="/sale"
                      className="border-2 border-white px-8 py-3 hover:bg-white hover:text-black transition"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[600px] overflow-hidden">
            <div className="flex transition-transform duration-500 h-full">
              <div className="relative w-full h-full">
                <Image
                  src={hero2}
                  alt={`Hero 2`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h1 className="text-5xl font-serif mb-4">NEW ARRIVALS</h1>
                    <p className="text-2xl mb-8">SUMMER COLLECTION 2025</p>
                    <Link
                      href="/new-in"
                      className="border-2 border-white px-8 py-3 hover:bg-white hover:text-black transition"
                    >
                      DISCOVER NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[600px] overflow-hidden">
            <div className="flex transition-transform duration-500 h-full">
              <div className="relative w-full h-full">
                <Image
                  src={hero3}
                  alt={`Hero 3`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white">
                  <div className="text-center">
                    <h1 className="text-5xl font-serif mb-4">
                      SUSTAINABLE FASHION
                    </h1>
                    <p className="text-2xl mb-8">ECO-FRIENDLY COLLECTION</p>
                    <Link
                      href="/sustainability"
                      className="border-2 border-white px-8 py-3 hover:bg-white hover:text-black transition"
                    >
                      SHOP SUSTAINABLE
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Category Navigation */}
      <div className="flex justify-center space-x-4 py-8">
        {[
          "DRESSES",
          "TOPS",
          "PARTYWEAR",
          "THE CORD EDIT",
          "COATS & JACKETS",
          "KNITWEAR",
        ].map((category) => (
          <button
            key={category}
            className="border px-6 py-2 hover:bg-black hover:text-white transition"
          >
            {category}
          </button>
        ))}
      </div>
      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <div key={product.id} className="group relative">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <button className="absolute top-4 right-4">
                    <Heart className="w-6 h-6 text-gray-500 hover:text-black transition-colors" />
                  </button>
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-xs">
                      NEW
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 text-xs">
                      BEST SELLER
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white py-3 translate-y-full group-hover:translate-y-0 transition-transform">
                    <button className="w-full text-center">ADD TO BAG</button>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-sm font-medium group-hover:underline">
                    {product.name}
                  </h3>
                  <p className="mt-1">£{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-black text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">ORDERS</h3>
            <ul className="space-y-2">
              <li>Deliveries</li>
              <li>Returns</li>
              <li>Student Discount</li>
              <li>Key Worker Discount</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">HELP</h3>
            <ul className="space-y-2">
              <li>FAQs</li>
              <li>Size Guides</li>
              <li>Contact Us</li>
              <li>Care Guide</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">INFO</h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>Sustainability</li>
              <li>Careers</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
};

export default Home;
