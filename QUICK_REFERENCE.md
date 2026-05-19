# Quick Reference - Party Propz Code Snippets

## Common Code Patterns & Snippets

### Fetching Data from Database

```typescript
// Get all products
const products = await prisma.product.findMany()

// Get product by ID
const product = await prisma.product.findUnique({
  where: { id: productId }
})

// Get with filters and sorting
const products = await prisma.product.findMany({
  where: {
    basePrice: { gte: 10, lte: 100 }
  },
  orderBy: { createdAt: 'desc' },
  take: 10
})

// Count records
const count = await prisma.product.count()

// Get unique values
const categories = await prisma.product.findMany({
  select: { categories: true },
  distinct: ['categories']
})
```

### Creating Records

```typescript
// Create single product
const product = await prisma.product.create({
  data: {
    title: 'Latex Balloons',
    description: 'Premium quality balloons',
    basePrice: 5,
    imageUrl: 'https://example.com/image.jpg',
    categories: JSON.stringify(['Balloons', 'Party']),
    sizes: JSON.stringify(['5', '10']),
    colors: JSON.stringify(['Red', 'Blue'])
  }
})

// Create with relations (if added to schema)
const customer = await prisma.customer.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    address: '123 Street',
    pincode: '110001',
    productName: 'Balloons',
    amountPaid: 50,
    paymentId: 'PAY_123456'
  }
})
```

### Updating Records

```typescript
// Update product
const updated = await prisma.product.update({
  where: { id: productId },
  data: {
    title: 'New Title',
    basePrice: 10
  }
})

// Update many records
await prisma.product.updateMany({
  where: { basePrice: { lt: 5 } },
  data: { basePrice: 5 }
})
```

### Deleting Records

```typescript
// Delete single product
await prisma.product.delete({
  where: { id: productId }
})

// Delete many records
await prisma.product.deleteMany({
  where: {
    createdAt: {
      lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
    }
  }
})
```

## API Route Patterns

### GET Endpoint

```typescript
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    
    const data = await prisma.product.findUnique({
      where: { id }
    })
    
    if (!data) {
      return NextResponse.json(
        { error: 'Not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data
    })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

### POST Endpoint

```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate
    if (!body.title || !body.basePrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create
    const data = await prisma.product.create({
      data: body
    })
    
    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

## React Components

### Functional Component with State

```typescript
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

### Fetching Data in Client Component

```typescript
'use client'

import { useState, useEffect } from 'react'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products')
        const json = await res.json()
        setProducts(json.data)
      } catch (error) {
        console.error('Fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])
  
  if (loading) return <div>Loading...</div>
  
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  )
}
```

### Form Handling

```typescript
'use client'

import { FormEvent } from 'react'

export default function ProductForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      basePrice: formData.get('basePrice'),
    }
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        // Success
      }
    } catch (error) {
      console.error('Submit error:', error)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="title" required />
      <input name="description" />
      <input name="basePrice" type="number" />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## Tailwind CSS Patterns

### Button Styles

```jsx
// Primary Pink Button
<button className="bg-party-pink text-white px-4 py-2 rounded-lg hover:bg-party-pink-light transition-colors">
  Click Me
</button>

// Secondary Button
<button className="bg-white text-party-dark border-2 border-party-pink px-4 py-2 rounded-lg hover:bg-party-pink hover:text-white transition-all">
  Secondary
</button>

// Danger Button
<button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
  Delete
</button>
```

### Card Component

```jsx
<div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
  <h3 className="text-lg font-semibold text-party-dark mb-2">
    Title
  </h3>
  <p className="text-gray-600 mb-4">Description</p>
  <button className="bg-party-pink text-white px-4 py-2 rounded">
    Action
  </button>
</div>
```

### Grid Layout

```jsx
// Responsive 3-column grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <div key={item.id}>{item.name}</div>
  ))}
</div>
```

### Flexbox Layout

```jsx
// Centered content
<div className="flex items-center justify-center h-screen">
  <h1>Centered Content</h1>
</div>

// Space between
<div className="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>

// Column layout
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Spacing

```jsx
// Padding
<div className="p-4">Uniform padding</div>
<div className="px-4 py-6">Horizontal and vertical</div>
<div className="px-4 sm:px-6 lg:px-8">Responsive</div>

// Margin
<div className="m-4">Uniform margin</div>
<div className="mb-4">Bottom margin</div>
<div className="mt-6 md:mt-10">Responsive top margin</div>

// Gap (for flex/grid)
<div className="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Typography

```jsx
// Headings
<h1 className="text-4xl font-bold text-party-dark">H1</h1>
<h2 className="text-3xl font-bold text-party-dark">H2</h2>
<h3 className="text-2xl font-semibold">H3</h3>

// Text styles
<p className="text-lg font-medium">Medium font</p>
<p className="text-sm text-gray-600">Small gray text</p>
<p className="text-base uppercase tracking-wider">Uppercase</p>
```

## Utility Functions

### Parse JSON Arrays

```typescript
import { parseJSON } from '@/lib/utils'

const sizes = parseJSON(product.sizes, [])
const colors = parseJSON(product.colors, [])
```

### Validate Input

```typescript
import { 
  isValidEmail, 
  isValidPhoneNumber, 
  isValidPincode 
} from '@/lib/utils'

if (!isValidEmail(email)) {
  return { error: 'Invalid email' }
}
```

### Format Data

```typescript
import { formatPrice, formatDate } from '@/lib/utils'

console.log(formatPrice(100))    // ₹100.00
console.log(formatDate(new Date())) // May 19, 2024
```

## Type Definitions

### Component Props

```typescript
interface ProductCardProps {
  id: string
  title: string
  price: number
  imageUrl: string
  onSelect?: (id: string) => void
}

export default function ProductCard({
  id,
  title,
  price,
  imageUrl,
  onSelect,
}: ProductCardProps) {
  return <div>...</div>
}
```

### API Response

```typescript
interface ApiResponse<T> {
  success: boolean
  message?: string
  error?: string
  data?: T
  count?: number
}
```

## Navigation

### Link Component

```typescript
import Link from 'next/link'

// Static link
<Link href="/products">
  Products
</Link>

// Dynamic link
<Link href={`/products/${id}`}>
  {title}
</Link>

// With query params
<Link href={`/products?category=${category}`}>
  View Category
</Link>
```

### Router Navigation (Client)

```typescript
'use client'

import { useRouter } from 'next/navigation'

export default function Component() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/products')
  }
  
  return <button onClick={handleClick}>Navigate</button>
}
```

---

For more details, refer to [DEVELOPMENT.md](./DEVELOPMENT.md)
