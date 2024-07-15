import styled from "styled-components";
import { LuSunMedium } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";
import { useDarkModeContext } from "../Context/DarkModeContext";

const ThemeContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  align-items: center;
`;

interface DarkProperty {
  $isdark?: boolean;
}

const SunIcon = styled(LuSunMedium)<DarkProperty>`
  color: ${({ $isdark }) =>
    $isdark ? "var(--color-grey-0)" : "var(--color-white-0)"};
  font-size: 20px;
`;
const MoonIcon = styled(IoMoonOutline)<DarkProperty>`
  color: ${({ $isdark }) =>
    $isdark ? "var(--color-white-0)" : "var(--color-grey-0)"};
  font-size: 18px;
`;

const SwitchContainer = styled.label`
  background-color: var(--color-grey-0);
  width: 3rem;
  padding: 5px;
  border: none;
  border-radius: 30px;
  display: flex;
`;

const Switch = styled.span<DarkProperty>`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--color-white-0);
  transition: margin-left 300ms;
  margin-left: ${({ $isdark }) => ($isdark ? "0px" : "25px")};
`;

const StyledInput = styled.input`
  display: none;
`;

export default function LightDark() {
  const { isDarkMode: darkMode, setIsDarkMode: setDarkMode } =
    useDarkModeContext();
  //   const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <ThemeContainer>
      <MoonIcon $isdark={darkMode} />
      <SwitchContainer
        htmlFor="screen-mode"
        onClick={() => setDarkMode(!darkMode)}
      >
        <Switch $isdark={darkMode}></Switch>
      </SwitchContainer>
      <SunIcon $isdark={darkMode} />
      <StyledInput
        id="screen-mode"
        checked={darkMode}
        title="screen-mode"
        type="checkbox"
      />
    </ThemeContainer>
  );
}
