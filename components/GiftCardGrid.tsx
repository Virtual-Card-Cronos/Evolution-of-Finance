import Link from "next/link";
import GiftCardItem from "./GiftCardItem";

// Sample gift card data
const giftCards = [
  {
    id: 1,
    name: "Amazon",
    category: "Shopping",
    image: "🛒",
    minValue: 10,
    maxValue: 500,
    featured: true,
  },
  {
    id: 2,
    name: "Netflix",
    category: "Entertainment",
    image: "🎬",
    minValue: 15,
    maxValue: 100,
    featured: true,
  },
  {
    id: 3,
    name: "Spotify",
    category: "Music",
    image: "🎵",
    minValue: 10,
    maxValue: 100,
    featured: true,
  },
  {
    id: 4,
    name: "Starbucks",
    category: "Food & Dining",
    image: "☕",
    minValue: 5,
    maxValue: 200,
    featured: true,
  },
  {
    id: 5,
    name: "Steam",
    category: "Gaming",
    image: "🎮",
    minValue: 10,
    maxValue: 100,
    featured: true,
  },
  {
    id: 6,
    name: "iTunes",
    category: "Entertainment",
    image: "🎧",
    minValue: 10,
    maxValue: 200,
    featured: true,
  },
  {
    id: 7,
    name: "Google Play",
    category: "Apps & Games",
    image: "📱",
    minValue: 10,
    maxValue: 200,
    featured: true,
  },
  {
    id: 8,
    name: "Uber",
    category: "Transportation",
    image: "🚗",
    minValue: 15,
    maxValue: 200,
    featured: true,
  },
];

export default function GiftCardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {giftCards.map((card) => (
        <GiftCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
