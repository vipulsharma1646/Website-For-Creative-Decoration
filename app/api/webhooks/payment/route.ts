import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * Webhook endpoint to handle payment confirmations
 * In production, this would be called by your payment provider (Razorpay, Stripe, etc.)
 *
 * Expected POST body:
 * {
 *   name: string,
 *   email: string,
 *   phone: string,
 *   address: string,
 *   pincode: string,
 *   productName: string,
 *   amountPaid: number,
 *   paymentId: string (unique)
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      'name',
      'email',
      'phone',
      'address',
      'pincode',
      'productName',
      'amountPaid',
      'paymentId',
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Save customer data to database
    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        address: body.address,
        pincode: body.pincode,
        productName: body.productName,
        amountPaid: parseFloat(body.amountPaid),
        paymentId: body.paymentId,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Order received and saved successfully',
        customerId: customer.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Webhook error:', error)

    return NextResponse.json(
      {
        error:
          'Failed to process webhook' +
          (error instanceof Error ? ': ' + error.message : ''),
      },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint to retrieve customer orders (optional)
 * In production, add proper authentication and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')

    if (email) {
      // Get orders for specific email
      const orders = await prisma.customer.findMany({
        where: { email },
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json({
        success: true,
        count: orders.length,
        data: orders,
      })
    }

    // Get all orders (warning: production should have auth and pagination)
    const allOrders = await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100, // Limit for safety
    })

    return NextResponse.json({
      success: true,
      count: allOrders.length,
      data: allOrders,
    })
  } catch (error) {
    console.error('Fetch error:', error)

    return NextResponse.json(
      {
        error:
          'Failed to fetch orders' +
          (error instanceof Error ? ': ' + error.message : ''),
      },
      { status: 500 }
    )
  }
}
