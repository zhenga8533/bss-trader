import { Box, Flex, Heading } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

const SproutTimer = () => {
  const origin = 1721584200;
  const interval = 3 * 60 * 60; // 3 hours in seconds
  const now = Math.floor(Date.now() / 1000);
  const passed = Math.floor((now - origin) / interval);
  const start = origin + (passed + 1) * interval;
  const [timeLeft, setTimeLeft] = useState(start - now);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setTimeLeft(interval);
    }
  }, [timeLeft]);

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
        <Heading textShadow={"1px 1px 2px black"}>🌱 {formatTime(timeLeft)} </Heading>
      </Box>
    </Flex>
  );
};

export default SproutTimer;
