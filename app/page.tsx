 'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import WaveDivider from '@/components/WaveDivider'
import Link from 'next/link'

const banners = [
  {
    id: 1,
    title: "Let's Stock Up on",
    subtitle: 'Birthday Party',
    description: 'Essentials',
    tagline: 'Props, Accessories & Quirky Decor!',
    gradient: 'from-pink-100 via-amber-50 to-white',
    icon: '🎂',
  },
  {
    id: 2,
    title: 'Bachelor Party',
    subtitle: 'Essentials',
    description: 'Fun & Celebration',
    tagline: 'Premium decorations & props!',
    gradient: 'from-blue-50 via-pink-50 to-white',
    icon: '🎉',
  },
  {
    id: 3,
    title: 'Celebrate Every',
    subtitle: 'Special Moment',
    description: 'With Style',
    tagline: 'Premium party supplies!',
    gradient: 'from-amber-50 via-pink-50 to-white',
    icon: '✨',
  },
]

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [products, setProducts] = useState<any[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const json = await res.json()
        if (mounted && json && json.data) setProducts(json.data)
      } catch (err) {
        console.error('Failed to fetch products', err)
      } finally {
        if (mounted) setLoadingProducts(false)
      }
    }
    fetchProducts()
    return () => {
      mounted = false
    }
  }, [])

  const featured = React.useMemo(() => {
    if (!products || products.length === 0) return []
    // shuffle and take 6
    const copy = products.slice()
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy.slice(0, 6)
  }, [products])

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="w-full">
      {/* Carousel Banner */}
      <section className="relative w-full h-96 md:h-96 overflow-hidden bg-gradient-to-r from-pink-300 via-amber-200 to-yellow-200">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-900 opacity-10 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300 opacity-10 blur-3xl animate-pulse" />
        </div>

        {/* Banner Content */}
        <div className={`absolute inset-0 bg-gradient-to-r ${banners[currentBanner].gradient} transition-all duration-500`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            <div className="relative z-10 text-left space-y-4">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-800 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                {banners[currentBanner].title}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-amber-900">
                {banners[currentBanner].subtitle} {banners[currentBanner].description}
              </div>
              <p className="text-lg md:text-xl text-gray-800 font-semibold">
                {banners[currentBanner].tagline}
              </p>
              <button className="bg-gradient-to-r from-amber-900 to-amber-600 text-white px-8 py-3 font-bold hover:shadow-lg transition-all duration-200 inline-block">
                🛍️ Shop Now
              </button>
            </div>

            {/* Icon */}
            <div className="hidden lg:block text-9xl opacity-30 animate-bounce">
              {banners[currentBanner].icon}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 shadow-lg transition"
        >
          ❮
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 shadow-lg transition"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBanner(idx)}
              className={`w-3 h-3 transition-all ${
                idx === currentBanner
                  ? 'bg-amber-900 w-8'
                  : 'bg-white bg-opacity-60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-amber-100 via-pink-100 to-yellow-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2 p-4">
              <span className="text-4xl">🎯</span>
              <p className="font-bold text-party-dark">High Quality</p>
              <p className="text-sm text-gray-700">Premium party supplies</p>
            </div>
            <div className="space-y-2 p-4">
              <span className="text-4xl">🚚</span>
              <p className="font-bold text-party-dark">Fast Delivery</p>
              <p className="text-sm text-gray-700">Quick shipping</p>
            </div>
            <div className="space-y-2 p-4">
              <span className="text-4xl">💰</span>
              <p className="font-bold text-party-dark">Best Prices</p>
              <p className="text-sm text-gray-700">Unbeatable deals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-white">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-900 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              ✨ Featured Products ✨
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Explore our curated collection of premium party essentials
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loadingProducts ? (
              <div className="col-span-full text-center">Loading products...</div>
            ) : featured.length === 0 ? (
              <div className="col-span-full text-center">No products found</div>
            ) : (
              featured.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  basePrice={product.basePrice}
                  imageUrl={product.imageUrl}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Festive CTA Banner */}
      <section className="bg-gradient-to-r from-amber-900 via-amber-500 to-yellow-400 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 text-8xl">🎉</div>
          <div className="absolute bottom-0 right-0 text-8xl">🎊</div>
          <div className="absolute top-1/2 left-1/4 text-8xl">🎈</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
            🎁 Special Offers! 🎁
          </h2>
          <p className="text-xl text-white mb-6 drop-shadow-lg">
            Get up to 30% OFF on bulk orders!
          </p>
          <button className="bg-white text-party-pink px-8 py-4 font-bold text-lg hover:shadow-xl transition-all">
            🛍️ Shop Now & Save
          </button>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gradient-to-b from-amber-50 to-pink-50 py-16 md:py-24 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 bg-white p-6 shadow-lg">
              <div className="text-5xl">🌟</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-amber-900 to-amber-600 bg-clip-text text-transparent">10K+</div>
              <p className="text-gray-700 font-semibold">Happy Customers</p>
            </div>
            <div className="space-y-3 bg-white p-6 shadow-lg">
              <div className="text-5xl">🎁</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-300 bg-clip-text text-transparent">500+</div>
              <p className="text-gray-700 font-semibold">Premium Products</p>
            </div>
            <div className="space-y-3 bg-white p-6 shadow-lg">
              <div className="text-5xl">💬</div>
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-amber-900 bg-clip-text text-transparent">24/7</div>
              <p className="text-gray-700 font-semibold">Customer Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
