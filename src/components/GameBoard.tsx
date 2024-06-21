import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const GameBoard = () => {
  const [level, setLevel] = useState({ row: 5, column: 6 });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const totalCards = level.row * level.column;
    const newCards = [];
    for (let i = 0; i < totalCards; i++) {
      newCards.push(<Box bg="tomato" height="150px" width="100px"></Box>);
      console.log("pushed a card");
    }
    setCards(cards);
  }, [level]);

  return (
    <SimpleGrid
      columns={level.column}
      row={level.row}
      spacingX="80px"
      spacingY="20px"
    >
      {cards}
    </SimpleGrid>
  );
};

export default GameBoard;
