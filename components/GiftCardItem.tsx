import Link from "next/link";
import { GiftCard } from "@/lib/giftCardData";

interface GiftCardItemProps {
  card: GiftCard;
}

export default function GiftCardItem({ card }: GiftCardItemProps) {
  return (
    <Link href={`/cards/${card.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden">
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-700 dark:to-blue-700 h-48 flex items-center justify-center text-6xl">
          {card.image}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{card.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{card.category}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ${card.minValue} - ${card.maxValue}
          </p>
        </div>
      </div>
    </Link>
  );
}
