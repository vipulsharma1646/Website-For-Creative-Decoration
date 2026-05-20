import Razorpay from 'razorpay'
import { NextRequest, NextResponse } from 'next/server'

// Initialize Razorpay lazily when API is called (not at build time)
function getRazorpayInstance() {
  const KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET

  if (!KEY_ID || !KEY_SECRET) {
    throw new Error(
      'Razorpay credentials missing! Add NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to Vercel environment variables'
    )
  }

  return new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
  })
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 [Razorpay API] Request received')
    
    // Initialize Razorpay when needed
    let razorpay
    try {
      razorpay = getRazorpayInstance()
    } catch (err) {
      console.error('🔴 [Razorpay API]', err instanceof Error ? err.message : err)
      return NextResponse.json(
        { 
          error: 'Razorpay not configured',
          details: 'Add NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to Vercel environment'
        },
        { status: 500 }
      )
    }

    const body = await request.json()
    console.log('📦 [Razorpay API] Request body:', body)
    
    const { amount, currency = 'INR', receipt, description, customerId, customerEmail, customerPhone } = body

    // Validate required fields
    if (!amount || !receipt) {
      console.error('🔴 [Razorpay API] Missing required fields:', { amount, receipt })
      return NextResponse.json(
        { error: 'Missing required fields: amount, receipt' },
        { status: 400 }
      )
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, // Convert to paise (smallest currency unit)
      currency,
      receipt,
      description: description || 'Order from Party Supplies Store',
    }

    console.log('🟡 [Razorpay API] Creating order with options:', options)
    
    const order = await razorpay.orders.create(options)

    console.log('✅ [Razorpay API] Order created successfully:', order.id)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error)
    console.error('❌ [Razorpay API] Error:', errorMessage)
    console.error('❌ [Razorpay API] Full error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to create Razorpay order', 
        details: errorMessage,
        hint: 'Check server logs for details'
      },
      { status: 500 }
    )
  }
}
