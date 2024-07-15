import { useRef } from "react";

export default function useGetScreen() {
  const screenSize: number = useRef(window.innerWidth).current;
  console.log(screenSize);
  const screenType = {
    isMobile: screenSize < 700,
    isTablet: screenSize < 1000 && screenSize > 700,
  };
  return screenType;
}
