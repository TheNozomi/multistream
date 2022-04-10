import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Container,
  Link,
  SimpleGrid,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHardwareConcurrency } from 'react-adaptive-hooks/hardware-concurrency';
import YouTube from 'react-youtube';

import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Player } from './components/Player';

function App() {
  const toast = useToast();
  const hardwareConcurrency = useHardwareConcurrency();
  const [playerCount, setPlayerCount] = useState(hardwareConcurrency.numberOfLogicalProcessors ?? 4);
  const [players, setPlayers] = useState([]);

  const params = new URLSearchParams(window.location.search),
    idParam = params.get('video') || '';

  useEffect(() => {
    if (hardwareConcurrency.numberOfLogicalProcessors) {
      toast({
        description: `En base al rendimiento de tu equipo, se han creado ${hardwareConcurrency.numberOfLogicalProcessors} reproductores. Puedes cambiar esto en los controles.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [hardwareConcurrency.numberOfLogicalProcessors]);

  const onPlayerReady = (event: any) => {
    setPlayers(players.concat(event.target));
  }

  const handlePlay = () => {
    players.forEach((player: YouTube) => {
      // @ts-expect-error
      player.playVideo();
    });
  }

  const handlePause = () => {
    players.forEach((player) => {
      // @ts-expect-error
      player.pauseVideo();
    });
  }

  return (
    <div className="app">
      <Header />
      <Container maxW="95vw" marginBottom="2rem">
        {idParam ? (
          <>
            <Controls
              playerCount={playerCount}
              setPlayerCount={(count) => setPlayerCount(count)}
              handlePlay={handlePlay}
              handlePause={handlePause}
            />
            <SimpleGrid minChildWidth="320px" spacing="24px">
              {
                Array.from({ length: playerCount }, (_, k) => (
                  <Player key={k} videoId={idParam} onReady={onPlayerReady} />
                ))
              }
            </SimpleGrid>
          </>
        ) : (
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            my="2rem"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              No video ID
            </AlertTitle>
            <AlertDescription maxWidth="md">
              Agrega un ID de video en la URL para reproducirlo. Ejemplo:<br />
              <Link href={`${new URL(location.pathname, location.href).href}?video=87fKv045u5U`}>
                <code>{`${new URL(location.pathname, location.href).href}?video=87fKv045u5U`}</code>
              </Link>
            </AlertDescription>
          </Alert>
        )}
      </Container>
    </div>
  );
}

export default App
