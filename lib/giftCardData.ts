export interface GiftCard {
  id: number;
  name: string;
  category: string;
  image: string;
  minValue: number;
  maxValue: number;
  featured: boolean;
  description?: string;
}

export const giftCardsData: GiftCard[] = [
  {
    id: 1,
    name: "Amazon",
    category: "Shopping",
    image: "🛒",
    minValue: 10,
    maxValue: 500,
    featured: true,
    description: "Shop for millions of products on Amazon with this digital gift card. Perfect for any occasion!",
  },
  {
    id: 2,
    name: "Netflix",
    category: "Entertainment",
    image: "🎬",
    minValue: 15,
    maxValue: 100,
    featured: true,
    description: "Stream unlimited movies and TV shows with a Netflix gift card. Entertainment at your fingertips!",
  },
  {
    id: 3,
    name: "Spotify",
    category: "Music",
    image: "🎵",
    minValue: 10,
    maxValue: 100,
    featured: true,
    description: "Enjoy millions of songs and podcasts with Spotify Premium. Music for every mood!",
  },
  {
    id: 4,
    name: "Starbucks",
    category: "Food & Dining",
    image: "☕",
    minValue: 5,
    maxValue: 200,
    featured: true,
    description: "Get your favorite coffee and treats at Starbucks. The perfect gift for coffee lovers!",
  },
  {
    id: 5,
    name: "Steam",
    category: "Gaming",
    image: "🎮",
    minValue: 10,
    maxValue: 100,
    featured: true,
    description: "Buy games, software, and more on Steam. The ultimate gaming platform!",
  },
  {
    id: 6,
    name: "iTunes",
    category: "Entertainment",
    image: "🎧",
    minValue: 10,
    maxValue: 200,
    featured: true,
    description: "Purchase music, movies, apps, and more from the iTunes Store.",
  },
  {
    id: 7,
    name: "Google Play",
    category: "Apps & Games",
    image: "📱",
    minValue: 10,
    maxValue: 200,
    featured: true,
    description: "Get apps, games, movies, and more from Google Play Store.",
  },
  {
    id: 8,
    name: "Uber",
    category: "Transportation",
    image: "🚗",
    minValue: 15,
    maxValue: 200,
    featured: true,
    description: "Ride with Uber or get food delivered with Uber Eats.",
  },
  {
    id: 9,
    name: "Target",
    category: "Shopping",
    image: "🎯",
    minValue: 10,
    maxValue: 500,
    featured: false,
    description: "Shop for everything you need at Target stores or online.",
  },
  {
    id: 10,
    name: "Walmart",
    category: "Shopping",
    image: "🏪",
    minValue: 10,
    maxValue: 500,
    featured: false,
    description: "Save money and live better with a Walmart gift card.",
  },
  {
    id: 11,
    name: "PlayStation",
    category: "Gaming",
    image: "🕹️",
    minValue: 10,
    maxValue: 100,
    featured: false,
    description: "Buy the latest games and add-ons for your PlayStation console.",
  },
  {
    id: 12,
    name: "Xbox",
    category: "Gaming",
    image: "🎯",
    minValue: 10,
    maxValue: 100,
    featured: false,
    description: "Purchase games, movies, and more for your Xbox console.",
  },
];

export const categories = [
  "All",
  "Shopping",
  "Entertainment",
  "Gaming",
  "Food & Dining",
  "Music",
  "Apps & Games",
  "Transportation",
];
