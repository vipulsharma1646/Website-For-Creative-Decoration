# Development Guide - Party Propz

This guide explains the architecture, code patterns, and best practices used in the Party Propz e-commerce platform.

## Architecture Overview

Party Propz follows a modern Next.js architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│              Next.js App Router (Frontend)              │
│  ├─ app/page.tsx (Homepage)                            │
│  ├─ app/products/[id]/page.tsx (Product Details)       │
│  ├─ app/admin/add-product/page.tsx (Admin)             │
│  ├─ components/ (React Components)                     │
│  └─ lib/ (Utilities & Types)                           │
└─────────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│              Next.js API Routes                         │
│  ├─ app/api/products/route.ts                          │
│  └─ app/api/webhooks/payment/route.ts                  │
└─────────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│         Prisma ORM Layer                                │
│  ├─ lib/db.ts (Prisma Client)                          │
│  └─ prisma/schema.prisma (Database Schema)             │
└─────────────────────────────────────────────────────────┘
                         ↕
┌─────────────────────────────────────────────────────────┐
│              SQLite / PostgreSQL                        │
└─────────────────────────────────────────────────────────┘
```

## Key Concepts

### 1. Server Components vs Client Components

**Server Components** (Default in Next.js 13+)
- Run on the server
- Direct database access
- Secure (environment variables safe)
- No JavaScript sent to browser
- Perfect for: Data fetching, authentication checks

Example:
```typescript
// app/page.tsx
export default async function Home() {
  const products = await getMockProducts()
  return <ProductGrid products={products} />
}
```

**Client Components**
- Run in the browser
- Interactive (hooks, state, events)
- Can't access sensitive data
- More JavaScript sent to browser
- Mark with `'use client'` directive

Example:
```typescript
// components/Navbar.tsx
'use client'
import { useState } from 'react'

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false)
  // ...
}
```

### 2. Dynamic Routes

Product details use dynamic routes: `/products/[id]/page.tsx`

```typescript
// app/products/[id]/page.tsx
export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  // Fetch product using productId
}
```

The `[id]` becomes a dynamic segment you can access with `useParams()`.

### 3. API Routes

API endpoints in `app/api/` work like Node.js express routes:

```typescript
// app/api/products/route.ts
export async function GET(request: NextRequest) {
  // Handle GET requests
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  // Handle POST requests
  return NextResponse.json(data, { status: 201 })
}
```

## Project Patterns

### Database Access Pattern

All database queries go through Prisma client:

```typescript
import { prisma } from '@/lib/db'

// Create
const product = await prisma.product.create({
  data: { title, description, basePrice, ... }
})

// Read
const products = await prisma.product.findMany()
const product = await prisma.product.findUnique({ where: { id } })

// Update
const updated = await prisma.product.update({
  where: { id },
  data: { title }
})

// Delete
await prisma.product.delete({ where: { id } })
```

### Component Structure

Components follow a consistent pattern:

```typescript
// components/MyComponent.tsx
'use client' // If interactive

import React, { useState } from 'react'

interface MyComponentProps {
  title: string
  onClick?: () => void
}

export default function MyComponent({ title, onClick }: MyComponentProps) {
  const [state, setState] = useState(false)

  return (
    <div className="space-y-4">
      {/* JSX here */}
    </div>
  )
}
```

### API Response Pattern

All API responses follow a consistent format:

```typescript
// Success
{
  success: true,
  message: "Operation completed",
  data: { /* payload */ }
}

// Error
{
  success: false,
  error: "Error message",
  data: null
}

// With pagination
{
  success: true,
  count: 10,
  data: [ /* items */ ]
}
```

## Styling System

Uses **Tailwind CSS** exclusively, no component libraries:

### Color System
```typescript
// tailwind.config.ts
colors: {
  'party-pink': '#FF1493',      // Main CTA
  'party-pink-light': '#FF69B4', // Hover state
  'party-dark': '#0F0F0F',      // Text
}
```

### Common Patterns

Button styles:
```jsx
// Primary (Pink)
<button className="bg-party-pink text-white hover:bg-party-pink-light">

// Secondary (White with border)
<button className="bg-white text-party-pink border-2 border-party-pink hover:bg-party-pink hover:text-white">

