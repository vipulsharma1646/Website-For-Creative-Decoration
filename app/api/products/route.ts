import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/**
 * GET endpoint to retrieve products
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (id) {
      // Get single product by ID
      const product = await prisma.product.findUnique({
        where: { id },
      })

      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        )
      }

      // Parse JSON arrays
      return NextResponse.json({
        success: true,
        data: {
          ...product,
          categories: JSON.parse(product.categories),
          sizes: JSON.parse(product.sizes),
          colors: JSON.parse(product.colors),
          details: (product as any).details || null,
          pricing: (product as any).pricing ? JSON.parse((product as any).pricing) : null,
        },
      })
    }

    // Get all products
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Parse JSON arrays for all products
    const parsedProducts = products.map((product) => ({
      ...product,
      categories: JSON.parse(product.categories),
      sizes: JSON.parse(product.sizes),
      colors: JSON.parse(product.colors),
      details: (product as any).details || null,
      pricing: (product as any).pricing ? JSON.parse((product as any).pricing) : null,
    }))

    return NextResponse.json({
      success: true,
      count: products.length,
      data: parsedProducts,
    })
  } catch (error) {
    console.error('Product fetch error:', error)

    return NextResponse.json(
      {
        error:
          'Failed to fetch products' +
          (error instanceof Error ? ': ' + error.message : ''),
      },
      { status: 500 }
    )
  }
}

/**
 * POST endpoint to create a new product
 * In production, add authentication and validation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      'title',
      'description',
      'basePrice',
      'imageUrl',
      'categories',
      'sizes',
      'colors',
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Ensure arrays are strings (JSON)
    const categories =
      typeof body.categories === 'string'
        ? body.categories
        : JSON.stringify(body.categories)
    const sizes =
      typeof body.sizes === 'string' ? body.sizes : JSON.stringify(body.sizes)
    const colors =
      typeof body.colors === 'string'
        ? body.colors
        : JSON.stringify(body.colors)

    // Create product
    const createData: any = {
      title: body.title,
      description: body.description,
      basePrice: parseFloat(body.basePrice),
      imageUrl: body.imageUrl,
      categories,
      sizes,
      colors,
      details: body.details || null,
      pricing: body.pricing
        ? typeof body.pricing === 'string'
          ? body.pricing
          : JSON.stringify(body.pricing)
        : null,
    }

    const product = await prisma.product.create({ data: createData as any })

    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        data: {
          ...product,
          categories: JSON.parse(product.categories),
          sizes: JSON.parse(product.sizes),
          colors: JSON.parse(product.colors),
          details: (product as any).details || null,
          pricing: (product as any).pricing ? JSON.parse((product as any).pricing) : null,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Product creation error:', error)

    return NextResponse.json(
      {
        error:
          'Failed to create product' +
          (error instanceof Error ? ': ' + error.message : ''),
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing product id' }, { status: 400 })
    }

    await prisma.product.delete({ where: { id } })

    return NextResponse.json({ success: true, message: 'Product deleted' })
  } catch (error) {
    console.error('Product delete error:', error)
    return NextResponse.json(
      {
        error:
          'Failed to delete product' +
          (error instanceof Error ? ': ' + error.message : ''),
      },
      { status: 500 }
    )
  }
}
