import Razorpay from 'razorpay'
import { NextRequest, NextResponse } from 'next/server'

// Verify credentials are loaded
const KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET

if (!KEY_ID || !KEY_SECRET) {
  console.error('⚠️  Razorpay credentials missing! Check .env.local')
  console.error('NEXT_PUBLIC_RAZORPAY_KEY_ID:', KEY_ID ? 'loaded' : 'missing')
  console.error('RAZORPAY_KEY_SECRET:', KEY_SECRET ? 'loaded' : 'missing')
}

const razorpay = new Razorpay({
  key_id: KEY_ID || '',
  key_secret: KEY_SECRET || '',
})

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 [Razorpay API] Request received')
    
    // Check if credentials are set
    if (!KEY_ID || !KEY_SECRET) {
      console.error('🔴 [Razorpay API] Missing credentials:', { 
        hasKeyId: !!KEY_ID, 
        hasKeySecret: !!KEY_SECRET 
      })
      return NextResponse.json(
        { 
          error: 'Razorpay credentials not configured',
          details: 'Missing NEXT_PUBLIC_RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in environment'
        },
        { status: 400 }
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
