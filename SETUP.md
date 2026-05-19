# Setup Instructions for Party Propz

This guide will walk you through setting up the Party Propz e-commerce website on your local machine.

## Prerequisites

Before you start, make sure you have:

- **Node.js** (version 18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** (comes with Node.js)
- **Git** (optional, for version control)
- A text editor or IDE (VS Code recommended)

### Verify Installation

```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

## Step-by-Step Setup

### 1. Navigate to Project Directory

```bash
cd /Users/vipulsharma/Documents/projects/website
```

### 2. Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Prisma ORM
- And other dependencies

**Expected time**: 2-5 minutes depending on internet speed

### 3. Setup Environment Variables

Create a `.env.local` file from the template:

```bash
cp .env.example .env.local
```

The `.env.local` file will look like:

```
DATABASE_URL="file:./prisma/dev.db"
NODE_ENV="development"
```

For **SQLite** (default, recommended for development):
- Keep `DATABASE_URL="file:./prisma/dev.db"`
- No additional setup needed

For **PostgreSQL** (for production):
```
DATABASE_URL="postgresql://username:password@localhost:5432/party_ecommerce"
```

### 4. Initialize Prisma and Database

Generate Prisma client and create the database:

```bash
# Generate Prisma Client
npx prisma generate

# Create migrations and set up database
npx prisma migrate dev --name init
```

When prompted for migration name, press Enter to use the default or type `init`.

This will:
- Create `prisma/dev.db` (SQLite database file)
- Generate Prisma client types
- Set up database tables

### 5. Start Development Server

```bash
npm run dev
```

You should see output like:

```
> next dev
  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
```

### 6. Open in Browser

Open your web browser and navigate to:

```
http://localhost:3000
```

You should see the Party Propz homepage! 🎉

## Verify Everything Works

### Homepage
- ✅ Hero section loads
- ✅ Product grid displays 6 products
- ✅ Navbar shows "Products" link

### Navbar
- ✅ Hover over "Products" → Mega menu appears
- ✅ Click on a category → Navigate to products page

### Product Details
- ✅ Click on any product → Product details page loads
- ✅ Size buttons (5", 10") → Price changes when clicked
- ✅ Color buttons → Selection updates
- ✅ "Buy Now" button → Changes to "✓ Added to Cart"

### Admin Panel
- ✅ Go to `http://localhost:3000/admin/add-product`
- ✅ See password lock screen
- ✅ Enter password: `admin@2024`
- ✅ Access admin form

## Common Commands

### Development

```bash
# Start dev server
npm run dev

# Run in production mode (after build)
npm run build
npm run start

# Check for errors
npm run lint
```

### Database

```bash
# Open Prisma Studio (GUI for database)
npm run prisma:studio

# Create new migration (after schema changes)
npm run prisma:migrate

# Reset database (WARNING: deletes all data)
npx prisma db push --skip-generate
npx prisma db seed (if seed script exists)
```

## Project Structure Overview

```
website/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   ├── products/
│   │   ├── page.tsx         # Products listing
│   │   └── [id]/            # Dynamic product page
│   ├── admin/
│   │   └── add-product/     # Admin dashboard
│   └── api/                 # API routes
│
├── components/              # React components
│   ├── Navbar.tsx          # Navigation bar
│   └── ProductCard.tsx     # Product card
│
├── lib/                     # Utilities
│   ├── db.ts               # Prisma client
│   ├── utils.ts            # Helper functions
│   └── types.ts            # TypeScript types
│
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── dev.db              # SQLite database (created after setup)
│
└── public/                 # Static files
```

## Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  'party-pink': '#FF1493',      // Change main pink
  'party-pink-light': '#FF69B4', // Change light pink
  'party-dark': '#0F0F0F',      // Change dark color
}
```

### Change Logo

In `components/Navbar.tsx`, replace the logo section:

```tsx
// Current: Pink gradient circle with "P"
// Change to: Your company logo or custom design
```

### Change Categories in Dropdown

In `components/Navbar.tsx`:

```typescript
const categories = [
  'Your Category 1',
  'Your Category 2',
  'Your Category 3',
  // Add more...
]
```

### Change Admin Password

In `app/admin/add-product/page.tsx`:

```typescript
const ADMIN_PASSWORD = 'your-new-password' // Change this
```

## Troubleshooting

### Port 3000 Already in Use

```bash
# Use different port
npm run dev -- -p 3001

# Or kill the process using port 3000
# macOS:
lsof -ti:3000 | xargs kill -9

# Linux:
fuser -k 3000/tcp

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Errors

```bash
# If you get "database is locked" error:
rm prisma/dev.db
npm run prisma:migrate

# If Prisma Client is out of sync:
npm run prisma:generate
npm install
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

### TypeScript Errors

Ensure you have latest TypeScript:

```bash
npm install -D typescript@latest
npm run prisma:generate
```

## Next Steps

1. **Add Sample Products**: Use the admin panel to add some test products
2. **Connect Payment Gateway**: Integrate Razorpay or Stripe
3. **Setup Authentication**: Add user login/registration
4. **Deploy**: Push to Vercel, Railway, or your hosting platform
5. **Add Features**: Search, filters, shopping cart, checkout

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production database, set DATABASE_URL in Vercel dashboard
```

### Deploy to Railway

1. Connect your GitHub repo
2. Set `DATABASE_URL` environment variable
3. Railway will auto-detect and run setup

### Deploy to Other Services

- **Netlify**: Connect GitHub repo, set build command to `npm run build`
- **Docker**: Create Dockerfile using Node.js base image
- **Traditional Server**: Install Node.js, push code, run `npm run build && npm start`

## Getting Help

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com
- **Prisma Docs**: https://www.prisma.io/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs/

## Important Security Notes

⚠️ **Before Going to Production:**

1. **Change Admin Password**: Don't use `admin@2024`
2. **Use Proper Authentication**: Implement NextAuth.js or OAuth
3. **Secure Database**: Use PostgreSQL with strong credentials
4. **Enable HTTPS**: Always use HTTPS in production
5. **Hide Environment Variables**: Never commit `.env.local`
6. **Set Strong Headers**: Configure security headers
7. **Add Input Validation**: Validate all user inputs
8. **Rate Limiting**: Implement rate limiting on API endpoints

---

**You're all set! Start building your e-commerce empire! 🚀**
