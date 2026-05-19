# Party Propz - Modern E-Commerce Website

A modern, minimalist e-commerce platform for party decorations, built with **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, and **Prisma ORM**.

## 🎉 Features

### Frontend
- **Responsive Design**: Mobile-first approach with clean whitespace and vibrant accents
- **Modern Navbar**: Sticky navigation with animated mega menu dropdown on hover
- **Dynamic Product Grid**: 3-column responsive layout with hover animations
- **Product Details Page**: Full-featured product view with:
  - Multiple size options (5", 10") with dynamic pricing
  - Interactive color swatches with real-time preview
  - Quantity selector
  - Add to cart functionality
- **Hero Section**: Eye-catching banner with CTA buttons and festive elements
- **Trust Section**: Social proof with key metrics

### Admin Panel
- **Secure Login**: Basic password-protected admin area
- **Product Management**: Beautiful form to add new products
- **Form Inputs**: Title, description, price, categories, sizes, colors, and image URL
- **Validation**: Client-side form validation with error messages
- **Success Feedback**: Clear feedback on product additions

### Database
- **Prisma ORM**: Type-safe database access
- **Product Model**: Manages all product information (title, price, variants, images)
- **Customer Model**: Captures order/webhook data (name, email, address, payment info)
- **SQLite by Default**: Easy local development (configurable to PostgreSQL)

## 🏗️ Project Structure

```
party-ecommerce/
├── app/
│   ├── layout.tsx              # Root layout with Navbar and Footer
│   ├── globals.css             # Tailwind and custom styles
│   ├── page.tsx                # Homepage with hero and product grid
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx        # Dynamic product details page
│   └── admin/
│       └── add-product/
│           └── page.tsx        # Secure admin dashboard
├── components/
│   ├── Navbar.tsx              # Navigation with mega menu
│   └── ProductCard.tsx         # Reusable product card component
├── lib/
│   └── db.ts                   # Prisma client singleton
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies
└── .env.example                # Environment template
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd /Users/vipulsharma/Documents/projects/website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or yarn install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   ```

4. **Initialize Prisma and database**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### Homepage
- Features a hero section with call-to-action buttons
- Displays 6 featured products in a responsive grid
- Trust metrics showing customer satisfaction

### Product Details Page
- Access by clicking on any product card
- **Size Selection**: Click buttons to choose between 5" and 10" sizes
- **Color Selection**: Select from available colors with visual swatches
- **Price Updates**: Price dynamically adjusts based on size selection
- **Add to Cart**: Button with success confirmation

### Admin Dashboard
- Navigate to `/admin/add-product`
- **Security**: Enter password to unlock (default: `admin@2024`)
- **Add Products**: Fill form with:
  - Product name and description
  - Base price in rupees
  - Categories (comma-separated)
  - Available sizes (comma-separated)
  - Available colors (comma-separated)
  - Product image URL
- Submit to add product (in demo mode, logs to console; production would save to DB)

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  'party-pink': '#FF1493',      // Main accent color
  'party-pink-light': '#FF69B4', // Hover state
  'party-dark': '#0F0F0F',      // Text color
}
```

### Categories (Navbar Dropdown)
Edit the `categories` array in `components/Navbar.tsx`:
```typescript
const categories = [
  'Latex Balloons',
  'Foil Balloons',
  // Add your categories here
]
```

### Admin Password
In `app/admin/add-product/page.tsx`, change:
```typescript
const ADMIN_PASSWORD = 'admin@2024'
```

## 🔧 Database Operations

### Prisma Commands
```bash
# Generate Prisma Client
npm run prisma:generate

# Create and apply migrations
npm run prisma:migrate

# Open Prisma Studio (GUI for database)
npm run prisma:studio

# Seed database (if seed script exists)
npm run prisma:seed
```

### Connect Different Database
Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  # or "mysql", "sqlserver"
  url      = env("DATABASE_URL")
}
```

Then update `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/party_ecommerce"
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components are fully responsive using Tailwind's `sm:`, `md:`, `lg:` prefixes.

## 🔐 Security Notes

### Important: Authentication
The current admin authentication is **demo-level only**. For production:
1. Use proper authentication (NextAuth.js, Clerk, Auth0, etc.)
2. Implement JWT or session-based auth
3. Add proper backend API protection
4. Never hardcode passwords

### Environment Variables
- Never commit `.env.local` to git
- Use `.env.example` as a template
- In production, use secure environment variable management

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms
- **Railway**: Connect GitHub repo, configure `.env` vars
- **Netlify**: Set build command to `npm run build`, output: `.next`
- **Docker**: Create Dockerfile with Node.js base image

## 📊 Performance

- **Image Optimization**: Next.js Image component ready
- **Code Splitting**: Automatic route-based code splitting
- **CSS Optimization**: Tailwind purges unused styles
- **Type Safety**: Full TypeScript for fewer runtime errors

## 🐛 Troubleshooting

### Port already in use
```bash
npm run dev -- -p 3001
```

### Prisma errors
```bash
rm prisma/dev.db
npm run prisma:migrate
```

### Build errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📝 Next Steps for Production

1. **Add Payment Gateway**: Integrate Razorpay, Stripe, or PayPal
2. **Implement Real Authentication**: Use NextAuth.js or similar
3. **Setup Email Service**: For order confirmations and notifications
4. **Add Search & Filters**: Product search and category filtering
5. **Implement Cart Persistence**: LocalStorage or database cart
6. **Add Order Management**: Track and manage customer orders
7. **Setup Analytics**: Google Analytics or similar
8. **CDN for Images**: Use Cloudinary or similar for image optimization

## 📄 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Database ORM**: Prisma 5.14
- **Database**: SQLite (development), PostgreSQL (production)
- **Package Manager**: npm

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and adapt this codebase for your needs!

## 📞 Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Prisma Documentation](https://www.prisma.io/docs)

---

**Built with ❤️ for modern e-commerce experiences**
