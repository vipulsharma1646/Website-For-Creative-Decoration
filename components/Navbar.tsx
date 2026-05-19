'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)

  const categories = [
    'Latex Balloons',
    'Foil Balloons',
    'Chrome Balloons',
    'Birthday Kits',
    'Anniversary Decor',
  ]

  return (
    <nav className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Placeholder */}
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/logo/logo.png" 
              alt="Creative Decoration Logo" 
              className="w-28 h-28 object-contain"
            />
            <span className="hidden sm:inline font-black text-2xl bg-gradient-to-r from-amber-900 via-amber-600 to-yellow-500 bg-clip-text text-transparent">
              Creative Decoration
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 md:gap-8">
            <Link
              href="/"
              className="text-party-teal font-semibold hover:text-amber-900 transition-colors duration-200 py-2 text-sm md:text-base"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-party-teal font-semibold hover:text-amber-900 transition-colors duration-200 py-2 text-sm md:text-base"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-party-teal font-semibold hover:text-amber-900 transition-colors duration-200 py-2 text-sm md:text-base"
            >
              Contact
            </Link>
            {/* Products with Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="text-party-teal font-semibold hover:text-amber-900 transition-colors duration-200 py-2">
                Products
              </button>

              {/* Mega Menu Dropdown */}
              {showDropdown && (
                <div className="absolute left-0 mt-0 w-80 bg-white shadow-lg rounded-lg py-6 px-6 z-50 border border-gray-100">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                      Shop by Category
                    </p>
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/products?category=${encodeURIComponent(
                          category
                        )}`}
                        className="block px-3 py-2 text-sm text-party-dark hover:text-amber-900 transition-colors duration-150"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin Link */}
            <Link
              href="/admin/add-product"
              className="text-party-teal font-semibold hover:text-amber-900 transition-colors duration-200 hidden md:block py-2"
            >
              Admin
            </Link>

            {/* Cart Icon Placeholder */}
            <button className="relative">
              <svg
                className="w-6 h-6 text-party-teal hover:text-amber-900 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10 0h2m-2 0l2 9M9 21h6"
                />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* Wave Divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="wave-teal">
          <path d="M0,40 Q300,0 600,40 T1200,40 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </nav>
  )
}
