# Booker Prototype (Netlify)

## Stack
- Next.js 15 (App Router), TypeScript, Tailwind
- Mock Auth (localStorage-based authentication)
- Client-side data (JSON files)
- Leaflet (branch finder map)

## Setup
1. Install deps
```bash
npm i
```

2. Dev server
```bash
npm run dev
```

**Note:** This is a frontend-only prototype. No database, environment variables, or backend setup required. All data is loaded from JSON files in `src/data/`.

## Test Users

The app uses mock authentication with predefined test users (see `src/lib/mock-users.ts`). You can sign in with either of these accounts:

**Primary Test User:**
- Email: `test@booker.com`
- Password: `Test123!`
- Business: Test Business

**Secondary Test User:**
- Email: `orders@goldenspoonrest.co.uk`
- Password: `Password123!`
- Business: The Golden Spoon Restaurant

## Notable Routes
- Discovery: `/fresh-meat`, `/beer`, `/greengrocery`
- Listings: `/fresh-meat/shop`, `/beer/shop`, `/greengrocery/shop`
- PDP: `/products/[sku]`
- Search: `/search` (autocomplete in header)
- Basket: `/basket`
- Checkout: `/checkout/(delivery|payment|review|confirmation)`
- Orders: `/account/orders`, `/account/orders/[id]`
- Branches: `/branches`, `/branches/[code]`

## Data Access

All data is accessed via client-side functions (no API routes):
- Products: `src/lib/data/products.ts` - `getProducts()`, `getProductBySku()`, `searchProducts()`
- Branches: `src/lib/data/branches.ts` - `getBranches()`, `getBranchByCode()`
- Basket: `src/lib/basket-localstorage.ts` - localStorage-based basket management
- Auth: `src/lib/mock-auth.ts` - localStorage-based authentication

## Notes
- Branch context defaults to MAN001 (Manchester Central) for prototype.
- Payment/emails simulated. All data is static/mock.
- Products and branches loaded from `src/data/products.json` and `src/data/branches.json`.
- Authentication uses localStorage (no server-side sessions).
- Basket persists in localStorage.

## Deploy (Vercel)
1. **Push to GitHub/GitLab/Bitbucket**
2. **Import project** in Vercel dashboard (https://vercel.com/new)
3. **Deploy**: Vercel auto-detects Next.js configuration
4. No environment variables needed for deployment
5. All features work out of the box (client-side auth, localStorage, dynamic routes)
