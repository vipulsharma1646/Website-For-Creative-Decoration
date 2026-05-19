import React from 'react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-teal-50 to-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-900 mb-6">
            Welcome to Creative Decoration
          </h1>
          <p className="text-lg md:text-xl text-teal-800 leading-relaxed">
            We believe that every celebration—whether it's a first birthday, a milestone anniversary, or a spontaneous weekend get-together—deserves to be unforgettable.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="max-w-5xl mx-auto px-4 mt-12 space-y-20">
        
        {/* Mission Statement */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-teal-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We know that planning a party can be stressful. Our mission is to make it effortless and joyful by delivering a curated selection of high-quality party essentials right to your door. We do the heavy lifting so you can focus on making memories.
          </p>
        </div>

        {/* Why Choose Us Grid */}
        <div>
          <h2 className="text-3xl font-bold text-teal-900 text-center mb-12">
            Why Shop With Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-teal-50/50 p-8 rounded-2xl border border-teal-100 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-teal-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                We handpick all our props and accessories to ensure they look stunning in your photos and last throughout the entire celebration.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-teal-50/50 p-8 rounded-2xl border border-teal-100 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-teal-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Because we know last-minute party panics happen, we ensure your supplies arrive exactly when you need them.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-teal-50/50 p-8 rounded-2xl border border-teal-100 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-teal-900 mb-3">Unbeatable Prices</h3>
              <p className="text-gray-600">
                Throwing a great party shouldn't break the bank. We offer the best deals on premium party kits.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-yellow-400 rounded-3xl p-10 text-center max-w-4xl mx-auto shadow-sm">
          <h2 className="text-3xl font-bold text-yellow-900 mb-6">
            Ready to make your next event spectacular?
          </h2>
          <Link 
            href="/products" 
            className="inline-block bg-white text-yellow-900 font-bold text-lg px-8 py-4 rounded-full shadow hover:bg-yellow-50 transition-colors"
          >
            Shop Essentials Now
          </Link>
        </div>

      </section>
    </div>
  )
}