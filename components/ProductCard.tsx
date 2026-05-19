'use client'

import React from 'react'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  title: string
  description: string
  basePrice: number
  imageUrl: string
}

export default function ProductCard({
  id,
  title,
  description,
  basePrice,
  imageUrl,
}: ProductCardProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className="group cursor-pointer h-full">
        <div className="bg-white overflow-hidden mb-4 aspect-square relative border border-gray-200">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300" />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-party-text group-hover:text-amber-900 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-amber-900">₹{basePrice}</span>
            <button className="bg-amber-900 text-white px-3 py-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
