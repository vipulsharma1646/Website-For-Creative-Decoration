# Installation Checklist & Troubleshooting Guide

## ✅ Pre-Installation Checklist

Before you start, verify you have:

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm 9+ installed (`npm --version`)
- [ ] Git installed (optional but recommended)
- [ ] A code editor (VS Code recommended)
- [ ] 500MB+ free disk space
- [ ] Internet connection for downloading packages

## 📋 Installation Steps Checklist

### Step 1: Navigate to Project
- [ ] Open terminal
- [ ] Run `cd /Users/vipulsharma/Documents/projects/website`
- [ ] Verify you're in the right directory (`pwd`)

### Step 2: Install Dependencies
- [ ] Run `npm install`
- [ ] Wait for all packages to download (2-5 minutes)
- [ ] Check for any error messages
- [ ] Verify `node_modules/` folder was created

### Step 3: Environment Setup
- [ ] `.env.local` file exists in project root
- [ ] Contains `DATABASE_URL="file:./prisma/dev.db"`
- [ ] Contains `NODE_ENV="development"`

### Step 4: Initialize Database
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Verify Prisma Client was generated
- [ ] Check that `prisma/dev.db` was created

### Step 5: Start Development Server
- [ ] Run `npm run dev`
- [ ] See message: "✓ Ready in Xms"
- [ ] Server running on `http://localhost:3000`

### Step 6: Verify in Browser
- [ ] Open `http://localhost:3000` in browser
- [ ] Homepage loads without errors
- [ ] Product grid shows 6 products
- [ ] Navbar is visible

## ✨ Verification Steps

After installation, verify each feature:

### Homepage Features
- [ ] Hero section displays with pink banner
- [ ] "Shop Now" and "Learn More" buttons visible
- [ ] 6 product cards displayed in grid
- [ ] Trust metrics section at bottom
- [ ] Footer with company info

### Navigation
- [ ] Logo/brand name visible in navbar
- [ ] "Products" link visible
- [ ] Hover over "Products" → dropdown menu appears
- [ ] Categories listed: Latex Balloons, Foil Balloons, etc.
- [ ] "Admin" link visible (on desktop)
- [ ] Cart icon with "0" badge visible

### Product Details Page
- [ ] Click any product → Details page loads
- [ ] Product image displays on left
- [ ] Product details on right
- [ ] "5 inches" and "10 inches" size buttons visible
- [ ] Price shows ₹5 by default
- [ ] Click "10 inches" → Price changes to ₹10
- [ ] Color selector shows color options
- [ ] "Buy Now" button visible and clickable
- [ ] Click "Buy Now" → Button shows "✓ Added to Cart"

### Admin Panel
- [ ] Go to `http://localhost:3000/admin/add-product`
- [ ] See password lock screen
- [ ] "Admin Access" title visible
- [ ] Password input field visible
- [ ] Demo password hint shows: "admin@2024"
- [ ] Enter `admin@2024` → Admin form opens
- [ ] Form has fields: Title, Description, Price, Categories, Sizes, Colors, Image URL
- [ ] Fill form and click "Add Product"
- [ ] Success message appears (in demo mode)

## 🔧 Troubleshooting Guide

### Problem: Node.js/npm Not Found

**Error**: `command not found: node` or `npm: command not found`

**Solution**:
1. Download Node.js from https://nodejs.org/
2. Install the LTS version
3. Restart your terminal
4. Verify: `node --version` and `npm --version`

### Problem: npm install Hangs or Fails

**Error**: Stuck at "installing" or get network errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Try install again with verbose output
npm install --verbose

# If still fails, try:
npm install --legacy-peer-deps
```

### Problem: Prisma Generation Failed

**Error**: `Error: [P1009] Failed to infer a data source named "db"`

**Solution**:
```bash
# Delete any existing migrations
rm -rf prisma/migrations

# Regenerate
npx prisma generate

# Try migrate again
npx prisma migrate dev --name init
```

### Problem: Database Locked

**Error**: `database is locked` or similar

**Solution**:
```bash
# Close any other terminals running the app
# Delete the database file
rm prisma/dev.db

