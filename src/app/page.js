"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import hero1 from "@/assets/hero2.jpg";
import hero2 from "@/assets/hero7.jpg";
import hero3 from "@/assets/hero4.jpg";
import Image from "next/image";
import ChatBot from "@/components/shared/chatbot";
import Header from "@/components/layout/Header";
import productData from "@/data/product.json";
import ProductCarousel from "@/components/products/ProductCarousel";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const [userBodyType, setUserBodyType] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBodyType = async () => {
      if (user?.email) {
        const bodyTypeDoc = await getDoc(doc(db, "bodyTypes", user.uid));
        if (bodyTypeDoc.exists()) {
          setUserBodyType(bodyTypeDoc.data().bodyType);
        }
      }
    };
    fetchBodyType();
  }, [user]);

  console.log(userBodyType, user?.email, "any value present")

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
        USE CODE UWL20 FOR 20% OFF ALMOST EVERYTHING
      </div>
      {/* Navigation */}
      <Header />
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
                    <h1 className="text-6xl font-serif mb-4">20% OFF</h1>
                    <p className="text-2xl mb-8">ALMOST EVERYTHING</p>
                    <Link
                      href="/working"
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
                      href="/working"
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
      <ProductCarousel products={productData.products} />
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
      {userBodyType?.length > 0 ? (
        <ChatBot userBodyType={userBodyType} />
      ) : (
        <ChatBot userBodyType='' />
      )}
    </div>
  );
};

export default Home;
