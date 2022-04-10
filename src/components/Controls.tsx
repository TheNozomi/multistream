import React, { useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  useNumberInput
} from '@chakra-ui/react';
import { MdPlayArrow, MdPause } from 'react-icons/md';

export function Controls({ playerCount, setPlayerCount, handlePlay, handlePause }: {
  playerCount: number;
  setPlayerCount: (count: number) => void;
  handlePlay: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handlePause: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, value } =
    useNumberInput({
      defaultValue: playerCount,
      min: 1,
      max: 9999
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    const inputValue = parseInt(value, 10);
    if (inputValue !== playerCount) {
      setPlayerCount(inputValue);
    }
  }, [value]);  

  return (
    <Flex paddingY="2rem" gap="2rem">
      <ButtonGroup spacing="2">
        <IconButton colorScheme="teal" aria-label="Reproducir" icon={<MdPlayArrow />} onClick={handlePlay}>Play</IconButton>
        <IconButton aria-label="Pausa" icon={<MdPause />} onClick={handlePause} />
      </ButtonGroup>

      <HStack maxW="170">
        <Button {...dec}>-</Button>
        <Input {...input} />
        <Button {...inc}>+</Button>
      </HStack>
    </Flex>
  );
}