# Recreate it
npx prisma migrate dev --name init
```

### Problem: Port 3000 Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Use a different port
npm run dev -- -p 3001

# Or kill the process using port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Problem: Build Errors After Changes

**Error**: TypeScript errors or build failures

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Regenerate Prisma
npm run prisma:generate

# Try building again
npm run build

# Or just run dev
npm run dev
```

### Problem: Cannot Connect to Database

**Error**: `Error: Client is unable to connect to the database`

**Solution**:
1. Check `.env.local` has correct `DATABASE_URL`
2. For SQLite: Should be `file:./prisma/dev.db`
3. For PostgreSQL: Check credentials are correct
4. Verify database file exists: `ls prisma/dev.db`

### Problem: Page Shows 404

**Error**: `/products/[id]` or other routes show 404

**Solution**:
```bash
# Rebuild the app
npm run build

# Or restart dev server
npm run dev

# Note: Some dynamic routes might need IDs from database
```

### Problem: Styles Not Showing (Tailwind Not Working)

**Error**: Page loads but no styling, just plain HTML

**Solution**:
```bash
# Rebuild Tailwind CSS
npm run dev

# If still broken:
rm -rf .next
npm run dev

# Check that postcss.config.js exists
# Check that globals.css has @tailwind directives
```

### Problem: Admin Panel Won't Unlock

**Error**: "Incorrect password. Access denied."

**Solution**:
- Default password is `admin@2024` (lowercase)
- No spaces before or after
- If changed, check `app/admin/add-product/page.tsx`
- Search for `ADMIN_PASSWORD = `

### Problem: npm/npm Scripts Not Working

**Error**: `npm: command not found` or scripts error

**Solution**:
```bash
# Reinstall npm globally
npm install -g npm@latest

# Or use Node version manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

### Problem: TypeScript Errors in IDE

**Error**: Red squiggles in VS Code but app runs fine

**Solution**:
1. Restart VS Code
2. Run `npm run prisma:generate`
3. Delete `node_modules/.prisma` and reinstall: `npm install`

### Problem: Dependency Conflicts

**Error**: `npm ERR! peer dep missing` or similar

**Solution**:
```bash
# Try installing with legacy peer deps flag
npm install --legacy-peer-deps

# Or upgrade all packages
npm update
```

## 🆘 Still Stuck?

### Debug Steps

1. **Check the logs**
   ```bash
   # Run with verbose logging
   npm run dev -- --debug
   ```

2. **Verify file structure**
   ```bash
   # Check files exist
   ls -la app/
   ls -la components/
   ls -la prisma/
   ```

3. **Check environment**
   ```bash
   # Verify env file
   cat .env.local
   ```

4. **Test database connection**
   ```bash
   # Open Prisma Studio
   npm run prisma:studio
   ```

5. **Check Node.js version**
   ```bash
   node --version  # Should be v18+
   ```

### Get Help

1. Read the documentation files:
   - `README.md` - Overview
   - `SETUP.md` - Detailed setup
   - `DEVELOPMENT.md` - Architecture

2. Check error messages carefully
   - Full error message often tells you what to do
   - Google the error message

3. Verify prerequisites
   - Node.js version
   - npm version
   - Free disk space
   - Internet connection

4. Try a clean install
   ```bash
   rm -rf node_modules .next prisma/dev.db
   npm install
   npx prisma migrate dev --name init
   npm run dev
   ```

## 🎉 Success Indicators

You'll know everything is working when:

- ✅ No error messages in terminal
- ✅ `npm run dev` shows "✓ Ready in Xms"
- ✅ Browser at `http://localhost:3000` loads without errors
- ✅ Homepage shows products
- ✅ Product details page works
- ✅ Admin panel unlocks with password
- ✅ No red errors in browser console

## 📞 Quick Reference

| Issue | Command |
|-------|---------|
| Clear cache | `npm cache clean --force` |
| Reinstall | `rm -rf node_modules && npm install` |
| Reset database | `rm prisma/dev.db && npx prisma migrate dev` |
| View database | `npm run prisma:studio` |
| Clear build | `rm -rf .next` |
| Regenerate types | `npm run prisma:generate` |
| Kill server | Ctrl+C in terminal |
| Change port | `npm run dev -- -p 3001` |

---

Good luck! You've got this! 🚀
