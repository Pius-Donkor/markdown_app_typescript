import styled from "styled-components";

const BlockParagraph = styled.p<{ type?: string; $isDark?: boolean }>`
  padding: var(--line-height);
  min-height: fit-content;
  border-radius: 5px;
  word-wrap: break-word;

  /* state styles */
  background-color: ${({ $isDark }) =>
    $isDark ? "var(--color-dark-200)" : "var(--color-white-100)"};
  /* //// */
  border-left: ${({ type }) =>
    type === "bordered" ? "solid var(--color-orange-0) 4px" : ""};
  /*///*/
  color: ${({ type, $isDark }) =>
    type === "bordered"
      ? $isDark
        ? "var(--color-white-0)"
        : "var(--color-dark-0)"
      : $isDark
      ? "var(--color-grey-200)"
      : "var(--color-grey-100)"};

  font-weight: ${({ type }) => (type === "bordered" ? 700 : 300)};
`;
export default BlockParagraph;
