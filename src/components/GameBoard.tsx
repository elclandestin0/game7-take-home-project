import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const GameBoard = () => {
  useEffect(() => {
    console.log("GameBoard loaded!");
  }, []);

  return <Text fontSize="xl">GameBoard</Text>;
};

export default GameBoard;
