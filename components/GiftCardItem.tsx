import Link from "next/link";
import { GiftCard } from "@/lib/giftCardData";

interface GiftCardItemProps {
  card: GiftCard;
}

export default function GiftCardItem({ card }: GiftCardItemProps) {
  return (
    <Link href={`/cards/${card.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden">
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 h-48 flex items-center justify-center text-6xl">
          {card.image}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-1">{card.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{card.category}</p>
          <p className="text-sm text-gray-600">
            ${card.minValue} - ${card.maxValue}
          </p>
        </div>
      </div>
    </Link>
  );
}
