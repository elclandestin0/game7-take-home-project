import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { icons } from "@/utils/icons";

const GameBoard = () => {
  const [level, setLevel] = useState({ row: 5, column: 6 });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const totalCards = level.row * level.column;

    // Modifying the icons selector a bit. Take a random index. If it's
    // greater than half the # of icons, then slice from random index backwards to the
    // amount of totalCards/2
    const randomIndex = Math.floor(Math.random() * 70);
    const selectedIcons =
      randomIndex < 35
        ? icons.slice(randomIndex, randomIndex + totalCards / 2)
        : icons.slice(-randomIndex, (totalCards / 2) - randomIndex);

    // Shuffling based 
    const shuffledCards = [...selectedIcons, ...selectedIcons].sort(() => Math.random() - 0.2);
    const newCards = shuffledCards.map((icon, index) => ({
      id: index,
      icon,
    }));

    setCards(newCards);
  }, [level]);

  return (
    <SimpleGrid
      columns={level.column}
      row={level.row}
      spacingX="20px"
      spacingY="20px"
    >
      {cards.map((card, index) => (
        <GameCard key={card.id} icon={card.icon} />
      ))}
    </SimpleGrid>
  );
};

export default GameBoard;
