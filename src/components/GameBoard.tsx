import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { icons } from "@/utils/icons";

const GameBoard = () => {
  const [level, setLevel] = useState({ row: 5, column: 6 });
  const [cards, setCards] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);

  useEffect(() => {
    const totalCards = level.row * level.column;

    // Modifying the icons selector a bit. Take a random index. If it's
    // greater than half the # of icons, then slice from random index backwards to the
    // amount of totalCards/2
    const randomIndex = Math.floor(Math.random() * 70);
    const selectedIcons =
      randomIndex < 35
        ? icons.slice(randomIndex, randomIndex + totalCards / 2)
        : icons.slice(-randomIndex, totalCards / 2 - randomIndex);

    const pairedIcons = selectedIcons.map(
      (icon, index) => ({
        icon,
        identifier: index,
      })
    );

    // Concatenaate arrays, then shuffle. The higher the number the easier it is
    const shuffledCards = [...pairedIcons, ...pairedIcons].sort(() => Math.random() - 0.2);
    const newCards = shuffledCards.map((card, index) => ({
      id: index,
      icon: card.icon,
      identifier: card.identifier,
      revealed: false,
    }));

    setCards(newCards);
  }, [level]);

  const handleCardClick = (index: number) => {
    const newCards = [...cards];
    newCards[index].revealed = true;
    setCards(newCards);
    console.log(cards);
    const cardsRevealed = revealedCards;
    cardsRevealed.push(cards[index].identifier)
    setRevealedCards(cardsRevealed);
    if (cardsRevealed.length > 2) {
        setRevealedCards([]);
    }
    console.log(revealedCards);
  };

  return (
    <SimpleGrid
      columns={level.column}
      row={level.row}
      spacingX="20px"
      spacingY="20px"
    >
      {cards.map((card, index) => (
        <GameCard
          key={card.id}
          icon={card.icon}
          revealed={card.revealed}
          click={() => handleCardClick(index)}
        />
      ))}
    </SimpleGrid>
  );
};

export default GameBoard;
