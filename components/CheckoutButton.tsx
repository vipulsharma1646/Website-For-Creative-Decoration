'use client'

import React, { useState } from 'react'

// Declare Razorpay on window for TypeScript
declare global {
  interface Window {
    Razorpay: any
  }
}

interface CheckoutButtonProps {
  amount: number
  productName?: string
  productId?: string
  customerEmail?: string
  customerPhone?: string
  onSuccess?: (response: any) => void
  onError?: (error: any) => void
  className?: string
}

export default function CheckoutButton({
  amount,
  productName = 'Product',
  productId = '',
  customerEmail = '',
  customerPhone = '',
  onSuccess,
  onError,
  className = '',
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleCheckout = async () => {
    try {
      setLoading(true)
      setError('')

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script')
      }

      // Create order from backend
      const orderPayload = {
        amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        description: productName,
        customerId: productId,
        customerEmail,
        customerPhone,
      }
      console.log('📤 Sending order request:', orderPayload)
      
      const orderResponse = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })
      
      console.log('📥 Response status:', orderResponse.status)

      if (!orderResponse.ok) {
        let errorData: any = {}
        try {
          errorData = await orderResponse.json()
        } catch (e) {
          const text = await orderResponse.text()
          console.error('❌ Response not JSON:', text)
          throw new Error(`API returned ${orderResponse.status}: ${text}`)
        }
        console.error('❌ API Error Response:', errorData)
        throw new Error(errorData.details || errorData.error || 'Failed to create order')
      }

      const orderData = await orderResponse.json()

      if (!orderData.success) {
        throw new Error('Order creation failed')
      }

      // Open Razorpay payment popup
      const options = {
        key: orderData.key,
        order_id: orderData.orderId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Party Supplies Store',
        description: productName,
        image: '/logo/logo.png', // Add your logo URL here
        handler: function (response: any) {
          console.log('Payment successful:', response)
          if (onSuccess) {
            onSuccess(response)
          }
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`)
        },
        prefill: {
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: '#78350f', // amber-900
        },
      }

      const razorpayInstance = new window.Razorpay(options)
      razorpayInstance.open()

      razorpayInstance.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response)
        const errorMsg = `Payment failed: ${response.error.description}`
        setError(errorMsg)
        if (onError) {
          onError(response.error)
        }
      })
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Checkout failed'
      setError(errorMsg)
      console.error('Checkout error:', err)
      if (onError) {
        onError(err)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={
          className ||
          'bg-amber-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
        }
      >
        {loading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
      {error && (
        <div className="mt-2 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  )
}
