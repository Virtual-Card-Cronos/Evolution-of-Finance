# VirtualCards - Digital Gift Card Platform

A modern, full-stack Next.js application for purchasing virtual gift cards from popular brands. Built with TypeScript, Tailwind CSS, and anime.js for smooth animations.

![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=flat&logo=tailwind-css)
![anime.js](https://img.shields.io/badge/anime.js-4.2+-FF6B6B?style=flat)

## ✨ Features

- 🎁 **Browse & Search Gift Cards** - Filter by category, search by name
- ⚡ **Instant Digital Delivery** - Simulated instant delivery system
- 🛒 **Shopping Cart** - Full cart functionality with persistent storage
- 💳 **Multiple Payment Options** - Payment gateway placeholder
- 📱 **Fully Responsive** - Works on all device sizes
- 🎨 **Modern UI** - Clean design with Tailwind CSS
- 🌙 **Dark Mode** - System-aware theme with manual toggle
- 🎬 **Smooth Animations** - Powered by anime.js
- 💾 **Database Support** - Neon PostgreSQL with Drizzle ORM
- 🔄 **Demo Mode** - Works without database for quick testing

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16+ with App Router |
| **Language** | TypeScript 5.9+ |
| **Styling** | Tailwind CSS 3.4+ |
| **Animations** | anime.js 4.2+ |
| **Database** | Neon (Serverless PostgreSQL) |
| **ORM** | Drizzle ORM |
| **State** | React Context API |

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **Git** - [Download](https://git-scm.com/)
- (Optional) **Neon Account** - [Sign up](https://neon.tech/) for database features

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Virtual-Card-Cronos/Evolution-of-Finance.git
   cd Evolution-of-Finance/front_end
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional - for database features)
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local and add your Neon database URL
   # DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
   ```

4. **Push database schema** (Only if using database)
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Mode (No Database Required)

The app runs in demo mode by default if no `DATABASE_URL` is configured:
- Cart data is stored in memory
- All features work without external dependencies
- Data resets on server restart

## 📁 Project Structure

```
front_end/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── cart/             # Cart CRUD endpoints
│   ├── cards/                # Gift cards pages
│   │   ├── [id]/             # Individual card detail
│   │   └── page.tsx          # Cards browse page
│   ├── cart/                 # Shopping cart page
│   ├── about/                # About page
│   ├── contact/              # Contact form
│   ├── faq/                  # FAQ page
│   ├── how-it-works/         # How it works guide
│   ├── terms/                # Terms of service
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Homepage
├── components/               # React components
│   ├── CartProvider.tsx      # Cart context provider
│   ├── FeaturesSection.tsx   # Animated features grid
│   ├── Footer.tsx            # Site footer
│   ├── GiftCardGrid.tsx      # Animated card grid
│   ├── GiftCardItem.tsx      # Individual card component
│   ├── Header.tsx            # Navigation header
│   ├── HeroSection.tsx       # Animated hero banner
│   └── ThemeProvider.tsx     # Theme context provider
├── hooks/                    # Custom React hooks
│   └── useAnimation.ts       # Animation hooks
├── lib/                      # Utility libraries
│   ├── animations.ts         # anime.js utilities
│   ├── cart-storage.ts       # In-memory cart storage
│   ├── giftCardData.ts       # Gift card catalog
│   ├── theme.ts              # Theme utilities
│   └── db/                   # Database
│       ├── index.ts          # DB connection
│       └── schema.ts         # Drizzle schema
├── drizzle/                  # Database migrations
├── public/                   # Static assets
└── package.json              # Dependencies
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run db:generate` | Generate database migrations |
| `npm run db:migrate` | Run database migrations |
| `npm run db:push` | Push schema changes to database |
| `npm run db:studio` | Open Drizzle Studio (DB GUI) |

## 🎬 Animation System

The project uses **anime.js** for performant animations. Animation utilities are organized in:

- **`lib/animations.ts`** - Core animation functions
  - `fadeIn()`, `fadeOut()` - Fade animations
  - `scaleIn()`, `pulse()` - Scale animations
  - `slideInLeft()`, `slideInRight()` - Slide animations
  - `staggerFadeIn()`, `staggerScaleIn()` - Staggered animations
  - `animateHeroSection()` - Hero entrance
  - `animateNumber()` - Counter animations

- **`hooks/useAnimation.ts`** - React hooks
  - `useFadeIn()` - Fade-in on mount
  - `useScaleIn()` - Scale-in on mount
  - `useStaggerAnimation()` - Staggered children
  - `useHeroAnimation()` - Hero section
  - `useHoverScale()` - Hover effects
  - `useScrollAnimation()` - Scroll-triggered

### Example Usage

```tsx
import { useHeroAnimation, useFadeIn } from '@/hooks/useAnimation';

function MyComponent() {
  const { ref: heroRef } = useHeroAnimation();
  const { ref: contentRef } = useFadeIn({ delay: 200 });
  
  return (
    <section ref={heroRef}>
      <h1>Welcome</h1>
      <div ref={contentRef}>Animated content</div>
    </section>
  );
}
```

## 🎨 Theme System

Dark mode is fully supported with:

- **System preference detection** - Automatically matches OS theme
- **Manual toggle** - Users can override system preference
- **Persistent storage** - Saves preference in localStorage
- **Flash prevention** - Script runs before React hydration

Toggle theme using the moon/sun icon in the navigation header.

## 🛒 Cart System

The shopping cart supports two modes:

### Database Mode (Production)
- Requires `DATABASE_URL` environment variable
- Persists across sessions and restarts
- Uses Neon PostgreSQL with Drizzle ORM

### In-Memory Mode (Demo)
- No configuration required
- Data resets on server restart
- Perfect for local development and demos

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the `front_end` directory:

```env
# Database URL (optional - enables persistent storage)
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
```

### Database Setup with Neon

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to `.env.local` as `DATABASE_URL`
5. Run `npm run db:push` to create tables

## 🧪 Development

### Code Style

- TypeScript strict mode enabled
- ESLint with Next.js config
- Consistent file naming (PascalCase for components)
- JSDoc comments for all exported functions

### Adding New Gift Cards

Edit `lib/giftCardData.ts`:

```typescript
export const giftCardsData: GiftCard[] = [
  // Add new card
  {
    id: 13,
    name: "Disney+",
    category: "Entertainment",
    image: "🏰",
    minValue: 25,
    maxValue: 200,
    featured: true,
    description: "Stream Disney movies and shows!",
  },
  // ... existing cards
];
```

### Creating New Animations

1. Add to `lib/animations.ts`:
```typescript
export function myAnimation(targets: string) {
  return anime({
    targets,
    opacity: [0, 1],
    duration: 500,
  });
}
```

2. Or create a hook in `hooks/useAnimation.ts`:
```typescript
export function useMyAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  // ... implementation
  return ref;
}
```

## 📄 License

ISC License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- Create an issue for bug reports
- Use discussions for questions
- Check FAQ at `/faq` for common questions

---

Built with ❤️ using Next.js and anime.js