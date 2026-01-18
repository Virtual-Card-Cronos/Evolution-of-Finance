# Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- Git installed
- A Neon database account (free at https://neon.tech)

## Step-by-Step Setup

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/Virtual-Card-Cronos/Evolution-of-Finance.git
cd Evolution-of-Finance
npm install
```

### 2. Create Your Neon Database
1. Visit https://neon.tech
2. Sign up for a free account
3. Create a new project (any name)
4. Copy your connection string (it looks like this):
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
   ```

### 3. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and paste your connection string
# Replace the placeholder with your actual Neon connection string
```

Your `.env.local` should look like:
```
DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```

### 4. Initialize Database Schema
```bash
# This creates the cart_items table in your Neon database
npm run db:push
```

You should see:
```
✓ Done!
```

### 5. Start the Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Testing the Cart

### Adding Items to Cart
1. Go to "Gift Cards" page
2. Click on any gift card (e.g., Amazon)
3. Select an amount (e.g., $50)
4. Set quantity (e.g., 2)
5. Click "Add to Cart"
6. ✅ You should see an alert and be redirected to cart
7. ✅ The cart should show your items

### Cart Features to Test
- **Cart Count**: Check header shows "Cart (2)" or similar
- **View Cart**: Go to /cart to see all items
- **Update Quantity**: Use +/- buttons to change quantity
- **Remove Items**: Click X button to remove
- **Persistence**: Refresh the page - items should remain
- **Multiple Amounts**: Add the same card with different amounts - they appear as separate items

### What Happens Behind the Scenes

When you click "Add to Cart":
1. Frontend sends POST request to `/api/cart` with item details
2. Backend checks if item already exists:
   - If exact match (same card + amount): increases quantity
   - Otherwise: creates new cart entry
3. Data saved to Neon database
4. Cart count refreshes in header
5. Page redirects to cart view

## Troubleshooting

### "Failed to add item to cart"
- Check that DATABASE_URL is set in `.env.local`
- Verify Neon database is accessible (check Neon dashboard)
- Check browser console for errors

### "Error fetching cart items"
- Verify `npm run db:push` completed successfully
- Check that `cart_items` table exists in Neon dashboard
- Verify DATABASE_URL format is correct

### Cart count shows 0 but items exist
- Refresh the page
- Check browser console for API errors
- Verify `/api/cart` returns data (open in new tab)

### Database connection errors
- Ensure Neon database is active (check dashboard)
- Verify connection string includes `?sslmode=require`
- Check for typos in DATABASE_URL

## Optional: Explore Your Database

### View Database in Browser
```bash
npm run db:studio
```
Opens Drizzle Studio at http://localhost:4983

### Check Database Contents
In Neon dashboard:
1. Go to your project
2. Click "Tables"
3. Find "cart_items"
4. Click to view data

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add DATABASE_URL as environment variable in deployment platform
2. Run build: `npm run build`
3. Deploy

The database will be shared across all deployments using the same DATABASE_URL.

## Next Steps

Now that cart is working, you can:
- Add user authentication (to track carts per user)
- Implement checkout/payment
- Add order history
- Set up email notifications
- Add cart expiration

## Need Help?

- Check IMPLEMENTATION.md for technical details
- Review API routes in `app/api/cart/`
- Check database schema in `lib/db/schema.ts`
- Look at frontend implementation in `app/cart/page.tsx`

Happy coding! 🚀
