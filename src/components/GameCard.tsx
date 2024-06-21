import { Box } from "@chakra-ui/react";

const GameCard = () => {
  return (
    <Box
      onClick={() => {
        console.log("clicked card");
      }}
      bg="blue"
      height="100px"
      width="100px"
      _hover={{ opacity: 0.6, cursor: "pointer" }}
    ></Box>
  );
};

export default GameCard;
