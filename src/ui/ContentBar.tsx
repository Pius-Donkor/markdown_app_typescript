import styled from "styled-components";

const ContentBar = styled.div<{ $isDark?: boolean }>`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${({ $isDark }) =>
    $isDark ? "var(--color-dark-100)" : "var(--color-white-100)"};
  color: ${({ $isDark }) =>
    $isDark ? "var(--color-grey-200)" : "var(--color-grey-100)"};
  font-size: var(--font-size-medium);
  text-transform: uppercase;
  letter-spacing: var(--char-spacing);
`;
export default ContentBar;
