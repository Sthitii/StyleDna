"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Heart, ChevronDown } from "lucide-react";
import front from "@/assets/front.avif";
import side from "@/assets/side.avif";
import back from "@/assets/back.avif";
import Header from "@/components/layout/Header";

export default function ProductDetail({ params: paramsPromise }) {
  const [selectedSize, setSelectedSize] = useState("");
  const params = React.use(paramsPromise);
  const product = {
    id: params.id,
    name: "Navy Cord Check Starlight Midi Dress",
    price: 53.0,
    originalPrice: 89.0,
    images: [front, side, back],
    sizes: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
    colors: ["navy", "green", "black"],
    features: [
      "Low v-neck",
      "Long balloon sleeves",
      "Covered buttons",
      "Pockets",
      "Panelled waist designed to flatter",
    ],
    description: `An autumn-ready take on our stellar style, Starlight. We're
                obsessed with her soft gathering, balloon sleeves and pretty
                line of covered buttons – she's even got pockets. Style yours
                with heeled boots.`,
    bodytypes: ["hourglass", "triangle"],
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    // Add to cart logic here
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {product.images.map((src, idx) => (
              <div key={idx} className="relative h-[600px]">
                <Image
                  src={src}
                  alt={`${product.name} - View ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Right: Product Details */}
          <div className="sticky top-24 h-fit">
            <h1 className="text-2xl mb-4">{product.name}</h1>

            <div className="flex items-center space-x-2 mb-6">
              <span className="text-red-600 text-xl">
                £{product.price.toFixed(2)}
              </span>
              <span className="text-gray-500 line-through">
                £{product.originalPrice.toFixed(2)}
              </span>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm mb-2">Select UK Size</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 border ${
                      selectedSize === size
                        ? "border-black"
                        : "border-gray-200 hover:border-gray-400"
                    } transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag */}
            <button
              onClick={handleAddToBag}
              className="w-full bg-gray-900 text-white py-4 mb-4 hover:bg-black transition-colors"
            >
              ADD TO BAG
            </button>

            {/* Promotion */}
            <div className="bg-gray-100 p-4 mb-4">
              USE CODE JOY15 FOR 15% OFF EVERYTHING*
            </div>

             {/* Promotion */}
             <div className="bg-gray-100 p-4 mb-4">
              Most Suitable for body type, {product.bodytypes.map((type) => (
                  <li key={type}>{type}</li>
                ))}
            </div>

            {/* Try at Home */}
            <div className="bg-gray-100 p-4 mb-4 flex justify-between items-center">
              <span>Try at home. Only pay for what you keep.</span>
              <button>Learn more</button>
            </div>

            {/* Product Description */}
            <div className="prose">
              <p className="mb-4">{product.description}</p>
              <ul className="list-disc pl-4 mb-6">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
