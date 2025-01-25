import React, { useState } from "react";
import "./PlanningPoker.css";

interface Card {
  value: string;
}

const PlanningPoker: React.FC = () => {
  const cards: Card[] = [
    { value: "0" },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "5" },
    { value: "8" },
    { value: "13" },
    { value: "21" },
    { value: "34" },
    { value: "55" },
    { value: "89" },
    { value: "?" },
  ];

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleSelectCard = (cardValue: string) => {
    setSelectedCard(cardValue === selectedCard ? null : cardValue);
  };

  return (
    <div className="container w-full h-screen flex flex-col">
    <div className="flex-grow">
      {/* Other content goes here */}
    </div>
    <div className="card-grid-container flex justify-center items-end">
      <div className="card-grid flex space-x-4">
        {cards.map((card) => (
          <div
            key={card.value}
            className={`card ${selectedCard === card.value ? "selected" : ""}`}
            onClick={() => handleSelectCard(card.value)}
          >
            {card.value}
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default PlanningPoker;
