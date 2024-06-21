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
    // greater than half the # of icons, then slice from the index
    const randomIndex = Math.floor(Math.random() * 70);
    const selectedIcons =
      randomIndex < 35
        ? icons.slice(randomIndex, randomIndex + totalCards / 2)
        : icons.slice(-randomIndex, (totalCards / 2) - randomIndex);
    
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
        <GameCard key={card.id} icon={card.icon} />
      ))}
    </SimpleGrid>
  );
};

export default GameBoard;
