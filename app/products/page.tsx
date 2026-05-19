'use client'

import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: string
  title: string
  description: string
  basePrice: number
  imageUrl: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data.data || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center space-y-6 mb-12">
        <h1 className="text-4xl font-bold text-party-dark">All Products</h1>
        <p className="text-lg text-gray-600">
          Browse our complete collection of premium party supplies
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin">
              <div className="h-8 w-8 border-4 border-amber-900 border-t-amber-300 rounded-full"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-600 font-semibold">Error: {error}</p>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-24 bg-gradient-to-r from-amber-900 to-amber-700 rounded-lg text-white">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">No Products Yet</h2>
            <p className="text-lg">
              Check back soon as we add more premium party supplies!
            </p>
            <p className="text-sm opacity-90">
              Go to{' '}
              <a href="/" className="underline font-semibold">
                homepage
              </a>{' '}
              to see featured products.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  )
}
