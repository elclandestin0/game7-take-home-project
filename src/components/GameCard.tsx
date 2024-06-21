import { Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface GameCardProps {
    icon: IconDefinition;
    revealed: boolean;
    click: () => void;
  }


const GameCard: React.FC<GameCardProps> = ({icon, revealed, click}) => {
  return (
    <Box
      onClick={click}
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
