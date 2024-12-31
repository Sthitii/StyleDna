'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { useCallback } from 'react';

const ProductCarousel = ({ products }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    slidesToScroll: 1,
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors -translate-x-1/2"
          onClick={scrollPrev}
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors translate-x-1/2"
          onClick={scrollNext}
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {products.map((product) => (
              <div key={product.id} className="min-w-0 flex-[0_0_300px]">
                <Link href={`/product/${product.id}`}>
                  <div className="group relative">
                    <div className="relative overflow-hidden w-[300px] h-[400px]">
                      <img
                        src={product.image_url}
                        alt={product.product_name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button 
                        className="absolute top-4 right-4 z-10"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to wishlist logic here
                        }}
                      >
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
                        <button 
                          className="w-full text-center"
                          onClick={(e) => {
                            e.preventDefault();
                            // Add to cart logic here
                          }}
                        >
                          ADD TO BAG
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-sm font-medium group-hover:underline">
                        {product.product_name}
                      </h3>
                      <p className="mt-1">£{product.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;