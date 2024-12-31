'use client';

import React from "react";
import Link from "next/link";
import ProfileDropdown from "../profile/ProfileDropdown";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBag, Search } from "lucide-react";
import useCartStore from "@/store/cartStore";

const Header = () => {
  const { user } = useAuth();
  const items = useCartStore((state) => state.items);
  const toggleCart = useCartStore((state) => state.toggleCart);

  // Calculate total items from cart items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="border-b sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif">
            STYLEDNA
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/working" className="hover:underline">
              NEW IN
            </Link>
            <Link href="/working" className="hover:underline">
              CLOTHING
            </Link>
            <Link href="/working" className="hover:underline">
              DRESSES
            </Link>
            <Link href="/working" className="hover:underline">
              ACCESSORIES
            </Link>
            <Link href="/working" className="hover:underline">
              SALE
            </Link>
            <Link href="/working" className="hover:underline">
              SUSTAINABILITY
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <button className="hover:text-gray-600 transition-colors">
              <Search className="w-6 h-6" />
            </button>
            <ProfileDropdown user={user} />
            <div className="relative">
              <button
                className="hover:text-gray-600 transition-colors"
                onClick={toggleCart}
              >
                <ShoppingBag className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;