// Outline
<button className="border-2 border-gray-300 hover:border-party-pink">
```

Grid layouts:
```jsx
// 3 columns on desktop, 2 on tablet, 1 on mobile
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// With auto-fit
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
```

Responsive spacing:
```jsx
// Different padding on different screen sizes
<div className="px-4 sm:px-6 lg:px-8 py-12 md:py-24">
```

## Adding New Features

### Add a New Page

1. Create file in `app/` directory:
```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <div>About content</div>
}
```

2. Automatically available at `/about` ✓

### Add a New Component

1. Create in `components/` directory:
```typescript
// components/Footer.tsx
export default function Footer() {
  return <footer>...</footer>
}
```

2. Import and use in pages/layouts:
```typescript
import Footer from '@/components/Footer'
```

### Add a New API Endpoint

1. Create in `app/api/` directory:
```typescript
// app/api/users/route.ts
export async function GET(request: NextRequest) {
  return NextResponse.json({ users: [] })
}
```

2. Available at `/api/users` ✓

### Add Database Model

1. Edit `prisma/schema.prisma`:
```prisma
model Review {
  id        String   @id @default(cuid())
  rating    Int
  comment   String
  productId String
  createdAt DateTime @default(now())
}
```

2. Create migration:
```bash
npm run prisma:migrate
```

3. Use in code:
```typescript
const review = await prisma.review.create({
  data: { rating: 5, comment: "Great!", productId }
})
```

## TypeScript Usage

Use types for safety:

```typescript
import { ProductData, CustomerData } from '@/lib/types'

async function getProduct(id: string): Promise<ProductData> {
  const product = await prisma.product.findUnique({ where: { id } })
  return product as ProductData
}
```

## Performance Optimization

### Image Optimization
Use Next.js Image component (when implementing):
```typescript
import Image from 'next/image'

<Image
  src={imageUrl}
  alt={title}
  width={500}
  height={500}
  className="w-full h-full object-cover"
/>
```

### Code Splitting
Next.js automatically splits code by route - no action needed.

### Caching
Leverage Next.js caching:
```typescript
// Cache API response for 60 seconds
const products = await prisma.product.findMany()
// Add revalidate in production
```

## Common Tasks

### Fetch Product Data

```typescript
// In a Server Component
const products = await prisma.product.findMany({
  orderBy: { createdAt: 'desc' }
})

// In Client Component via API
const response = await fetch('/api/products')
const { data } = await response.json()
```

### Handle Form Submission

```typescript
'use client'

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  
  const formData = new FormData(e.currentTarget)
  const data = Object.fromEntries(formData)
  
  const response = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  
  if (response.ok) {
    // Success
  }
}
```

### Format Data for Display

Use utilities from `lib/utils.ts`:

```typescript
import { formatPrice, formatDate } from '@/lib/utils'

<span>{formatPrice(99.99)}</span>  // ₹99.99
<span>{formatDate(new Date())}</span> // May 19, 2024
```

## Error Handling

### Server-side
```typescript
try {
  const product = await prisma.product.findUnique(...)
} catch (error) {
  console.error('Database error:', error)
  return NextResponse.json(
    { error: 'Failed to fetch product' },
    { status: 500 }
  )
}
```

### Client-side
```typescript
try {
  const response = await fetch('/api/products')
  if (!response.ok) throw new Error('Failed to fetch')
  const data = await response.json()
} catch (error) {
  setError(error.message)
}
```

## Security Best Practices

1. **Validate Inputs**
   ```typescript
   if (!formData.email || !isValidEmail(formData.email)) {
     return { error: 'Invalid email' }
   }
   ```

2. **Sanitize Output**
   ```typescript
   // Tailwind sanitizes class strings
   // Always escape user input in templates
   ```

3. **Protect API Routes**
   ```typescript
   // Check auth before allowing mutations
   export async function POST(request: NextRequest) {
     const token = request.headers.get('authorization')
     if (!token) return NextResponse.json({}, { status: 401 })
   }
   ```

4. **Use Environment Variables**
   ```typescript
   // Never hardcode secrets
   const apiKey = process.env.API_KEY
   ```

## Testing

### Unit Testing (Recommended Setup)
```bash
npm install -D vitest @testing-library/react
```

### Integration Testing
```bash
npm install -D playwright
```

## Debugging

### Enable Prisma Logging
```typescript
// lib/db.ts
new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})
```

### Debug in VS Code
Add to `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js debug",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

## File Organization Rules

```
✓ DO organize by feature/domain
✓ DO keep components near where they're used
✓ DO use TypeScript for type safety
✓ DO write meaningful variable/function names
✓ DO add comments for complex logic
✗ DON'T put all components in one folder
✗ DON'T mix concerns in a single file
✗ DON'T use `any` type in TypeScript
✗ DON'T hardcode strings/numbers
```

## Useful Resources

- **Next.js App Router**: https://nextjs.org/docs/app
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Prisma**: https://www.prisma.io/docs
- **TypeScript**: https://www.typescriptlang.org/docs
- **React Hooks**: https://react.dev/reference/react

---

Happy coding! 🚀
