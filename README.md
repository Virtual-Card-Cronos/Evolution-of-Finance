# Virtual Gift Card Platform

A Next.js-based digital gift card marketplace inspired by CakePay, allowing users to purchase virtual gift cards from popular brands.

## Features

- 🎁 Browse and search gift cards from popular brands
- ⚡ Instant digital delivery
- 🛒 Shopping cart functionality
- 💳 Multiple payment options (placeholder)
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React components with client/server composition

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Virtual-Card-Cronos/Evolution-of-Finance-Frontend.git
cd Evolution-of-Finance-Frontend
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── cards/             # Gift cards browse and detail pages
│   ├── cart/              # Shopping cart page
│   ├── how-it-works/      # How it works page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── GiftCardGrid.tsx   # Gift card grid display
│   └── GiftCardItem.tsx   # Individual gift card component
└── public/               # Static assets
```

## Features Overview

### Home Page
- Hero section with call-to-action
- Feature highlights
- Popular gift cards showcase

### Gift Cards Browse
- Search functionality
- Category filtering
- Grid layout with card previews

### Gift Card Details
- Full card information
- Amount selection (preset and custom)
- Quantity selector
- Add to cart functionality

### How It Works
- Step-by-step guide
- Feature highlights

## Future Enhancements

- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Order history
- [ ] Email delivery system
- [ ] Admin dashboard
- [ ] Gift card redemption tracking
- [ ] Promotional codes
- [ ] Wishlist functionality

## License

ISC