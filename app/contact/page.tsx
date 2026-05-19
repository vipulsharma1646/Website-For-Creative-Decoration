'use client'

import React, { useState } from 'react'

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <section className="bg-teal-50 py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-teal-800 max-w-2xl mx-auto">
          Have a question about an order or need help planning a party? We are here for you!
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left Side: Contact Details */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-teal-900">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl">✉️</span>
              <div>
                <h3 className="font-bold text-teal-900">Email</h3>
                <p className="text-gray-600">info@creativedecoration.in</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl">📱</span>
              <div>
                <h3 className="font-bold text-teal-900">WhatsApp / Call</h3>
                <p className="text-gray-600">+91 81683 35256</p>
                <p className="text-sm text-gray-500">Mon-Sat, 10:00 AM - 7:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <h3 className="font-bold text-teal-900">Location</h3>
                <p className="text-gray-600">DD Colony, Kurukshetra, India</p>
                <p className="text-sm text-gray-500">Online Store</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-2xl">📸</span>
              <div>
                <h3 className="font-bold text-teal-900">Follow Us</h3>
                <a 
                  href="https://instagram.com/creativedecoration.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-teal-600 hover:underline"
                >
                  @creativedecoration.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Send a Message</h2>
          
          {isSubmitted ? (
            <div className="bg-green-50 text-green-800 p-6 rounded-xl text-center border border-green-200">
              <span className="text-3xl block mb-2">✅</span>
              <h3 className="font-bold text-lg">Message Sent!</h3>
              <p>We will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                <input required type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input required type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea required rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-teal-900 text-white font-bold py-3 rounded-lg hover:bg-teal-800 transition">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}