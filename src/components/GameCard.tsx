import { Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const GameCard = () => {
  return (
    <Box
      onClick={() => {
        console.log("clicked card");
      }}
      bg="blue"
      height="100px"
      width="100px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      _hover={{ opacity: 0.6, cursor: "pointer" }}
    >
      <FontAwesomeIcon icon={faCoffee} size="2x"
       />
    </Box>
  );
};

export default GameCard;
