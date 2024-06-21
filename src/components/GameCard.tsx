import { Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const GameCard = ({icon, revealed}) => {
  return (
    <Box
      onClick={() => {
        console.log("clicked card");
        revealed = true;
      }}
      bg="blue"
      height="100px"
      width="100px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      _hover={{ opacity: 0.6, cursor: "pointer" }}
    >
      {revealed ? <FontAwesomeIcon icon={icon} size="2x" /> : ""}
    </Box>
  );
};

export default GameCard;
