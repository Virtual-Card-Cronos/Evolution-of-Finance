import Link from "next/link";
import GiftCardItem from "./GiftCardItem";
import { giftCardsData } from "@/lib/giftCardData";

export default function GiftCardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {giftCardsData.map((card) => (
        <GiftCardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
