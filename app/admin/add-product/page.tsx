'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminAddProductPage() {
  const router = useRouter()
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    basePrice: '',
    categories: '',
    sizes: '',
    colors: '',
    imageUrl: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  // Simple password check - in production, use proper authentication
  const ADMIN_PASSWORD = 'admin@2024'

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === ADMIN_PASSWORD) {
      setIsUnlocked(true)
      setPasswordError('')
      setAdminPassword('')
    } else {
      setPasswordError('Incorrect password. Access denied.')
      setAdminPassword('')
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Parse sizes and colors from comma-separated strings to arrays
      const sizes = formData.sizes
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s)
      const colors = formData.colors
        .split(',')
        .map((c) => c.trim())
        .filter((c) => c)
      const categories = formData.categories
        .split(',')
        .map((cat) => cat.trim())
        .filter((cat) => cat)

      // Validation
      if (
        !formData.title ||
        !formData.description ||
        !formData.basePrice ||
        !formData.imageUrl
      ) {
        setSubmitMessage('Please fill in all required fields')
        setIsSubmitting(false)
        return
      }

      // Send product data to API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          basePrice: parseFloat(formData.basePrice),
          categories: categories,
          sizes: sizes,
          colors: colors,
          imageUrl: formData.imageUrl,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to add product')
      }

      setSubmitMessage('Product added successfully!')

      // Reset form
      setFormData({
        title: '',
        description: '',
        basePrice: '',
        categories: '',
        sizes: '',
        colors: '',
        imageUrl: '',
      })

      setTimeout(() => {
        setSubmitMessage('')
      }, 3000)
    } catch (error) {
      setSubmitMessage(
        'Error adding product. Please try again.' +
          (error instanceof Error ? ': ' + error.message : '')
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-party-dark to-party-dark flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-2xl p-8 space-y-6">
            {/* Security Icon */}
            <div className="flex justify-center">
              <div className="bg-amber-900 text-white rounded-full p-4">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-party-dark">
                Admin Access
              </h1>
              <p className="text-gray-600">
                This is a secure admin area. Please enter your password to
                proceed.
              </p>
            </div>

            {/* Password Form */}
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-party-dark mb-2">
                  Admin Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
                />
              </div>

              {passwordError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {passwordError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-900 text-white font-semibold py-2 rounded-lg hover:bg-amber-800 transition-colors duration-200"
              >
                Unlock Admin Panel
              </button>
            </form>

            {/* Demo Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Demo Password:</strong> admin@2024
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-party-dark">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Add new products to your store</p>
        </div>
        <button
          onClick={() => setIsUnlocked(false)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {submitMessage && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              submitMessage.includes('successfully')
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-party-dark mb-2">
              Product Title *
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Premium Latex Balloons"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-party-dark mb-2">
              Product Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your product..."
              rows={4}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
          </div>

          {/* Base Price */}
          <div>
            <label htmlFor="basePrice" className="block text-sm font-semibold text-party-dark mb-2">
              Base Price (₹) *
            </label>
            <input
              id="basePrice"
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleInputChange}
              placeholder="e.g., 5"
              step="0.01"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
          </div>

          {/* Categories */}
          <div>
            <label htmlFor="categories" className="block text-sm font-semibold text-party-dark mb-2">
              Categories (comma-separated)
            </label>
            <input
              id="categories"
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleInputChange}
              placeholder="e.g., Latex Balloons, Birthday, Decorations"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
          </div>

          {/* Sizes */}
          <div>
            <label htmlFor="sizes" className="block text-sm font-semibold text-party-dark mb-2">
              Sizes (comma-separated)
            </label>
            <input
              id="sizes"
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleInputChange}
              placeholder="e.g., 5, 10, 12"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
          </div>

          {/* Colors */}
          <div>
            <label htmlFor="colors" className="block text-sm font-semibold text-party-dark mb-2">
              Colors (comma-separated)
            </label>
            <input
              id="colors"
              type="text"
              name="colors"
              value={formData.colors}
              onChange={handleInputChange}
              placeholder="e.g., Red, Blue, Gold, Pink"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-semibold text-party-dark mb-2">
              Product Image URL *
            </label>
            <input
              id="imageUrl"
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-900"
            />
            <p className="text-sm text-gray-600 mt-2">
              Provide a direct URL to the product image
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-amber-900 text-white font-semibold py-3 rounded-lg hover:bg-amber-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  title: '',
                  description: '',
                  basePrice: '',
                  categories: '',
                  sizes: '',
                  colors: '',
                  imageUrl: '',
                })
              }
              className="flex-1 bg-gray-200 text-party-dark font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Info Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Tips</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ Use high-quality product images</li>
            <li>✓ Write clear, compelling descriptions</li>
            <li>✓ Set competitive prices</li>
            <li>✓ Use appropriate categories</li>
          </ul>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-2">Note</h3>
          <p className="text-sm text-green-800">
            This admin panel is in demo mode. In production, products would be
            saved to the database and visible on the storefront immediately.
          </p>
        </div>
      </div>
    </div>
  )
}
