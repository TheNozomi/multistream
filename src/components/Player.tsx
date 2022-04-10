import { Box } from '@chakra-ui/react';
import useSize from '@react-hook/size';
import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

export function Player({ videoId, onReady }: {
  videoId: string;
  onReady: (event: any) => void;
}) {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, containerHeight] = useSize(playerContainerRef);
  const [playerHeight, setPlayerHeight] = useState(0);
  
  useEffect(() => {
    const aspectRatio = 16 / 9;
    const height = Math.round(((containerWidth)/(Math.sqrt((Math.pow(aspectRatio, 2)+1)))));
    setPlayerHeight(height);
  }, [containerWidth]);

  return (
    <Box ref={playerContainerRef}>
      <YouTube
        videoId={videoId}
        opts={{ height: `${playerHeight}px`, width: '100%' }}
        onReady={onReady}
      />
    </Box>
  );
}
