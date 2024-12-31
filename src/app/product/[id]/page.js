"use client";

import React, { useState } from "react";
import ChatBot from "@/components/shared/chatbot";
import Header from "@/components/layout/Header";
import useCartStore from "@/store/cartStore";
import productData from "@/data/product.json";
import LoadingSpinner from "@/components/shared/Loading";

export default function ProductDetail({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const [selectedSize, setSelectedSize] = useState("");
  const productId = parseInt(params.id);

  const addItem = useCartStore((state) => state.addItem);

  // Find the product from the JSON data
  const product = productData.products.find((item) => item.id === productId);

 

  if (!product) {
    return <div className="justify-center flex items-center h-screen">
    <LoadingSpinner size="medium" type="dots" text="Product not found..." />
    </div>;
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalprice,
      imageUrl: product.image_url,
      size: selectedSize,
    });
  };

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {[product.image_url, product.photo_2, product.photo_3].map(
              (src, idx) => (
                <div key={idx} className="relative h-[800px]">
                  <img
                    src={src}
                    alt={`${product.name} - View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            )}
          </div>

          {/* Right: Product Details */}
          <div className="sticky top-24 h-fit">
            <h1 className="text-2xl mb-4">{product.product_name}</h1>

            <div className="flex items-center space-x-2 mb-6">
              <span className="text-red-600 text-xl">
                £{product.price.toFixed(2)}
              </span>
              {product.originalprice && (
                <span className="text-gray-500 line-through">
                  £{product.originalprice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm">Select UK Size</h3>
                {!selectedSize && (
                  <span className="text-sm text-red-500">
                    * Size selection required
                  </span>
                )}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 border transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center">
                <h3 className="text-sm">Color:</h3>
                <div className="flex items-center ml-2 font-medium">
                  <span className="text-sm text-gray-700 capitalize">
                    {product.color}
                  </span>
                  <div
                    className="w-5 h-5 rounded-full border border-gray-200 ml-2"
                    style={{
                      backgroundColor: product.color.toLowerCase(),
                      // Fallback for colors that might not work directly
                      background: `${
                        product.color.toLowerCase() === "navy"
                          ? "#000080"
                          : product.color.toLowerCase() === "rust"
                          ? "#B7410E"
                          : product.color.toLowerCase()
                      }`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Add to Bag */}
            <button
              onClick={handleAddToBag}
              disabled={!selectedSize}
              className={`w-full py-4 mb-4 transition-colors ${
                !selectedSize
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-black text-white"
              }`}
            >
              {!selectedSize ? "PLEASE SELECT A SIZE" : "ADD TO BAG"}
            </button>

            {/* Promotion */}
            <div className="bg-gray-100 p-4 mb-4">
              USE CODE UWL20 FOR 20% OFF EVERYTHING*
            </div>

            {/* Body Type Info */}
            <div className="bg-gray-100 p-4 mb-4">
              <h3 className="font-medium mb-2">Most Suitable for body type:</h3>
              <ul className="list-disc pl-4">
                {product.bodytypes
                  .replace(/[\[\]']/g, "")
                  .split(",")
                  .map((type) => (
                    <li key={type} className="capitalize">
                      {type.trim()}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Try at Home */}
            <div className="bg-gray-100 p-4 mb-4 flex justify-between items-center">
              <span>Try at home. Only pay for what you keep.</span>
              <button>Learn more</button>
            </div>

            {/* Product Description */}
            <div className="prose">
              <p className="mb-4">{product.description}</p>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Features:</h3>
                <ul className="list-disc pl-4">
                  {product.features
                    .replace(/[\[\]']/g, "")
                    .split(",")
                    .map((feature) => (
                      <li key={feature} className="capitalize">
                        {feature.trim()}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </>
  );
}
