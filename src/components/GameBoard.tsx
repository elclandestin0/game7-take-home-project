import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { icons } from "@/utils/icons";

const GameBoard = () => {
  const [level, setLevel] = useState({ row: 3, column: 4 });
  const [cards, setCards] = useState([]);
  const [revealedCards, setRevealedCards] = useState([]);
  const [disableClicks, setDisableClicks] = useState(false);

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

    const pairedIcons = selectedIcons.map((icon, index) => ({
      icon,
      identifier: index,
    }));

    // Concatenaate arrays, then shuffle. The higher the number the easier it is
    const shuffledCards = [...pairedIcons, ...pairedIcons].sort(
      () => Math.random() - 0.2
    );
    const newCards = shuffledCards.map((card, index) => ({
      id: index,
      icon: card.icon,
      identifier: card.identifier,
      revealed: false,
    }));

    setCards(newCards);
  }, [level]);

  const handleCardClick = (index: number) => {
    if (disableClicks || cards[index].revealed) return;
    const newCards = [...cards];
    newCards[index].revealed = true;
    setCards(newCards);

    const newRevealedCards = [...revealedCards, index];
    console.log(newRevealedCards);
    setRevealedCards(newRevealedCards);
    // Set a timer for 1 second if the cards aren't equal to each other then make the unequal to each other
    if (newRevealedCards.length === 2) {
      setDisableClicks(true);
      const [firstIndex, secondIndex] = newRevealedCards;
      if (
        newCards[firstIndex].identifier !== newCards[secondIndex].identifier
      ) {
        setTimeout(() => {
          newCards[firstIndex].revealed = false;
          newCards[secondIndex].revealed = false;
          setCards(newCards);
          setRevealedCards([]);
          setDisableClicks(false);
        }, 1000);
      } else {
        setRevealedCards([]);
        setDisableClicks(false);
      }
    }
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
