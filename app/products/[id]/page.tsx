'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

interface Product {
  id: string
  title: string
  description: string
  basePrice: number
  imageUrl: string
  sizes: string[]
  colors: string[]
}

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedSize, setSelectedSize] = useState('5')
  const [selectedColor, setSelectedColor] = useState('Red')
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products?id=${productId}`)
        if (!response.ok) {
          throw new Error('Product not found')
        }
        const data = await response.json()
        setProduct(data.data)
        if (data.data.sizes && data.data.sizes.length > 0) {
          setSelectedSize(data.data.sizes[0])
        }
        if (data.data.colors && data.data.colors.length > 0) {
          setSelectedColor(data.data.colors[0])
        }
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ffe0bd] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <div className="h-8 w-8 border-4 border-green-900 border-t-amber-300 rounded-full"></div>
          </div>
          <p className="mt-4 text-lg text-green-900 font-medium">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#ffe0bd] flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-green-900 font-medium mb-4">{error || 'Product not found'}</p>
          <a href="/products" className="text-green-800 hover:text-green-600 underline">
            Back to Products
          </a>
        </div>
      </div>
    )
  }

  // Calculate price based on size
  const sizeMultiplier: { [key: string]: number } = {
    '5': 1,
    '10': 2,
  }

  const currentPrice =
    product.basePrice * (sizeMultiplier[selectedSize] || 1)

  const colorMap: { [key: string]: string } = {
    Red: 'bg-red-500',
    Blue: 'bg-blue-500',
    Gold: 'bg-yellow-500',
    Pink: 'bg-pink-500',
    Skin: 'bg-amber-300',
    Green: 'bg-green-500',
    Silver: 'bg-gray-300',
    'Rose Gold': 'bg-orange-200',
    'Chrome Silver': 'bg-gray-400',
    'Chrome Gold': 'bg-yellow-400',
    'Chrome Black': 'bg-gray-800',
    Purple: 'bg-purple-500',
    Yellow: 'bg-yellow-400',
    Orange: 'bg-orange-500',
  }

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#ffe0bd] text-green-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Breadcrumb */}
        <div className="mb-8 font-medium">
          <a href="/" className="text-green-800 hover:text-green-600">
            Home
          </a>
          <span className="text-green-900/50 mx-2">/</span>
          <a href="/products" className="text-green-800 hover:text-green-600">
            Products
          </a>
          <span className="text-green-900/50 mx-2">/</span>
          <span className="text-green-900">{product.title}</span>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image - Left */}
          <div className="flex items-center justify-center">
            <div className="relative w-full bg-white/40 rounded-lg overflow-hidden aspect-square shadow-sm border border-green-900/10">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details - Right */}
          <div className="flex flex-col justify-start space-y-8">
            {/* Title and Price */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-green-900">
                {product.title}
              </h1>
              <p className="text-green-800 text-lg">{product.description}</p>

              {/* Price Display */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-green-900">
                  ₹{currentPrice}
                </span>
                <span className="text-xl text-green-900/60 line-through">
                  ₹{product.basePrice * 2}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-green-900/20" />

            {/* Size Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-900">Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 border-2 ${
                      selectedSize === size
                        ? 'bg-green-900 text-[#ffe0bd] border-green-900'
                        : 'bg-transparent text-green-900 border-green-900/30 hover:border-green-900'
                    }`}
                  >
                    {size} inches
                  </button>
                ))}
              </div>
              <p className="text-sm text-green-800">
                Price updates based on selected size
              </p>
            </div>

            {/* Color Selector */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-900">Color</h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-green-900 bg-green-900/10'
                        : 'border-green-900/20 hover:border-green-900/50'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border border-black/10 shadow-inner ${
                        colorMap[color] || 'bg-gray-300'
                      }`}
                    />
                    <span className="text-sm font-medium text-green-900">
                      {color}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-green-900/20" />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium text-green-900">
                  Quantity:
                </span>
                <div className="flex items-center border border-green-900/30 rounded-lg bg-white/30">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-green-900 font-bold text-xl hover:bg-green-900/10 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 font-semibold text-green-900 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-green-900 font-bold text-xl hover:bg-green-900/10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
                  isAdded
                    ? 'bg-green-700 text-white'
                    : 'bg-green-900 text-[#ffe0bd] hover:bg-green-800 shadow-md hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {isAdded ? '✓ Added to Cart' : 'Buy Now'}
              </button>

              <p className="text-center text-sm font-medium text-green-800">
                Free shipping on orders above ₹500
              </p>
            </div>

            {/* Product Details */}
            <div className="border-t border-green-900/20 pt-6 space-y-4">
              <h3 className="text-lg font-semibold text-green-900">Details</h3>
              <p className="text-green-800 leading-relaxed">{product.details}</p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-1">
                  <p className="font-semibold text-green-900">✓ Premium Quality</p>
                  <p className="text-sm text-green-800/80">
                    Made from high-quality materials
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-green-900">✓ Fast Delivery</p>
                  <p className="text-sm text-green-800/80">
                    Ships within 2-3 business days
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-green-900">✓ Easy Returns</p>
                  <p className="text-sm text-green-800/80">
                    30-day return guarantee
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-green-900">✓ Best Price</p>
                  <p className="text-sm text-green-800/80">
                    Price match guarantee
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
