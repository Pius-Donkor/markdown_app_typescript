import styled, { css } from "styled-components";

interface ButtonProps {
  large?: boolean;
  $ismobile?: boolean;
}

const largeButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "large",
})<ButtonProps>`
  background-color: var(--color-orange-0);
  padding: ${({ large }) => (large ? "10px 20px" : "10px")};
  transition: background-color 0.3s ease;
  font-size: var(--font-size-medium);
  color: var(--color-white-0);
  text-transform: capitalize;

  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  &:hover {
    background-color: var(--color-orange-100);
  }
  ${({ large }) => (large ? largeButton : "")}

  @media screen and (max-width: 700px) {
    padding: ${({ $ismobile }) => ($ismobile ? "10px" : "10px 20px")};
  }
`;

export default Button;
