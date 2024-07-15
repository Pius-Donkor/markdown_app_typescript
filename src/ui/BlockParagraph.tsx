import styled from "styled-components";

const BlockParagraph = styled.p<{ type?: string }>`
  padding: var(--line-height);
  min-height: fit-content;
  background-color: var(--color-white-100);
  border-left: ${({ type }) =>
    type === "bordered" ? "solid var(--color-orange-0) 4px" : ""};
  border-radius: 5px;
  word-wrap: break-word;
`;
export default BlockParagraph;
