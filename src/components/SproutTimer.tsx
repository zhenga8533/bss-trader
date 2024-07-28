import { Box, Flex, Heading } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";

const SproutTimer = () => {
  const origin = 1722165900;
  const interval = 3 * 60 * 60; // 3 hours in seconds
  const now = Math.floor(Date.now() / 1000);
  const passed = Math.floor((now - origin) / interval);
  const start = origin + (passed + 1) * interval;
  const [timeLeft, setTimeLeft] = useState(start - now);
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = Math.floor(Date.now() / 1000);
      setTimeLeft(start - currentTime);
    };

    intervalId.current = setInterval(updateTimer, 1000);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [start]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeLeft(interval);
    }
  }, [timeLeft, interval]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const rainbowAnimation = css`
    @keyframes rainbow {
      0% {
        background-color: red;
      }
      14% {
        background-color: orange;
      }
      28% {
        background-color: yellow;
      }
      42% {
        background-color: green;
      }
      57% {
        background-color: blue;
      }
      71% {
        background-color: indigo;
      }
      85% {
        background-color: violet;
      }
      100% {
        background-color: red;
      }
    }
    animation: rainbow 8s infinite linear;
  `;

  return (
    <Flex justifyContent="flex-end">
      <Box css={rainbowAnimation} borderRadius={5} p={3}>
        <Heading className="heading">🌱 {formatTime(timeLeft)} </Heading>
      </Box>
    </Flex>
  );
};

export default SproutTimer;
