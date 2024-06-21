import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { icons } from "@/utils/icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { levelConfig } from "@/utils/levelConfig";

interface Card {
  id: number;
  icon: IconDefinition;
  identifier: number;
  revealed: boolean;
}

const GameBoard = () => {
  const [level, setLevel] = useState({ row: 5, column: 4 });
  const [cards, setCards] = useState<Card[]>([]);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [disableClicks, setDisableClicks] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [moves, setMoves] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    const totalCards = level.row * level.column;

    // Modifying the icons selector a bit. Take a random index. If it's
    // greater than half the # of icons, then slice from random index backwards to the
    // amount of totalCards/2
    const randomIndex = Math.floor(Math.random() * 70);


    const shuffledIcons = icons.sort(() => Math.random());
    const selectedIcons =
    randomIndex < icons.length / 2
      ? shuffledIcons.slice(randomIndex, randomIndex + totalCards / 2)
      : shuffledIcons.slice(-randomIndex, (totalCards / 2) - randomIndex);

    const selectedCards = selectedIcons.map((icon, index) => ({
      icon,
      identifier: index,
    }));

    // Concatenaate arrays, then shuffle. The higher the number the easier it is
    const shuffledCards = [...selectedCards, ...selectedCards].sort(()=> Math.random());

    const newCards = shuffledCards.map((card, index) => ({
      id: index,
      icon: card.icon,
      identifier: card.identifier,
      revealed: false,
    }));

    setCards(newCards);
    setHasWon(false);
    setRevealedCards([]);
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
        setMistakes(mistakes + 1);
      } else {
        setRevealedCards([]);
        setDisableClicks(false);
      }
      setMoves(moves + 1);
    }

    if (cards.every((card) => card.revealed)) {
      setHasWon(true);
    }
  };

  return (
    <>
      <HStack spacing={4}>
        <Tag size="lg" variant="solid" colorScheme="teal">
          Mistakes: {mistakes}
        </Tag>
        <Tag size="lg" variant="solid" colorScheme="teal">
          Moves: {moves}
        </Tag>
      </HStack>
      <Text fontSize="2xl" color={hasWon ? "green" : "orange"}>
        {hasWon ? "You win!" : "You got this!"}
      </Text>
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
      <Flex>
        {levelConfig.map((config, index) => (
          <Button
            key={index}
            margin={4}
            onClick={() => {
              setLevel({ row: config.row, column: config.column });
            }}
          >
            {config.row}x{config.column}
          </Button>
        ))}
      </Flex>
    </>
  );
};

export default GameBoard;
