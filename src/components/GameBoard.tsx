import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { icons } from "@/utils/icons";

const GameBoard = () => {
  const [level, setLevel] = useState({ row: 5, column: 6 });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const totalCards = level.row * level.column;
    const selectedIcons = icons.slice(0, totalCards / 2);
    const newCards = selectedIcons.map((icon, index) => ({
      id: index,
      icon,
    }));

    // for (let i = 0; i < totalCards; i++) {
    // //   newCards.push(<GameCard/>);
    //   console.log("pushed a card");
    // }
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
        <GameCard
          key={card.id}
          icon={card.icon}
        />
      ))}
    </SimpleGrid>
  );
};

export default GameBoard;
